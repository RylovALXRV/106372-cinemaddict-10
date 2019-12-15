import Utils from "../utils";

const createFilmsCommentsTemplate = () => {
  return (
    `<section class="films-list--extra">
      <h2 class="films-list__title">Most commented</h2>
      <div class="films-list__container"></div>
    </section>`
  );
};

export default class FilmsComments {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createFilmsCommentsTemplate();
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
