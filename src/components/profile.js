import Common from "../utils/common";
import {getAmountFilms} from "../utils/filter";
import AbstractComponent from "./abstract-component";

const createProfileTemplate = (films) => {
  const historiesFilms = getAmountFilms(films).history;

  return (
    `<section class="header__profile profile">
      <p class="profile__rating">${Common.getUserRank(historiesFilms)}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
};

export default class Profile extends AbstractComponent {
  constructor(films) {
    super();

    this._films = films;
  }

  getTemplate() {
    return createProfileTemplate(this._films);
  }
}
