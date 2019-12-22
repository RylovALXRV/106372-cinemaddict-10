import {RenderPosition} from "../const";

export default class Render {
  static createElement(template) {
    const divElement = document.createElement(`div`);
    divElement.innerHTML = template;

    return divElement.firstElementChild;
  }

  static render(container, template, position) {
    switch (position) {
      case RenderPosition.BEFOREEND:
        container.append(template);
        break;
      case RenderPosition.AFTERBEGIN:
        container.prepend(template);
        break;
      case RenderPosition.AFTEREND:
        container.after(template);
        break;
    }
  }

  static remove(component) {
    component.getElement().remove();
    component.removeElement();
  }
}
