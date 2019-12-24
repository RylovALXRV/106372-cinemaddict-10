import AbstractComponent from "./abstract-component";
import {SortType} from "../const";

export const createSortTemplate = () => {
  return (
    `<ul class="sort">
      <li><a href="#" class="sort__button sort__button--active" data-sort-type="default">Sort by default</a></li>
      <li><a href="#" class="sort__button" data-sort-type="date-down">Sort by date</a></li>
      <li><a href="#" class="sort__button" data-sort-type="rating-down">Sort by rating</a></li>
    </ul>`
  );
};

export default class Sort extends AbstractComponent {
  constructor() {
    super();

    this._currentSortType = SortType.DEFAULT;
    this._currentActiveElement = ``;
  }

  getTemplate() {
    return createSortTemplate();
  }

  _setActiveClassElement(target) {
    this._currentActiveElement = this.getElement().querySelector(`.sort__button--active`);
    this._currentActiveElement.classList.remove(`sort__button--active`);
    target.classList.add(`sort__button--active`);
  }

  setClickSortTypeChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();
      const target = evt.target;

      if (target.tagName !== `A`) {
        return;
      }
      this._setActiveClassElement(target);

      const sortType = target.dataset.sortType;

      if (sortType === this._currentSortType) {
        return;
      }

      this._currentSortType = sortType;

      handler(this._currentSortType);
    });
  }
}
