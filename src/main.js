import {Films} from "./const";
import {createFilmDetailsTemplate} from "./components/film-details";
import {createMenuTemplate} from "./components/menu";
import {createSortTemplate} from "./components/filters";
import {createFilmsTemplate, renderFilms} from "./components/films";
import {createProfileTemplate} from "./components/profile";
import {generateFilms} from "./mock/card-film";
import {removeButtonShowMore} from "./components/button-show-more";

const films = generateFilms(Films.COUNT);

const mainElement = document.querySelector(`.main`);

const render = (container, template, position = `beforeend`) => {
  container.insertAdjacentHTML(position, template);
};

const fillHeaderElement = () => {
  render(document.querySelector(`.header`), createProfileTemplate());
};

const fillMainElement = () => {
  render(mainElement, createMenuTemplate(films.slice(Films.START, Films.SHOW)));
  render(mainElement, createSortTemplate());
  render(mainElement, createFilmsTemplate(films));
};

const fillPageElements = () => {
  fillHeaderElement();
  fillMainElement();
  render(document.body, createFilmDetailsTemplate(films[0]));
};

fillPageElements();

const buttonShowMore = document.querySelector(`.films-list__show-more`);
let filmsCount = Films.SHOW;

buttonShowMore.addEventListener(`click`, function () {
  const prevFilmsCount = filmsCount;
  filmsCount += Films.SHOW;

  render(document.querySelector(`.films-list__container`), renderFilms(films, prevFilmsCount, filmsCount));
  render(mainElement, createMenuTemplate(films.slice(Films.START, filmsCount)), `afterbegin`);
  removeButtonShowMore(filmsCount, films.length);
});
