import {Description} from "../const";
import Common from "../utils/common";
import AbstractComponent from "./abstract-component";
import moment from "moment";

export const createCardFilmTemplate = (film) => {
  const {title, totalRating, releaseDate, runTime, genres, poster, description, commentsIds,
    watchlist, alreadyWatched, favorite} = film;
  const descriptionFilm = description.length > Description.MAX_LENGTH ? `${description.slice(0, Description.DEFAULT_LENGTH)}...` : description;
  const year = moment(releaseDate).format(`YYYY`);

  return (
    `<article class="film-card">
          <h3 class="film-card__title">${title}</h3>
          <p class="film-card__rating">${totalRating}</p>
          <p class="film-card__info">
            <span class="film-card__year">${year}</span>
            <span class="film-card__duration">${Common.generateHours(runTime)}h ${Common.generateMinutes(runTime)}m</span>
            <span class="film-card__genre">${genres.join(` `)}</span>
          </p>
          <img src="${poster}" alt="${poster.split(`/`)[0]}" class="film-card__poster">
          <p class="film-card__description">${descriptionFilm}</p>
          <a class="film-card__comments">${commentsIds.length} comments</a>
          <form class="film-card__controls">
            <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${Common.isActiveButtonClass(watchlist)}">Add to watchlist</button>
            <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${Common.isActiveButtonClass(alreadyWatched)}">Mark as watched</button>
            <button class="film-card__controls-item button film-card__controls-item--favorite ${Common.isActiveButtonClass(favorite)}">Mark as favorite</button>
          </form>
        </article>`
  );
};

export default class CardFilm extends AbstractComponent {
  constructor(film) {
    super();

    this._film = film;
  }

  getTemplate() {
    return createCardFilmTemplate(this._film);
  }

  _getFilmPosterElement() {
    return this.getElement().querySelector(`.film-card__poster`);
  }

  _getFilmTitleElement() {
    return this.getElement().querySelector(`.film-card__title`);
  }

  _getFilmCommentsElement() {
    return this.getElement().querySelector(`.film-card__comments`);
  }

  _getFilmCardControlsElement() {
    return this.getElement().querySelector(`.film-card__controls`);
  }

  setOpenPopupClickHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();
      const target = evt.target;

      if (target !== this._getFilmTitleElement() &&
        target !== this._getFilmPosterElement() &&
        target !== this._getFilmCommentsElement()) {
        return;
      }
      handler(this._film, this);
    });
  }

  setAddWatchlistClickHandler(handler) {
    this._getFilmCardControlsElement().querySelector(`.film-card__controls-item--add-to-watchlist`).addEventListener(`click`, handler);
  }

  setMarkAsWatchedClickHandler(handler) {
    this._getFilmCardControlsElement().querySelector(`.film-card__controls-item--mark-as-watched`).addEventListener(`click`, handler);
  }

  setFavoriteClickHandler(handler) {
    this._getFilmCardControlsElement().querySelector(`.film-card__controls-item--favorite`).addEventListener(`click`, handler);
  }
}
