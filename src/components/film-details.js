import {RenderPosition, FilterValue} from "../const";
import Common from "../utils/common";
import Render from "../utils/render";
import UserRating from "./user-rating";
import Comments from "./comments";
import AbstractSmartComponent from "./abstract-smart-component";
import he from "he";

const isChecked = {
  'on': true,
  'null': false
};

const parseFormData = (film, formData) => {
  film.watchlist = isChecked[formData.get(FilterValue.WATCHLIST)];
  film.alreadyWatched = isChecked[formData.get(FilterValue.WATCHED)];
  film.favorite = isChecked[formData.get(FilterValue.FAVORITE)];

  if (!film.alreadyWatched) {
    film.watchingDate = new Date().toISOString();
  }
  // все равно не получается снять время при снятии просмотренно - выкидывает ошибку и пишет,
  // что время должно быть в формате DateISOString - как-то так
  // film.watchingDate = film.alreadyWatched ? new Date().toISOString() : null;

  return film;
};

const generateGenresMarkup = (genres) => {
  return genres.map((genre) => {
    return `<span class="film-details__genre">${genre}</span>`;
  }).join(``);
};

export const createFilmDetailsTemplate = (film, comments) => {
  const {title, totalRating, runTime, genres, poster, description,
    ageRating, director, writers, actors, releaseDate, country,
    alreadyWatched, watchlist, favorite} = film;

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
    ${new Comments(film, comments).getTemplate()}
  </section>`
  );
};

export const createImgEmojiMarkup = (img) => {
  return `<img src="images/emoji/${img}" width="55" height="55" alt="emoji">`;
};

export default class FilmDetails extends AbstractSmartComponent {
  constructor(film, comments) {
    super();

    this._film = film;
    // не получилось поправить - вернул как было. Попробую так сделать.
    this._comments = comments;

    this._closePopup = null;
    this._changeControl = null;
    this._deleteComment = null;
    this._addComment = null;
    this._addEmoji = null;
    this._ratingScoreFilm = null;

    this._subscribeOnEvents();
  }

  getTemplate() {
    return createFilmDetailsTemplate(this._film, this._comments);
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

  setRatingScoreFilmHandler(handler) {
    this._ratingScoreFilm = handler;
  }

  recoveryListeners() {
    this._subscribeOnEvents();
  }

  _subscribeOnEvents() {
    const element = this.getElement();
    const ratingScoreElement = element.querySelector(`.film-details__user-rating-score`);

    element.querySelector(`.film-details__controls`).addEventListener(`change`, () => {
      this._changeControl();

      this.rerender();
    });

    element.querySelector(`.film-details__emoji-list`).addEventListener(`change`, (evt) => {
      this._addEmoji(evt.target);
    });

    element.querySelector(`.film-details__comments-list`).addEventListener(`click`, (evt) => {
      const target = evt.target;
      if (target.classList.contains(`film-details__comment-delete`)) {
        this._deleteComment(target.dataset.id);

        this.rerender();
      }
    });

    element.addEventListener(`keydown`, (evt) => {
      const text = he.encode(this._getCommentInputElement().value);
      const imgElement = this.getEmojiPictureElement();

      if ((evt.ctrlKey || evt.metaKey) && evt.code === `Enter` && text && imgElement) {
        this._addComment(text, imgElement);

        this.rerender();
      }
    });

    element.querySelector(`.film-details__close-btn`).addEventListener(`click`, () => {
      this._closePopup();
    });

    if (ratingScoreElement) {
      ratingScoreElement.addEventListener(`change`, (evt) => {
        this._ratingScoreFilm(evt.target.value);
      });
    }
  }

  _getFormElement() {
    return this.getElement().querySelector(`.film-details__inner`);
  }

  _getCommentInputElement() {
    return this.getElement().querySelector(`.film-details__comment-input`);
  }

  getData(film) {
    const formData = new FormData(this._getFormElement());

    return parseFormData(film, formData);
  }

  setRatingScoreFilm(film, score) {
    film.personalRating = Number(score);

    return film;
  }

  getEmojiLabelElement() {
    return this.getElement().querySelector(`.film-details__add-emoji-label`);
  }

  getEmojiPictureElement() {
    return this.getElement().querySelector(`.film-details__add-emoji-label img`);
  }

  render() {
    Render.render(document.body, this.getElement(), RenderPosition.BEFOREEND);
  }
}
