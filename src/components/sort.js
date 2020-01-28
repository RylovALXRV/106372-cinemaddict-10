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
  }

  getTemplate() {
    return createSortTemplate();
  }

  getSortTypeByDefault() {
    return this.getElement().querySelector(`a`);
  }

  setActiveClassElement(target) {
    this._getButtonActiveElement().classList.remove(`sort__button--active`);
    target.classList.add(`sort__button--active`);
  }

  _getButtonActiveElement() {
    return this.getElement().querySelector(`.sort__button--active`);
  }

  setClickSortTypeChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();
      const target = evt.target;

      if (target.tagName !== `A`) {
        return;
      }
      this.setActiveClassElement(target);

      const sortType = target.dataset.sortType;

      if (sortType === this._currentSortType) {
        return;
      }

      this._currentSortType = sortType;

      handler(this._currentSortType);
    });
  }
}
