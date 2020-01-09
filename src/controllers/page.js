import {RenderPosition} from "../const";
import Render from "../utils/render";
import Films from "../components/films";
import Sort from "../components/sort";
import FilmsController from "./films";
import FilterController from "./filter";

export default class PageController {
  constructor(container, filmsModel) {
    this._container = container;
    this._filmsModels = filmsModel;

    this._filmsComponent = new Films();
    this._sortComponent = new Sort();

    this._filmsController = new FilmsController(this._filmsComponent, filmsModel);
    this._filterController = new FilterController(this._container, filmsModel);

    this._sortComponent.setClickSortTypeChangeHandler(this._filmsController._onSortTypeChange);
  }

  render() {
    this._filterController.render();
    Render.render(this._container, this._sortComponent.getElement(), RenderPosition.BEFOREEND);
    Render.render(this._container, this._filmsComponent.getElement(), RenderPosition.BEFOREEND);
    this._filmsController.render(this._filmsModels.getAllFilms());
  }
}
