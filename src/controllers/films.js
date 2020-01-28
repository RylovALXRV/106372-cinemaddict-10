import {Film, RenderPosition, SortType, Emoji, Outline, SHAKE_ANIMATION_TIMEOUT} from "../const";
import Common from "../utils/common";
import Render from "../utils/render";
import {getAmountFilms} from "../utils/filter";
import {createNoMoviesMarkup} from "../components/films";
import FilmDetails, {createImgEmojiMarkup} from "../components/film-details";
import ButtonShowMore from "../components/button-show-more";
import FilmsComments from "../components/films-comments";
import FilmsRating from "../components/films-rating";
import FilmController from "./film";
import FilmModel from "../models/film";

const ButtonTextDelete = {
  DEFAULT: `Delete`,
  DELETE: `Deleting...`
};

export default class FilmsController {
  constructor(options = {}) {
    const {container, api, filmsModel, sortComponent, statisticComponent} = options;

    this._container = container;
    this._filmsModel = filmsModel;
    this._api = api;
    this._sortComponent = sortComponent;
    this._statisticComponent = statisticComponent;

    this._filmsRatingComponent = new FilmsRating();
    this._filmsCommentsComponent = new FilmsComments();
    this._buttonShowMoreComponent = new ButtonShowMore();

    this._currentFilm = null;
    this._currentEditFilm = null;
    this._emotion = null;

    this._filmsCount = Film.SHOW;

    this._onOpen = this._onOpen.bind(this);
    this.onEscKeydown = this.onEscKeydown.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
    this._onClose = this._onClose.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
    this._changeFilmData = this._changeFilmData.bind(this);

    this._filmsModel.setFilterChangeHandler(this._onFilterChange);
  }

  render() {
    const films = this._filmsModel.getFilms();

    if (films.length === getAmountFilms(films).history || !films.length) {
      this._container.getFilmsListElement().innerHTML = ``;
      Render.render(this._container.getFilmsListElement(), Render.createElement(createNoMoviesMarkup()), RenderPosition.BEFOREEND);
    } else {
      this._renderFilms(films, this._container.getFilmsListContainerElement(), Film.START, Film.SHOW);
      this._renderFilmsCommentsElement();
      this._renderFilmsRatingElement();

      if (this._filmsCount < films.length) {
        this._renderButtonShowMore(films);
      }
    }
  }

  _renderFilms(films, parentElement, startIndex, endIndex) {
    films.slice(startIndex, endIndex).forEach((film) => new FilmController(parentElement, this._api, this._onOpen, this._changeFilmData).render(film));
  }

  _onSortTypeChange(sortType) {
    if (sortType === SortType.DEFAULT) {
      this._filmsCount = Film.SHOW;
    }

    this._filmsModel.setSortType(sortType);
    const sortedFilms = this._filmsModel.getSortedFilms();

    const filmsContainer = document.querySelector(`.films-list__container`);
    filmsContainer.innerHTML = ``;

    this._renderFilms(sortedFilms, filmsContainer, Film.START, this._filmsCount);

    if (this._filmsCount < sortedFilms.length) {
      this._renderButtonShowMore(sortedFilms);
    }
  }

  _renderFilmsCommentsElement() {
    if (Common.isFilmsComments(this._filmsModel.getFilms())) {
      Render.render(this._container.getElement(), this._filmsCommentsComponent.getElement(), RenderPosition.BEFOREEND);
      this._renderFilms(this._filmsModel.getFilms().slice().sort(Common.compareComments),
          this._filmsCommentsComponent.getFilmsListContainerElement(), Film.START, Film.END);
    }
  }

  _renderFilmsRatingElement() {
    if (Common.isFilmsRating(this._filmsModel.getFilms())) {
      Render.render(this._container.getElement(), this._filmsRatingComponent.getElement(), RenderPosition.BEFOREEND);
      this._renderFilms(this._filmsModel.getFilms().slice().sort(Common.compareRating),
          this._filmsRatingComponent.getFilmsListContainerElement(), Film.START, Film.END);
    }
  }

  _renderButtonShowMore(films) {
    Render.remove(this._buttonShowMoreComponent);

    if (films.length <= this._filmsCount) {
      return;
    }

    const container = this._container.getFilmsListElement();
    Render.render(container, this._buttonShowMoreComponent.getElement(), RenderPosition.BEFOREEND);

    this._buttonShowMoreComponent.setClickHandler(() => {
      const prevFilmsCount = this._filmsCount;
      this._filmsCount += Film.SHOW;

      this._renderFilms(films, this._container.getFilmsListContainerElement(), prevFilmsCount, this._filmsCount);

      if (this._filmsCount >= films.length) {
        Render.remove(this._buttonShowMoreComponent);
      }
    });
  }

  _onClose() {
    Render.remove(this._currentEditFilm);
    document.body.classList.remove(`hide-overflow`);
    document.removeEventListener(`keydown`, this.onEscKeydown);

    this._currentFilm = null;
  }

  _onOpen(film, filmComponent, filmController) {
    // аналогично, как и в filmController'е -> восстанавливаю данные
    const oldFilm = Object.assign({}, film);

    if (filmComponent.getElement() === this._currentFilm) {
      return;
    }

    if (!!this._currentFilm && filmComponent.getElement() !== this._currentFilm) {
      this._onClose();
    }

    this._currentFilm = filmComponent.getElement();
    this._currentEditFilm = new FilmDetails(film);

    this._currentEditFilm.setCloseButtonClickHandler(this._onClose);

    this._currentEditFilm.setControlsChangeHandler((target) => {
      this._currentEditFilm.getData(film);

      return this._changeFilmData(filmController, film).catch(() => {
        target.checked = !target.checked;
        // т.к. я сразу обновляю карточку, то в случае ошибки я ее возвращаю в прежнее состояние
        // и здесь много данных, чтобы точечно не обновлять - обновляю сразу карточку
        Object.assign(film, oldFilm);
        this._shake();

        return true;
      });
    });

    this._currentEditFilm.setCommentDeleteButtonClickHandler((target, id) => {
      this._currentEditFilm.changeSettingsDeleteButton(target, ButtonTextDelete.DELETE, true);

      return this._api.deleteComment(id).then(() => {
        this._filmsModel.deleteCommentFilm(film, id);
        const newFilm = FilmModel.clone(film);

        filmController.render(newFilm);
      }).catch(() => {
        this._currentEditFilm.changeSettingsDeleteButton(target, ButtonTextDelete.DEFAULT, false);
        this._shake();

        return true;
      });
    });

    this._currentEditFilm.setCommentAddKeydownHandler((comment) => {
      const newComment = {
        emotion: this._emotion,
        comment,
        date: new Date().toISOString(),
      };

      return this._api.addComment(film.id, newComment).then((filmModel) => {
        this._currentEditFilm.setSettingsForInputElement(true, Outline.DEFAULT);

        this._filmsModel.addCommentFilm(film, film.id, filmModel.comments);
        const newFilm = FilmModel.clone(film);

        filmController.render(newFilm);
      }).then(() => {
        this._currentEditFilm.setSettingsForInputElement(true, Outline.DEFAULT);
      }).catch(() => {
        this._currentEditFilm.setSettingsForInputElement(false, Outline.STYLE);
        this._shake();

        return true;
      });
    });

    this._currentEditFilm.setEmojiChangeHandler((img) => {
      this._emotion = img.value;
      const emojiParentElement = this._currentEditFilm.getEmojiLabelElement();
      emojiParentElement.innerHTML = ``;

      Render.render(emojiParentElement, Render.createElement(createImgEmojiMarkup(Emoji[img.value.toUpperCase()])),
          RenderPosition.BEFOREEND);
    });

    this._currentEditFilm.setRatingScoreFilmChangeHandler((target) => {
      this._currentEditFilm.toggleUserRatingInputElements(true);
      this._currentEditFilm.setRatingScoreFilm(film, target.value);

      this._changeFilmData(filmController, film).then(() => {
        this._currentEditFilm.toggleUserRatingInputElements(false);
      }).catch(() => {
        film.personalRating = oldFilm.personalRating;
        this._currentEditFilm.setBackgroundColorErrorForLabel(target.id);
        this._currentEditFilm.toggleUserRatingInputElements(false);
        this._shake();
      });
    });

    this._currentEditFilm.setCancelRatingScoreClickHandler(() => {
      this._currentEditFilm.setRatingScoreFilm(film, 0);
      this._changeFilmData(filmController, film);
    });

    this._currentEditFilm.render();
    document.body.classList.add(`hide-overflow`);
    document.addEventListener(`keydown`, this.onEscKeydown);
  }

  _onDataChange(filmController, oldData, newData) {
    return this._api.updateFilm(oldData.id, newData)
      .then((filmModel) => {
        const isSuccessUpdate = this._filmsModel.updateFilm(oldData.id, newData);

        if (isSuccessUpdate) {
          filmController.render(filmModel);
        }
      });
  }

  _changeFilmData(filmController, oldData) {
    const newFilmData = FilmModel.clone(oldData);

    return this._onDataChange(filmController, oldData, newFilmData);
  }

  _removeFilms() {
    this._container.getFilmsListContainerElement().innerHTML = ``;
    Render.remove(this._filmsCommentsComponent);
    Render.remove(this._filmsRatingComponent);
  }

  _onFilterChange() {
    if (this._filmsModel.isFilterStatistic()) {
      this._statisticComponent.setFilterStatisticByDefault();
    }
    this._sortComponent.setActiveClassElement(this._sortComponent.getSortTypeByDefault());
    this._filmsCount = Film.SHOW;

    this._removeFilms();
    this._renderFilms(this._filmsModel.getFilms(), this._container.getFilmsListContainerElement(), Film.START, Film.SHOW);
    this._renderFilmsCommentsElement();
    this._renderFilmsRatingElement();
    this._renderButtonShowMore(this._filmsModel.getFilms());
  }

  _shake() {
    this._currentEditFilm.getElement().style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / 1000}s`;
    this._currentFilm.style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / 1000}s`;

    setTimeout(() => {
      this._currentEditFilm.getElement().style.animation = ``;
      this._currentFilm.style.animation = ``;
    }, SHAKE_ANIMATION_TIMEOUT);
  }

  onEscKeydown(evt) {
    if (Common.isEscKeyDown(evt)) {
      this._onClose();
    }
  }
}
