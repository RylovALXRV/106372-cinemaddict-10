import {Film, RenderPosition} from "../const";
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
  'date-down': (films) => {
    return films.slice().sort(Common.compareDate);
  },
  'rating-down': (films) => {
    return films.slice().sort(Common.compareRating);
  },
  'default': (films) => {
    return films;
  }
};

export default class FilmsController {
  constructor(container) {
    this._container = container;

    this._films = [];
    this._sortedFilms = [];

    this._filmsRatingComponent = new FilmsRating();
    this._filmsCommentComponent = new FilmsComments();
    this._buttonShowMoreComponent = new ButtonShowMore();

    this._currentFilm = null;
    this._filmDetailsComponent = null;

    this._filmsCount = Film.SHOW;

    this._onOpen = this._onOpen.bind(this);
    this.onEscKeydown = this.onEscKeydown.bind(this);
    this.onSortTypeChange = this.onSortTypeChange.bind(this);
  }

  onSortTypeChange(sortType) {
    if (this._filmsCount > Film.SHOW) {
      this._filmsCount = Film.SHOW;
    }
    if (!document.querySelector(`.films-list__show-more`)) {
      this._renderButtonShowMore();
    }

    this._sortedFilms = SortedFilm[sortType](this._films);

    const filmsContainer = document.querySelector(`.films-list__container`);
    filmsContainer.innerHTML = ``;

    this._renderFilms(this._sortedFilms, filmsContainer, Film.START, Film.SHOW);
  }

  _renderFilms(films, parentElement, startIndex, endIndex) {
    films.slice(startIndex, endIndex).forEach((film) => new FilmController(parentElement, this._onOpen).render(film));
  }

  _renderFilmsCommentsElement() {
    if (Common.isFilmsComments(this._sortedFilms)) {
      Render.render(this._container.getElement(), this._filmsCommentComponent.getElement(), RenderPosition.BEFOREEND);
      this._renderFilms(this._sortedFilms.slice().sort(Common.compareComments), this._filmsCommentComponent.getFilmsListContainer(), Film.START, Film.END);
    }
  }

  _renderFilmsRatingElement() {
    if (Common.isFilmsRating(this._sortedFilms)) {
      Render.render(this._container.getElement(), this._filmsRatingComponent.getElement(), RenderPosition.BEFOREEND);
      this._renderFilms(this._sortedFilms.slice().sort(Common.compareRating), this._filmsRatingComponent.getFilmsListContainer(), Film.START, Film.END);
    }
  }

  _renderButtonShowMore() {
    this._buttonShowMoreComponent.setClickHandler(() => {
      const prevFilmsCount = this._filmsCount;
      this._filmsCount += Film.SHOW;

      this._renderFilms(this._sortedFilms, this._container.getFilmsListContainerElement(), prevFilmsCount, this._filmsCount);

      if (this._filmsCount >= this._sortedFilms.length) {
        Render.remove(this._buttonShowMoreComponent);
      }
    });

    Render.render(this._container.getFilmsListElement(), this._buttonShowMoreComponent.getElement(), RenderPosition.BEFOREEND);
  }

  render(films) {
    this._films = films;
    this._sortedFilms = this._films;

    if (this._films.length === getAmountFilms(this._sortedFilms).history || !this._sortedFilms.length) {
      this._container.getFilmsListElement().innerHTML = ``;
      Render.render(this._container.getFilmsListElement(), Render.createElement(createNoMoviesMarkup()), RenderPosition.BEFOREEND);
    } else {
      this._renderFilms(this._sortedFilms, this._container.getFilmsListContainerElement(), Film.START, Film.SHOW);
      this._renderFilmsCommentsElement();
      this._renderFilmsRatingElement();
      this._renderButtonShowMore();
    }
  }

  _onClose() {
    Render.remove(this._filmDetailsComponent);
    document.body.classList.remove(`hide-overflow`);
    document.removeEventListener(`keydown`, this.onEscKeydown);

    this._currentFilm = null;
  }

  _onOpen(film, filmComponent) {
    if (filmComponent.getElement() === this._currentFilm) {
      return;
    }

    if (!!this._currentFilm && filmComponent.getElement() !== this._currentFilm) {
      this._onClose();
    }

    this._filmDetailsComponent = new FilmDetails(film);
    this._currentFilm = filmComponent.getElement();

    this._filmDetailsComponent.setClickHandler(() => this._onClose());

    this._filmDetailsComponent.render(film);
    document.body.classList.add(`hide-overflow`);
    document.addEventListener(`keydown`, this.onEscKeydown);
  }

  onEscKeydown(evt) {
    if (Common.isEscKeyDown(evt)) {
      this._onClose();
    }
  }
}
