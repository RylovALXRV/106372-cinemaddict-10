import {FilterType, MENU_NAMES} from "../const";
import AbstractComponent from "./abstract-component";

const createMenuListMarkup = (filters) => {
  return MENU_NAMES.map((menuName) => {
    return `<a href="#${menuName}" class="main-navigation__item" data-filter-type="${menuName}">${menuName[0].toLocaleUpperCase() + menuName.slice(1)}
              <span class="main-navigation__item-count">${filters[menuName]}</span>
            </a>`;
  }).join(``);
};

const createMenuTemplate = (films) => {
  return (
    `<nav class="main-navigation">
      <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
      ${createMenuListMarkup(films)}
      <a href="#${FilterType.STATS}" class="main-navigation__item main-navigation__item--additional" data-filter-type="${FilterType.STATS}">Stats</a>
    </nav>`
  );
};

export default class Menu extends AbstractComponent {
  constructor(filters) {
    super();

    this._filters = filters;
  }

  getTemplate() {
    return createMenuTemplate(this._filters);
  }

  setMenuChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();
      if (evt.target.tagName !== `A`) {
        return;
      }
      this._setActiveClassForMenu(evt.target);
      const filterType = evt.target.dataset.filterType;
      handler(filterType);
    });
  }

  _setActiveClassForMenu(target) {
    this._getActiveClassMenu().classList.remove(`main-navigation__item--active`);
    target.classList.add(`main-navigation__item--active`);
  }

  _getActiveClassMenu() {
    return this.getElement().querySelector(`.main-navigation__item--active`);
  }
}
