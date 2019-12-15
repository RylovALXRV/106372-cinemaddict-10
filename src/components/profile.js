import Utils from "../utils";
import {getAmountFilms} from "../mock/menu";

const createProfileTemplate = (films) => {
  const historiesFilms = getAmountFilms(films).history;

  return (
    `<section class="header__profile profile">
      <p class="profile__rating">${Utils.getUserRank(historiesFilms)}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
};

export default class Profile {
  constructor(films) {
    this._element = null;
    this._films = films;
  }

  getTemplate() {
    return createProfileTemplate(this._films);
  }

  getElement() {
    if (!this._element) {
      this._element = Utils.createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
