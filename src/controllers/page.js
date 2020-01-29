import {RenderPosition, FilterType} from "../const";
import Render from "../utils/render";
import Films from "../components/films";
import Sort from "../components/sort";
import FilmsController from "./films";
import FilterController from "./filter";
import Statistics from "../components/statistics";

export default class PageController {
  constructor(container, filmsModel, api) {
    this._container = container;
    this._filmsModel = filmsModel;

    this._filmsComponent = new Films();
    this._sortComponent = new Sort();
    this._statisticsComponent = new Statistics(filmsModel);

    this._onSwitchScreens = this._onSwitchScreens.bind(this);

    this._filmsController = new FilmsController({
      container: this._filmsComponent,
      api,
      filmsModel,
      sortComponent: this._sortComponent,
      statisticComponent: this._statisticsComponent
    });
    this._filterController = new FilterController(this._container, filmsModel, this._onSwitchScreens);

    this._sortComponent.setClickSortTypeChangeHandler(this._filmsController._onSortTypeChange);
    this._onSwitchScreens(FilterType.ALL);
  }

  render() {
    this._filterController.render();
    Render.render(this._container, this._sortComponent.getElement(), RenderPosition.BEFOREEND);
    Render.render(this._container, this._filmsComponent.getElement(), RenderPosition.BEFOREEND);
    Render.render(this._container, this._statisticsComponent.getElement(), RenderPosition.BEFOREEND);
    this._filmsController.render(this._filmsModel.getAllFilms());

    this._statisticsComponent.setSwitchStatisticFilter((filterValue) => {
      return this._filmsModel.getWatchedFilms(this._statisticsComponent._getFilteredFilmsHistory(), filterValue);
    });
  }

  _onSwitchScreens(filterType) {
    if (filterType === FilterType.STATS) {
      this._statisticsComponent.show();
      this._sortComponent.hide();
      this._filmsComponent.hide();
    } else {
      this._statisticsComponent.hide();
      this._sortComponent.show();
      this._filmsComponent.show();
    }
  }
}
