import {RenderPosition} from "../const";
import Common from "../utils/common";
import Render from "../utils/render";
import UserRating from "./user-rating";
import Comments from "./comments";
import AbstractSmartComponent from "./abstract-smart-component";
import {Emoji} from "../mock/comments";

const generateGenresMarkup = (genres) => {
  return genres.map((genre) => {
    return `<span class="film-details__genre">${genre}</span>`;
  }).join(``);
};

export const createFilmDetailsTemplate = (film) => {
  const {title, rating, duration, genres, poster, description, age,
    director, writers, actors, releaseDate, country, isWatchlist, isHistory, isFavorites} = film;

  return (
    `<section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="form-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          <div class="film-details__info-wrap">
            <div class="film-details__poster">
              <img class="film-details__poster-img" src="./images/posters/${poster}" alt="${poster.split(`/`)[0]}">
              <p class="film-details__age">${age}+</p>
            </div>

            <div class="film-details__info">
              <div class="film-details__info-head">
                <div class="film-details__title-wrap">
                  <h3 class="film-details__title">${title}</h3>
                  <p class="film-details__title-original">Original: ${title}</p>
                </div>

                <div class="film-details__rating">
                  <p class="film-details__total-rating">${rating}</p>
                </div>
              </div>

              <table class="film-details__table">
                <tr class="film-details__row">
                  <td class="film-details__term">Director</td>
                  <td class="film-details__cell">${director}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Writers</td>
                  <td class="film-details__cell">${writers.join(`, `)}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Actors</td>
                  <td class="film-details__cell">${actors.join(`, `)}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Release Date</td>
                  <td class="film-details__cell">${Common.formatReleaseDate(releaseDate)}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Runtime</td>
                  <td class="film-details__cell">${Common.generateDuration(duration)}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Country</td>
                  <td class="film-details__cell">${country}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">${genres.length > 1 ? `Genres` : `Genre`}</td>
                  <td class="film-details__cell">
                    ${generateGenresMarkup(genres)}
                </tr>
              </table>

              <p class="film-details__film-description">${description}</p>
            </div>
          </div>

          <section class="film-details__controls">
            <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${isWatchlist ? `checked` : ``}>
            <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

            <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched"  ${isHistory ? `checked` : ``}>
            <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

            <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite"  ${isFavorites ? `checked` : ``}>
            <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
          </section>
        </div>
    </form>
    ${(isHistory) ? new UserRating(film).getTemplate() : ``}
    ${new Comments(film).getTemplate()}
  </section>`
  );
};

const createImgEmojiMarkup = (img) => {
  return `<img src="images/emoji/${img}" width="55" height="55" alt="emoji">`;
};

export default class FilmDetails extends AbstractSmartComponent {
  constructor(film, onClose) {
    super();

    this._film = film;
    this._onClose = onClose;

    this._isWatchlist = film.isWatchlist;
    this._isHistory = film.isHistory;
    this._isFavorites = film.isFavorites;

    this._subscribeOnEvents();
  }

  getTemplate() {
    return createFilmDetailsTemplate(this._film);
  }

  _getFilmCloseButtonElement() {
    return this.getElement().querySelector(`.film-details__close-btn`);
  }

  recoveryListeners() {
    this._subscribeOnEvents();
  }

  reset() {
    const film = this._film;

    this._isHistory = film._isHistory;
    this._isWatchlist = film._isWatchlist;
    this._isFavorites = film._isFavorites;

    this.rerender();
  }

  _subscribeOnEvents() {
    const element = this.getElement();

    element.querySelector(`.film-details__controls`).addEventListener(`change`, (evt) => {
      const target = evt.target;

      if (target.id === `watched`) {
        this._film.isHistory = target.checked;
      }

      if (target.id === `watchlist`) {
        this._film.isWatchlist = target.checked;
      }

      if (target.id === `favorite`) {
        this._film.isFavorites = target.checked;
      }

      this.rerender();
    });

    element.querySelector(`.film-details__emoji-list`).addEventListener(`change`, (evt) => {
      const emojiParentElement = document.querySelector(`.film-details__add-emoji-label`);
      emojiParentElement.innerHTML = ``;

      Render.render(emojiParentElement, Render.createElement(createImgEmojiMarkup(Emoji[evt.target.value.toUpperCase()])),
          RenderPosition.BEFOREEND);

      // this.rerender();
    });

    this.setClickHandler(this._onClose);
  }

  render() {
    Render.render(document.body, this.getElement(), RenderPosition.BEFOREEND);
  }

  setClickHandler(handler) {
    this._getFilmCloseButtonElement().addEventListener(`click`, handler);
  }
}
