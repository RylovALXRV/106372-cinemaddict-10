import {FilterType, MENU_NAMES} from "../const";
import AbstractComponent from "./abstract-component";

const filterType = {
  history: `alreadyWatched`,
  favorites: `favorite`,
  watchlist: `watchlist`
};

const createMenuListMarkup = (filters, activeFilterClass) => {
  return MENU_NAMES.map((menuName) => {
    const isActiveFilterClass = activeFilterClass === menuName ? `main-navigation__item--active` : ``;
    return `<a href="#${menuName}" class="main-navigation__item ${isActiveFilterClass}" data-filter-type="${menuName}">${menuName[0].toLocaleUpperCase() + menuName.slice(1)}
              <span class="main-navigation__item-count">${filters[filterType[menuName]]}</span>
            </a>`;
  }).join(``);
};

const createMenuTemplate = (films, activeFilterClass) => {
  return (
    `<nav class="main-navigation">
      <a href="#all" class="main-navigation__item ${activeFilterClass === FilterType.ALL ? `main-navigation__item--active` : ``}" data-filter-type="${FilterType.ALL}">All movies</a>
      ${createMenuListMarkup(films, activeFilterClass)}
      <a href="#${FilterType.STATS}" class="main-navigation__item main-navigation__item--additional ${activeFilterClass === FilterType.STATS ? `main-navigation__item--active` : ``}" data-filter-type="${FilterType.STATS}">Stats</a>
    </nav>`
  );
};

export default class Menu extends AbstractComponent {
  constructor(filters, activeFilterClass) {
    super();

    this._filters = filters;
    this._activeFilterClass = activeFilterClass;
  }

  getTemplate() {
    return createMenuTemplate(this._filters, this._activeFilterClass);
  }

  setMenuClickHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();
      const target = evt.target;

      if (evt.target.tagName !== `A`) {
        return;
      }
      this.setActiveClassForMenu(target);
      handler(target.dataset.filterType);
    });
  }

  setActiveClassForMenu(target) {
    this._getActiveClassMenu().classList.remove(`main-navigation__item--active`);
    target.classList.add(`main-navigation__item--active`);
  }

  _getActiveClassMenu() {
    return this.getElement().querySelector(`.main-navigation__item--active`);
  }
}
