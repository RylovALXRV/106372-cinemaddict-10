import AbstractComponent from "./abstract-component";

const SCORE_COUNT = 9;

const createUserRantingScoreMarkup = (number, rating) => {
  const isChecked = (number === rating) ? `checked` : ``;

  return (
    `<input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="${number}" id="rating-${number}" ${isChecked}>
     <label class="film-details__user-rating-label" for="rating-${number}">${number}</label>`
  );
};

const createUserRantingScoreTemplate = (rating) => {
  return new Array(SCORE_COUNT).fill(``).map((item, i) => {
    return createUserRantingScoreMarkup((i + 1), rating);
  }).join(``);
};

const createUserRatingTemplate = (film) => {
  const {poster, title, personalRating} = film;

  return (
    `<div class="form-details__middle-container">
      <section class="film-details__user-rating-wrap">
        <div class="film-details__user-rating-controls">
          <button class="film-details__watched-reset" type="button">Undo</button>
        </div>

        <div class="film-details__user-score">
          <div class="film-details__user-rating-poster">
            <img src="${poster}" alt="film-poster" class="film-details__user-rating-img">
          </div>

          <section class="film-details__user-rating-inner">
            <h3 class="film-details__user-rating-title">${title}</h3>

            <p class="film-details__user-rating-feelings">How you feel it?</p>

            <div class="film-details__user-rating-score">
              ${createUserRantingScoreTemplate(personalRating)}
            </div>
          </section>
        </div>
      </section>
    </div>`
  );
};

export default class UserRating extends AbstractComponent {
  constructor(film) {
    super();

    this._film = film;
  }

  getTemplate() {
    return createUserRatingTemplate(this._film);
  }
}
