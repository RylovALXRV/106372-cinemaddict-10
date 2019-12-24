import {RenderPosition} from "../const";
import Render from "../utils/render";
import Films from "../components/films";
import Menu from "../components/menu";
import Sort from "../components/sort";
import FilmsController from "./films";

export default class PageController {
  constructor(container, films) {
    this._container = container;
    this._films = films;

    this._filmsComponent = new Films();
    this._menuComponent = new Menu(this._films);
    this._sortComponent = new Sort();

    this._filmsController = new FilmsController(this._filmsComponent);

    this._sortComponent.setClickSortTypeChangeHandler(this._filmsController.onSortTypeChange);
  }

  render() {
    Render.render(this._container, this._menuComponent.getElement(), RenderPosition.BEFOREEND);
    Render.render(this._container, this._sortComponent.getElement(), RenderPosition.BEFOREEND);
    Render.render(this._container, this._filmsComponent.getElement(), RenderPosition.BEFOREEND);
    this._filmsController.render(this._films);
  }
}
