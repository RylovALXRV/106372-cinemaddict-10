import {Film, RenderPosition, SortType, Emoji, Outline} from "../const";
import Common from "../utils/common";
import Element from "../utils/element";
import {getAmountFilms} from "../utils/filter";
import {createNoMoviesMarkup} from "../components/films";
import FilmDetails, {createImgEmojiMarkup} from "../components/film-details";
import ButtonShowMore from "../components/button-show-more";
import FilmsComments from "../components/films-comments";
import FilmsRating from "../components/films-rating";
import FilmController from "./film-controller";
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

    this._currentFilmElement = null;
    this._currentFilmDetailsComponent = null;
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
      Element.render(this._container.getFilmsListElement(), Element.create(createNoMoviesMarkup()), RenderPosition.BEFOREEND);
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
      Element.render(this._container.getElement(), this._filmsCommentsComponent.getElement(), RenderPosition.BEFOREEND);

      this._renderFilms(this._filmsModel.getFilms().slice().sort(Common.compareComments),
          this._filmsCommentsComponent.getFilmsListContainerElement(), Film.START, Film.END);
    }
  }

  _renderFilmsRatingElement() {
    if (Common.isFilmsRating(this._filmsModel.getFilms())) {
      Element.render(this._container.getElement(), this._filmsRatingComponent.getElement(), RenderPosition.BEFOREEND);
      this._renderFilms(this._filmsModel.getFilms().slice().sort(Common.compareRating),
          this._filmsRatingComponent.getFilmsListContainerElement(), Film.START, Film.END);
    }
  }

  _renderButtonShowMore(films) {
    Element.remove(this._buttonShowMoreComponent);

    if (films.length <= this._filmsCount) {
      return;
    }

    const container = this._container.getFilmsListElement();
    Element.render(container, this._buttonShowMoreComponent.getElement(), RenderPosition.BEFOREEND);

    this._buttonShowMoreComponent.setClickHandler(() => {
      const prevFilmsCount = this._filmsCount;
      this._filmsCount += Film.SHOW;

      this._renderFilms(films, this._container.getFilmsListContainerElement(), prevFilmsCount, this._filmsCount);

      if (this._filmsCount >= films.length) {
        Element.remove(this._buttonShowMoreComponent);
      }
    });
  }

  _onClose() {
    Element.remove(this._currentFilmDetailsComponent);
    document.body.classList.remove(`hide-overflow`);
    document.removeEventListener(`keydown`, this.onEscKeydown);

    this._currentFilmElement = null;
  }

  _onOpen(film, filmComponent, filmController) {
    // аналогично, как и в filmController'е -> восстанавливаю данные
    const oldFilm = Object.assign({}, film);

    if (filmComponent.getElement() === this._currentFilmElement) {
      return;
    }

    if (!!this._currentFilmElement && filmComponent.getElement() !== this._currentFilmElement) {
      this._onClose();
    }

    this._currentFilmElement = filmComponent.getElement();
    this._currentFilmDetailsComponent = new FilmDetails(film);

    this._currentFilmDetailsComponent.setCloseButtonClickHandler(this._onClose);
    this._currentFilmDetailsComponent.setControlsChangeHandler((target) => this._onChangeControl(filmController, film, oldFilm, target));
    this._currentFilmDetailsComponent.setCommentDeleteButtonClickHandler((target, id) => this._onDeleteComment(filmController, film, target, id));
    this._currentFilmDetailsComponent.setCommentAddKeydownHandler((comment) => this._onAddComment(filmController, film, comment));
    this._currentFilmDetailsComponent.setEmojiChangeHandler((img) => this._onAddEmoji(img));
    this._currentFilmDetailsComponent.setRatingScoreFilmChangeHandler((target) => this._onRateScoreFilm(filmController, film, oldFilm, target));
    this._currentFilmDetailsComponent.setCancelRatingScoreClickHandler(() => this._onCancelRatingScoreFilm(filmController, film));

    this._currentFilmDetailsComponent.render();
    document.body.classList.add(`hide-overflow`);
    document.addEventListener(`keydown`, this.onEscKeydown);
  }

  _onDataChange(filmController, oldFilm, newFilm) {
    return this._api.updateFilm(oldFilm.id, newFilm)
      .then((filmModel) => {
        const isSuccessUpdate = this._filmsModel.updateFilm(oldFilm.id, newFilm);

        if (isSuccessUpdate) {
          filmController.render(filmModel);

          this._updateFilms();
        }
      });
  }

  _changeFilmData(filmController, oldFilm) {
    const newFilm = FilmModel.clone(oldFilm);

    return this._onDataChange(filmController, oldFilm, newFilm);
  }

  _removeFilms() {
    this._container.getFilmsListContainerElement().innerHTML = ``;
    Element.remove(this._filmsCommentsComponent);
    Element.remove(this._filmsRatingComponent);
  }

  _onFilterChange() {
    this._filmsCount = Film.SHOW;

    if (this._filmsModel.isFilterStatistic()) {
      this._statisticComponent.setFilterStatisticByDefault();
    }

    this._sortComponent.setActiveClassElement(this._sortComponent.getSortTypeByDefault());
    this._filmsModel.setSortType();

    this._updateFilms();
  }

  _updateFilms() {
    this._removeFilms();
    this._renderFilms(this._filmsModel.getFilms(), this._container.getFilmsListContainerElement(), Film.START, this._filmsCount);
    this._renderFilmsCommentsElement();
    this._renderFilmsRatingElement();
    this._renderButtonShowMore(this._filmsModel.getFilms());
  }

  _onRateScoreFilm(filmController, film, oldFilm, target) {
    this._currentFilmDetailsComponent.toggleUserRatingInputElements(true);
    this._currentFilmDetailsComponent.setRatingScoreFilm(film, target.value);

    this._changeFilmData(filmController, film).then(() => {
      oldFilm.personalRating = Number(target.value);
      this._currentFilmDetailsComponent.toggleUserRatingInputElements(false);
    }).catch(() => {
      film.personalRating = oldFilm.personalRating;

      this._currentFilmDetailsComponent.setSettingsForLabelElement(film, target.id);
      this._currentFilmDetailsComponent.toggleUserRatingInputElements(false);
      this._currentFilmDetailsComponent.shake();
    });
  }

  _onCancelRatingScoreFilm(filmController, film) {
    this._currentFilmDetailsComponent.setRatingScoreFilm(film, 0);
    this._changeFilmData(filmController, film);
  }

  _onAddEmoji(img) {
    this._emotion = img.value;
    const emojiParentElement = this._currentFilmDetailsComponent.getEmojiLabelElement();
    emojiParentElement.innerHTML = ``;

    Element.render(emojiParentElement, Element.create(createImgEmojiMarkup(Emoji[img.value.toUpperCase()])),
        RenderPosition.BEFOREEND);
  }

  _onAddComment(filmController, film, comment) {
    this._currentFilmDetailsComponent.setSettingsForInputElement(true, Outline.DEFAULT);
    this._currentFilmDetailsComponent.toggleCommentEmojiInputElements(true);

    const newComment = {
      emotion: this._emotion,
      comment,
      date: new Date().toISOString(),
    };

    return this._api.addComment(film.id, newComment).then((filmModel) => {
      this._filmsModel.addCommentFilm(film, film.id, filmModel.comments);
      const newFilm = FilmModel.clone(film);

      filmController.render(newFilm);
    }).then(() => {
      this._currentFilmDetailsComponent.setSettingsForInputElement(false, Outline.DEFAULT);
      this._currentFilmDetailsComponent.toggleCommentEmojiInputElements(false);
      this._updateFilms();
    }).catch(() => {
      this._currentFilmDetailsComponent.setSettingsForInputElement(false, Outline.STYLE);
      this._currentFilmDetailsComponent.toggleCommentEmojiInputElements(false);
      this._currentFilmDetailsComponent.shake();

      return true;
    });
  }

  _onDeleteComment(filmController, film, target, id) {
    this._currentFilmDetailsComponent.changeSettingsDeleteButton(target, ButtonTextDelete.DELETE, true);

    return this._api.deleteComment(id).then(() => {
      this._filmsModel.deleteCommentFilm(film, id);
      const newFilm = FilmModel.clone(film);

      filmController.render(newFilm);
      this._updateFilms();
    }).catch(() => {
      this._currentFilmDetailsComponent.changeSettingsDeleteButton(target, ButtonTextDelete.DEFAULT, false);
      this._currentFilmDetailsComponent.shake();

      return true;
    });
  }

  _onChangeControl(filmController, film, oldFilm, target) {
    this._currentFilmDetailsComponent.getData(film);

    return this._changeFilmData(filmController, film).catch(() => {
      target.checked = !target.checked;
      // т.к. я сразу обновляю карточку, то в случае ошибки я ее возвращаю в прежнее состояние
      // и здесь много данных, чтобы точечно не обновлять - обновляю сразу карточку
      Object.assign(film, oldFilm);
      this._currentFilmDetailsComponent.shake();

      return true;
    });
  }

  onEscKeydown(evt) {
    if (Common.isEscKeyDown(evt)) {
      this._onClose();
    }
  }
}
