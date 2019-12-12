import Utils from "../utils";

const removeButtonShowMore = (buttonComponent, currentFilmsCount, filmsCount) => {
  if (currentFilmsCount >= filmsCount) {
    buttonComponent.getElement().remove();
    buttonComponent.removeElement();
  }
};

const createButtonShowMoreTemplate = () => {
  return (
    `<button class="films-list__show-more">Show more</button>`
  );
};

export default class ButtonShowMore {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createButtonShowMoreTemplate();
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

export {removeButtonShowMore};
