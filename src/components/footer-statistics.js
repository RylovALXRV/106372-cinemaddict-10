import Utils from "../utils";

const createFooterStatisticsTemplate = (films) => {
  return (
    `<section class="footer__statistics">
      <p>${films.length} movies inside</p>
    </section>`
  );
};

export default class FooterStatistics {
  constructor(films) {
    this._element = null;
    this._films = films;
  }

  getTemplate() {
    return createFooterStatisticsTemplate(this._films);
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
