import {RenderPosition, FilterValue} from "../const";
import Common from "../utils/common";
import Render from "../utils/render";
import UserRating from "./user-rating";
import Comments from "./comments";
import AbstractSmartComponent from "./abstract-smart-component";
import he from "he";

const COLOR_RED = `#ff0000`;

const parseFormData = (film, formData) => {
  film.watchlist = formData.get(FilterValue.WATCHLIST) === `on`;
  film.alreadyWatched = formData.get(FilterValue.WATCHED) === `on`;
  film.favorite = formData.get(FilterValue.FAVORITE) === `on`;

  if (!film.alreadyWatched) {
    film.watchingDate = new Date().toISOString();
    film.personalRating = 0;
  }

  return film;
};

const generateGenresMarkup = (genres) => {
  return genres.map((genre) => {
    return `<span class="film-details__genre">${genre}</span>`;
  }).join(``);
};

export const createFilmDetailsTemplate = (film) => {
  const {title, totalRating, runTime, genres, poster, description,
    ageRating, director, writers, actors, releaseDate, country,
    alreadyWatched, watchlist, favorite, comments} = film;

  return (
    `<section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="form-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          <div class="film-details__info-wrap">
            <div class="film-details__poster">
              <img class="film-details__poster-img" src="${poster}" alt="${poster.split(`/`)[0]}">
              <p class="film-details__age">${ageRating}+</p>
            </div>

            <div class="film-details__info">
              <div class="film-details__info-head">
                <div class="film-details__title-wrap">
                  <h3 class="film-details__title">${title}</h3>
                  <p class="film-details__title-original">Original: ${title}</p>
                </div>

                <div class="film-details__rating">
                  <p class="film-details__total-rating">${totalRating}</p>
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
                  <td class="film-details__cell">${Common.generateHours(runTime)}h ${Common.generateMinutes(runTime)}m</td>
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
            <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${watchlist ? `checked` : ``}>
            <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

            <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${alreadyWatched ? `checked` : ``}>
            <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

            <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${favorite ? `checked` : ``}>
            <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
          </section>
        </div>
    </form>
    ${(alreadyWatched) ? new UserRating(film).getTemplate() : ``}
    ${new Comments(comments).getTemplate()}
  </section>`
  );
};

export const createImgEmojiMarkup = (img) => {
  return `<img src="images/emoji/${img}" width="55" height="55" alt="emoji">`;
};

export default class FilmDetails extends AbstractSmartComponent {
  constructor(film) {
    super();

    this._film = film;

    this._closePopup = null;
    this._changeControl = null;
    this._deleteComment = null;
    this._addComment = null;
    this._addEmoji = null;
    this._rateScoreFilm = null;
    this._cancelRatingScoreFilm = null;

    this.setSettingsForInputElement = this.setSettingsForInputElement.bind(this);
    this._subscribeOnEvents();
  }

  getTemplate() {
    return createFilmDetailsTemplate(this._film);
  }

  recoveryListeners() {
    this._subscribeOnEvents();
  }

  getData(film) {
    const formData = new FormData(this._getFormElement());

    return parseFormData(film, formData);
  }

  setRatingScoreFilm(film, score) {
    score = Number(score);

    film.personalRating = score;
    film.alreadyWatched = Boolean(score);

    return film;
  }

  getEmojiLabelElement() {
    return this.getElement().querySelector(`.film-details__add-emoji-label`);
  }

  getEmojiPictureElement() {
    return this.getElement().querySelector(`.film-details__add-emoji-label img`);
  }

  changeSettingsDeleteButton(currentButton, text, isDisabled) {
    currentButton.textContent = text;
    currentButton.disabled = isDisabled;
  }

  toggleUserRatingInputElements(isDisabled) {
    this._getUserRatingInputElements().forEach((inputElement) => {
      inputElement.disabled = isDisabled;
    });
  }

  toggleCommentEmojiInputElements(isDisabled) {
    this._getCommentEmojiElements().forEach((inputElement) => {
      inputElement.disabled = isDisabled;
    });
  }

  setSettingsForInputElement(isDisabled, style) {
    this._getCommentInputElement().disabled = isDisabled;
    this._getCommentInputElement().style.outline = style;
  }

  setBackgroundColorErrorForLabel(inputId) {
    this.getElement().querySelector(`label[for=${inputId}]`).style.backgroundColor = COLOR_RED;
  }

  render() {
    Render.render(document.body, this.getElement(), RenderPosition.BEFOREEND);
  }

  _subscribeOnEvents() {
    const element = this.getElement();
    const ratingScoreElement = element.querySelector(`.film-details__user-rating-score`);
    const watchedResetElement = element.querySelector(`.film-details__watched-reset`);

    element.querySelector(`.film-details__controls`).addEventListener(`change`, (evt) => {
      const target = evt.target;
      this._changeControl(target).then((isError) => {
        if (isError !== true) {
          this.rerender();
        }
      });
    });

    element.querySelector(`.film-details__emoji-list`).addEventListener(`change`, (evt) => {
      this._addEmoji(evt.target);
    });

    element.querySelector(`.film-details__comments-list`).addEventListener(`click`, (evt) => {
      const target = evt.target;

      if (target.classList.contains(`film-details__comment-delete`)) {
        this._deleteComment(target, target.dataset.id).then((isError) => {
          if (isError !== true) {
            this.rerender();
          }
        });
      }
    });

    element.addEventListener(`keydown`, (evt) => {
      const text = he.encode(this._getCommentInputElement().value);
      const imgElement = this.getEmojiPictureElement();

      if ((evt.ctrlKey || evt.metaKey) && evt.code === `Enter` && text && imgElement) {
        this._addComment(this._getCommentInputElement(), text).then((isError) => {
          if (isError !== true) {
            this.rerender();
          }
        });
      }
    });

    element.querySelector(`.film-details__close-btn`).addEventListener(`click`, () => {
      this._closePopup();
    });

    if (ratingScoreElement) {
      ratingScoreElement.addEventListener(`change`, (evt) => {
        this._rateScoreFilm(evt.target);
      });
    }

    if (watchedResetElement) {
      watchedResetElement.addEventListener(`click`, () => {
        this._cancelRatingScoreFilm();

        this.rerender();
      });
    }
  }

  _getFormElement() {
    return this.getElement().querySelector(`.film-details__inner`);
  }

  _getCommentInputElement() {
    return this.getElement().querySelector(`.film-details__comment-input`);
  }

  _getUserRatingInputElements() {
    return this.getElement().querySelectorAll(`.film-details__user-rating-input`);
  }

  _getCommentEmojiElements() {
    return this.getElement().querySelectorAll(`.film-details__emoji-item`);
  }

  setCommentAddKeydownHandler(handler) {
    this._addComment = handler;
  }

  setCommentDeleteButtonClickHandler(handler) {
    this._deleteComment = handler;
  }

  setCloseButtonClickHandler(handler) {
    this._closePopup = handler;
  }

  setControlsChangeHandler(handler) {
    this._changeControl = handler;
  }

  setEmojiChangeHandler(handler) {
    this._addEmoji = handler;
  }

  setRatingScoreFilmChangeHandler(handler) {
    this._rateScoreFilm = handler;
  }

  setCancelRatingScoreClickHandler(handler) {
    this._cancelRatingScoreFilm = handler;
  }
}
