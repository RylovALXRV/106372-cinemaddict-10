import {createFilmDetailsTemplate} from "./components/film-details";
import {createMenuTemplate} from "./components/menu";
import {createSortTemplate} from "./components/filters";
import {createFilmsTemplate} from "./components/films";
import {createProfileTemplate} from "./components/profile";

const mainElement = document.querySelector(`.main`);

const render = (container, template, position = `beforeend`) => {
  container.insertAdjacentHTML(position, template);
};

const fillHeaderElement = () => {
  render(document.querySelector(`.header`), createProfileTemplate());
};

const fillMainElement = () => {
  render(mainElement, createMenuTemplate());
  render(mainElement, createSortTemplate());
  render(mainElement, createFilmsTemplate());
};

const fillPageElements = () => {
  fillHeaderElement();
  fillMainElement();
  render(document.body, createFilmDetailsTemplate());
};

fillPageElements();
