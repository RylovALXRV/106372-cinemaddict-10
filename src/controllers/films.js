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

export default class FilmsController {
  constructor(container) {
    this._container = container;

    this._films = [];

    this._filmsRatingComponent = new FilmsRating();
    this._filmsCommentComponent = new FilmsComments();
    this._buttonShowMoreComponent = new ButtonShowMore();

    this._currentFilm = null;
    this._filmDetailsComponent = null;

    this._filmsCount = Film.SHOW;

    this._onOpen = this._onOpen.bind(this);
    this.onEscKeydown = this.onEscKeydown.bind(this);
  }

  _renderFilms(films, parentElement, startIndex, endIndex) {
    films.slice(startIndex, endIndex).forEach((filmCard) => new FilmController(parentElement, this._onOpen).render(filmCard));
  }

  _renderFilmsCommentsElement(films) {
    if (Common.isFilmsComments(films)) {
      Render.render(this._container.getElement(), this._filmsCommentComponent.getElement(), RenderPosition.BEFOREEND);
      this._renderFilms(films.slice().sort(Common.compareComments), this._filmsCommentComponent.getFilmsListContainer(), Film.START, Film.END);
    }
  }

  _renderFilmsRatingElement(films) {
    if (Common.isFilmsRating(films)) {
      Render.render(this._container.getElement(), this._filmsRatingComponent.getElement(), RenderPosition.BEFOREEND);
      this._renderFilms(films.slice().sort(Common.compareRating), this._filmsRatingComponent.getFilmsListContainer(), Film.START, Film.END);
    }
  }

  render(films) {
    this._films = films;

    if (this._films.length === getAmountFilms(this._films).history || !this._films.length) {
      this._container.getFilmsListElement().innerHTML = ``;
      Render.render(this._container.getFilmsListElement(), Render.createElement(createNoMoviesMarkup()), RenderPosition.BEFOREEND);
    } else {
      this._renderFilms(this._films, this._container.getFilmsListContainerElement(), Film.START, Film.SHOW);
      this._renderFilmsCommentsElement(this._films);
      this._renderFilmsRatingElement(this._films);
      this._renderButtonShowMore();
    }
  }

  _renderButtonShowMore() {
    this._buttonShowMoreComponent.setClickHandler(() => {
      const prevFilmsCount = this._filmsCount;
      this._filmsCount += Film.SHOW;

      this._renderFilms(this._films, this._container.getFilmsListContainerElement(), prevFilmsCount, this._filmsCount);

      if (this._filmsCount >= this._films.length) {
        Render.remove(this._buttonShowMoreComponent);
      }
    });

    Render.render(this._container.getFilmsListElement(), this._buttonShowMoreComponent.getElement(), RenderPosition.BEFOREEND);
  }

  _onClose() {
    this._filmDetailsComponent.getElement().remove();
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

    this._filmDetailsComponent.getFilmCloseButtonElement().addEventListener(`click`, () => {
      this._onClose();
    });

    this._filmDetailsComponent.render(film);
    document.addEventListener(`keydown`, this.onEscKeydown);
  }

  onEscKeydown(evt) {
    if (Common.isEscKeyDown(evt)) {
      this._onClose();
    }
  }
}
