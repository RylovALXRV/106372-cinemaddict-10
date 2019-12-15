import {Film, RenderPosition} from "./const";
import {generateFilms} from "./mock/card-film";
import {getAmountFilms} from "./mock/menu";
import FooterStatistics from "./components/footer-statistics";
import {renderFilm} from "./components/card-film";
import ButtonShowMore, {removeButtonShowMore} from "./components/button-show-more";
import Utils from "./utils";
import Profile from "./components/profile";
import Menu from "./components/menu";
import Sort from "./components/sort";
import Films, {createNoMoviesMarkup} from "./components/films";
import FilmsRating from "./components/films-rating";
import FilmsComments from "./components/films-comments";

let filmsCount = Film.SHOW;
const mainElement = document.querySelector(`.main`);

const films = generateFilms(Film.COUNT);

const profileComponent = new Profile(films);
const menuComponent = new Menu(films);
const sortComponent = new Sort();
const filmsComponent = new Films();
const buttonShowMoreComponent = new ButtonShowMore();
const filmsRatingComponent = new FilmsRating();
const filmsCommentsComponent = new FilmsComments();

const renderFilms = (filmCards, parentElement, startIndex, endIndex) => {
  filmCards.slice(startIndex, endIndex).forEach((filmCard) => renderFilm(filmCard, parentElement));
};

const fillHeaderElement = () => {
  Utils.render(document.querySelector(`.header`), profileComponent.getElement(), RenderPosition.BEFOREEND);
};

const renderButtonShowMore = () => {
  buttonShowMoreComponent.getElement().addEventListener(`click`, function () {

    const prevFilmsCount = filmsCount;
    filmsCount += Film.SHOW;
    renderFilms(films, filmsComponent.getFilmsListContainerElement(), prevFilmsCount, filmsCount);
    removeButtonShowMore(buttonShowMoreComponent, filmsCount, films.length);
  });

  Utils.render(filmsComponent.getFilmsListElement(), buttonShowMoreComponent.getElement(), RenderPosition.BEFOREEND);
};

const renderFilmsRatingElement = (filmCards) => {
  if (Utils.isFilmsRating(filmCards)) {
    Utils.render(filmsComponent.getElement(), filmsRatingComponent.getElement(), RenderPosition.BEFOREEND);
    renderFilms(films.slice().sort(Utils.compareRating), filmsRatingComponent.getFilmsListContainer(), Film.START, Film.END);
  }
};

const renderFilmsCommentsElement = (filmCards) => {
  if (Utils.isFilmsComments(filmCards)) {
    Utils.render(filmsComponent.getElement(), filmsCommentsComponent.getElement(), RenderPosition.BEFOREEND);
    renderFilms(films.slice().sort(Utils.compareComments), filmsCommentsComponent.getFilmsListContainer(), Film.START, Film.END);
  }
};

const fillListsWithMovies = () => {
  renderFilms(films, filmsComponent.getFilmsListContainerElement(), Film.START, Film.SHOW);
  renderFilmsRatingElement(films);
  renderFilmsCommentsElement(films);
};

const fillMainElement = () => {
  Utils.render(mainElement, menuComponent.getElement(), RenderPosition.BEFOREEND);
  Utils.render(mainElement, sortComponent.getElement(), RenderPosition.BEFOREEND);
  Utils.render(mainElement, filmsComponent.getElement(), RenderPosition.BEFOREEND);

  if (films.length === getAmountFilms(films).history || !films.length) {
    filmsComponent.getFilmsListElement().innerHTML = ``;
    Utils.render(filmsComponent.getFilmsListElement(), Utils.createElement(createNoMoviesMarkup()), RenderPosition.BEFOREEND);
  } else {
    fillListsWithMovies();
    renderButtonShowMore();
  }
};

const fillFooterElement = () => {
  Utils.render(document.querySelector(`.footer`), new FooterStatistics(films).getElement(), RenderPosition.BEFOREEND);
};

const fillPageElements = () => {
  fillHeaderElement();
  fillMainElement();
  fillFooterElement();
};

fillPageElements();
