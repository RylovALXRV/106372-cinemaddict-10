import AbstractComponent from "./abstract-component";
import Common from "../utils/common";
import {Emoji} from "../const";

export const createCommentMarkup = (comment) => {
  const {emotion, comment: text, author, day, id} = comment;

  return (
    `<li class="film-details__comment">
        <span class="film-details__comment-emoji">
          <img src="./images/emoji/${Emoji[emotion.toUpperCase()]}" width="55" height="55" alt="emoji">
        </span>
        <div>
          <p class="film-details__comment-text">${text}</p>
          <p class="film-details__comment-info">
            <span class="film-details__comment-author">${author}</span>
            <span class="film-details__comment-day">${Common.formatDate(day)}</span>
            <button class="film-details__comment-delete" data-id="${id}">Delete</button>
          </p>
        </div>
      </li>`
  );
};

const createCommentsMarkup = (film, comments) => {
  return comments[film.id].map((comment) => {
    return createCommentMarkup(comment);
  }).join(``);
};

const createCommentsTemplate = (film, comments) => {
  return (
    `<div class="form-details__bottom-container">
        <section class="film-details__comments-wrap">
          <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments[film.id].length}</span></h3>
          <ul class="film-details__comments-list">${createCommentsMarkup(film, comments)}</ul>

          <div class="film-details__new-comment">
            <div for="add-emoji" class="film-details__add-emoji-label"></div>

            <label class="film-details__comment-label">
              <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
            </label>

            <div class="film-details__emoji-list">
              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="sleeping">
              <label class="film-details__emoji-label" for="emoji-smile">
                <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="neutral-face">
              <label class="film-details__emoji-label" for="emoji-sleeping">
                <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-gpuke" value="grinning">
              <label class="film-details__emoji-label" for="emoji-gpuke">
                <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="grinning">
              <label class="film-details__emoji-label" for="emoji-angry">
                <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
              </label>
            </div>
          </div>
        </section>
      </div>`
  );
};

export default class Comments extends AbstractComponent {
  constructor(film, comments) {
    super();

    this._film = film;
    this._comments = comments;
  }

  getTemplate() {
    return createCommentsTemplate(this._film, this._comments);
  }
}
