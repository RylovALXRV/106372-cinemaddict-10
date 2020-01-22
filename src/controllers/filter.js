import {RenderPosition} from "../const";
import {getAmountFilms} from "../utils/filter";
import Menu from "../components/menu";
import Render from "../utils/render";

export default class FilterController {
  constructor(container, filmsModel, onSwitchScreens) {
    this._container = container;
    this._filmsModel = filmsModel;
    this._onSwitchScreens = onSwitchScreens;

    this._activeFilterType = null;
    this._filterComponent = null;

    this._onFilterChange = this._onFilterChange.bind(this);
    this._onDataChange = this._onDataChange.bind(this);

    this._filmsModel.setDataChangeHandler(this._onDataChange);
  }

  render() {
    const container = this._container;

    const filters = getAmountFilms(this._filmsModel.getAllFilms());

    const oldFilterComponent = this._filterComponent;

    this._filterComponent = new Menu(filters);
    this._filterComponent.setMenuChangeHandler(this._onFilterChange);

    if (oldFilterComponent) {
      Render.replace(this._filterComponent.getElement(), oldFilterComponent.getElement());
    } else {
      Render.render(container, this._filterComponent.getElement(), RenderPosition.BEFOREEND);
    }
  }

  _onFilterChange(filterType) {
    this._filmsModel.setFilter(filterType);
    this._onSwitchScreens(filterType);
    this._activeFilterType = filterType;
  }

  _onDataChange() {
    this.render();
  }
}
