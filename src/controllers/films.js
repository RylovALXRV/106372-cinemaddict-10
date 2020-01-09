import {Film, RenderPosition, SortType} from "../const";
import Common from "../utils/common";
import Render from "../utils/render";
import {getAmountFilms} from "../mock/menu";
import {createNoMoviesMarkup} from "../components/films";
import ButtonShowMore from "../components/button-show-more";
import FilmsComments from "../components/films-comments";
import FilmDetails from "../components/film-details";
import FilmsRating from "../components/films-rating";
import FilmController from "./film";

const SortedFilm = {
  [SortType.DATE_DOWN]: (films) => {
    return films.slice().sort(Common.compareDate);
  },
  [SortType.RATING_DOWN]: (films) => {
    return films.slice().sort(Common.compareRating);
  },
  [SortType.DEFAULT]: (films) => {
    return films;
  }
};

export default class FilmsController {
  constructor(container, filmsModel) {
    this._container = container;
    this._filmsModel = filmsModel;

    this._sortedFilms = [];

    this._filmsRatingComponent = new FilmsRating();
    this._filmsCommentComponent = new FilmsComments();
    this._buttonShowMoreComponent = new ButtonShowMore();

    this._currentFilm = null;
    this._filmDetailsComponent = null;

    this._filmsCount = Film.SHOW;

    this._onOpen = this._onOpen.bind(this);
    this.onEscKeydown = this.onEscKeydown.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
    this._onClose = this._onClose.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);

    this._filmsModel.setFilterChangeHandler(this._onFilterChange);
  }

  _renderFilms(films, parentElement, startIndex, endIndex) {
    films.slice(startIndex, endIndex).forEach((film) => new FilmController(parentElement, this._onOpen, this._onDataChange).render(film));
  }

  _onSortTypeChange(sortType) {
    const films = this._filmsModel.getFilms();

    if (sortType === SortType.DEFAULT) {
      this._filmsCount = Film.SHOW;
    }

    this._sortedFilms = SortedFilm[sortType](films);

    const filmsContainer = document.querySelector(`.films-list__container`);
    filmsContainer.innerHTML = ``;

    this._renderFilms(this._sortedFilms, filmsContainer, Film.START, this._filmsCount);

    if (this._filmsCount < films.length) {
      this._renderButtonShowMore(this._sortedFilms);
    }
  }

  _renderFilmsCommentsElement() {
    if (Common.isFilmsComments(this._filmsModel.getFilms())) {
      Render.render(this._container.getElement(), this._filmsCommentComponent.getElement(), RenderPosition.BEFOREEND);
      this._renderFilms(this._filmsModel.getFilms().slice().sort(Common.compareComments),
          this._filmsCommentComponent.getFilmsListContainer(), Film.START, Film.END);
    }
  }

  _renderFilmsRatingElement() {
    if (Common.isFilmsRating(this._filmsModel.getFilms())) {
      Render.render(this._container.getElement(), this._filmsRatingComponent.getElement(), RenderPosition.BEFOREEND);
      this._renderFilms(this._filmsModel.getFilms().slice().sort(Common.compareRating),
          this._filmsRatingComponent.getFilmsListContainer(), Film.START, Film.END);
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

  _onClose() {
    this._filmDetailsComponent.reset();

    Render.remove(this._filmDetailsComponent);
    document.body.classList.remove(`hide-overflow`);
    document.removeEventListener(`keydown`, this.onEscKeydown);

    this._currentFilm = null;
  }

  _onOpen(film, filmComponent, filmController) {
    if (filmComponent.getElement() === this._currentFilm) {
      return;
    }

    if (!!this._currentFilm && filmComponent.getElement() !== this._currentFilm) {
      this._onClose();
    }

    this._filmDetailsComponent = new FilmDetails(film);
    this._currentFilm = filmComponent.getElement();

    this._filmDetailsComponent.setCloseButtonClickHandler(() => {
      this._onClose();
    });

    this._filmDetailsComponent.setControlsChangeHandler(() => {
      const data = this._filmDetailsComponent.getData();
      this._onDataChange(filmController, film, Object.assign({}, film, data));
    });

    this._filmDetailsComponent.setCommentDeleteButtonClickHandler();

    this._filmDetailsComponent.render(film);
    document.body.classList.add(`hide-overflow`);
    document.addEventListener(`keydown`, this.onEscKeydown);
  }

  _onDataChange(filmController, oldData, newData) {
    const isSuccessUpdate = this._filmsModel.updateFilm(oldData.id, newData);

    if (isSuccessUpdate) {
      filmController.render(newData);
    }
  }

  _removeFilms() {
    this._container.getFilmsListContainerElement().innerHTML = ``;
    Render.remove(this._filmsCommentComponent);
    Render.remove(this._filmsRatingComponent);
  }

  _onFilterChange() {
    this._filmsCount = Film.SHOW;

    this._removeFilms();
    this._renderFilms(this._filmsModel.getFilms(), this._container.getFilmsListContainerElement(), Film.START, Film.SHOW);
    this._renderFilmsCommentsElement();
    this._renderFilmsRatingElement();
    this._renderButtonShowMore(this._filmsModel.getFilms());
  }

  onEscKeydown(evt) {
    if (Common.isEscKeyDown(evt)) {
      this._onClose();
    }
  }
}
