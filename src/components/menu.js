import {MENU} from "../const";
import {getAmountFilms} from "../mock/menu";
import AbstractComponent from "./abstract-component";

const createMenuListMarkup = (films) => {
  const amountFilms = getAmountFilms(films);

  return MENU.map((item) => {

    return `<a href="#${item}" class="main-navigation__item">${item[0].toLocaleUpperCase() + item.slice(1)}
              <span class="main-navigation__item-count">${amountFilms[item]}</span>
            </a>`;
  }).join(``);
};

// здесь не понял про активный элемент
const createMenuTemplate = (films) => {
  return (
    `<nav class="main-navigation">
      <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
      ${createMenuListMarkup(films)}
      <a href="#stats" class="main-navigation__item main-navigation__item--additional">Stats</a>
    </nav>`
  );
};

export default class Menu extends AbstractComponent {
  constructor(films) {
    super();

    this._films = films;
  }

  getTemplate() {
    return createMenuTemplate(this._films);
  }
}
