import Utils from "../utils";

const createFilmsRatingTemplate = () => {
  return (
    `<section class="films-list--extra">
       <h2 class="films-list__title">Top rated</h2>
       <div class="films-list__container"></div>
     </section>`);
};

export default class FilmsRating {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createFilmsRatingTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = Utils.createElement(this.getTemplate());
    }
    return this._element;
  }

  getFilmsListContainer() {
    return this.getElement().querySelector(`.films-list__container`);
  }

  removeElement() {
    this._element = null;
  }
}
