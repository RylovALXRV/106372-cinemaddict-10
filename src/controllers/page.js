import {RenderPosition} from "../const";
import Render from "../utils/render";
import Films from "../components/films";
import FooterStatistics from "../components/footer-statistics";
import Menu from "../components/menu";
import Profile from "../components/profile";
import Sort from "../components/sort";
import FilmsController from "./films";

export default class PageController {
  constructor(films) {
    this._films = films;

    this._filmsComponent = new Films();
    this._footerStatisticsComponent = new FooterStatistics(this._films);
    this._menuComponent = new Menu(this._films);
    this._profileComponent = new Profile(this._films);
    this._sortComponent = new Sort();

    this._filmsController = new FilmsController(this._filmsComponent);
  }

  _renderHeaderElement() {
    Render.render(document.querySelector(`.header`), this._profileComponent.getElement(), RenderPosition.BEFOREEND);
  }

  _renderMainElement() {
    const mainElement = document.querySelector(`.main`);

    Render.render(mainElement, this._menuComponent.getElement(), RenderPosition.BEFOREEND);
    Render.render(mainElement, this._sortComponent.getElement(), RenderPosition.BEFOREEND);
    Render.render(mainElement, this._filmsComponent.getElement(), RenderPosition.BEFOREEND);
    this._filmsController.render(this._films);
  }

  _renderFooterElement() {
    Render.render(document.querySelector(`.footer`), this._footerStatisticsComponent.getElement(), RenderPosition.BEFOREEND);
  }

  render() {
    this._renderHeaderElement();
    this._renderMainElement();
    this._renderFooterElement();
  }
}
