import {Description} from "../const";
import Common from "../utils/common";
import AbstractComponent from "./abstract-component";

export const createCardFilmTemplate = (film) => {
  const {title, rating, year, duration, genres, poster, description, comments} = film;
  const descriptionFilm = description.length > Description.MAX_LENGTH ? `${description.slice(0, Description.DEFAULT_LENGTH)}...` : description;

  return (
    `<article class="film-card">
          <h3 class="film-card__title">${title}</h3>
          <p class="film-card__rating">${rating}</p>
          <p class="film-card__info">
            <span class="film-card__year">${year}</span>
            <span class="film-card__duration">${Common.generateDuration(duration)}</span>
            <span class="film-card__genre">${genres.join(` `)}</span>
          </p>
          <img src="./images/posters/${poster}" alt="${poster.split(`/`)[0]}" class="film-card__poster">
          <p class="film-card__description">${descriptionFilm}</p>
          <a class="film-card__comments">${comments.length} comments</a>
          <form class="film-card__controls">
            <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
            <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
            <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
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

  setClickHandler(handler) {
    this.getElement().addEventListener(`click`, handler);
  }

  getFilmPosterElement() {
    return this.getElement().querySelector(`.film-card__poster`);
  }

  getFilmTitleElement() {
    return this.getElement().querySelector(`.film-card__title`);
  }

  getFilmCommentsElement() {
    return this.getElement().querySelector(`.film-card__comments`);
  }
}
