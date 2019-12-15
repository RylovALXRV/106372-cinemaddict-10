import {Description, RenderPosition} from "../const";
import Utils from "../utils";
import FilmDetails, {renderFilmDetails} from "./film-details";

let currentFilm = null;
let filmDetailsComponent = null;

export const createCardFilmTemplate = (film) => {
  const {title, rating, year, duration, genres, poster, description, comments} = film;
  const descriptionFilm = description.length > Description.MAX_LENGTH ? `${description.slice(0, Description.DEFAULT_LENGTH)}...` : description;

  return (
    `<article class="film-card">
          <h3 class="film-card__title">${title}</h3>
          <p class="film-card__rating">${rating}</p>
          <p class="film-card__info">
            <span class="film-card__year">${year}</span>
            <span class="film-card__duration">${Utils.generateDuration(duration)}</span>
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

const closePopup = () => {
  filmDetailsComponent.getElement().remove();
  document.body.classList.remove(`hide-overflow`);
  document.removeEventListener(`keydown`, onEscKeydown);
  currentFilm = null;
};

const openPopup = (film) => {
  filmDetailsComponent = new FilmDetails(film);

  filmDetailsComponent.getFilmCloseButtonElement().addEventListener(`click`, () => {
    closePopup();
  });

  renderFilmDetails(filmDetailsComponent);
  document.body.classList.add(`hide-overflow`);
  document.addEventListener(`keydown`, onEscKeydown);
};

const onEscKeydown = (evt) => {
  if (Utils.isEscKeyDown(evt)) {
    closePopup();
  }
};

export const renderFilm = (film, parentElement) => {
  const filmComponent = new CardFilm(film);
  const filmElement = filmComponent.getElement();

  filmComponent.setClickListener();
  Utils.render(parentElement, filmElement, RenderPosition.BEFOREEND);
};

class CardFilm {
  constructor(film) {
    this._element = null;
    this._film = film;
  }

  getTemplate() {
    return createCardFilmTemplate(this._film);
  }

  getElement() {
    if (!this._element) {
      this._element = Utils.createElement(this.getTemplate());
    }
    return this._element;
  }

  setClickListener() {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();
      const target = evt.target;

      if (target !== this.getFilmTitleElement() &&
        target !== this.getFilmPosterElement() &&
        target !== this.getFilmCommentsElement()) {
        return;
      }

      if (currentFilm && currentFilm !== this.getElement()) {
        closePopup();
      }

      if (currentFilm !== this.getElement()) {
        openPopup(this.getFilm());
        currentFilm = this.getElement();
      }
    });
  }

  getFilm() {
    return this._film;
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

  removeElement() {
    this._element = null;
  }
}
