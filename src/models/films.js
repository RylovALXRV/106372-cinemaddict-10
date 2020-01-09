import {FilterType} from "../const";
import {getFilmsByFilter} from "../utils/filter";

export default class Films {
  constructor() {
    this._films = [];

    this._activeFilterType = FilterType.ALL;

    this._filterChangeHandlers = [];
    this._dataChangeHandler = [];
  }

  setFilms(films) {
    this._films = Array.from(films);
  }

  getFilms() {
    return getFilmsByFilter(this._films, this._activeFilterType);
  }

  getAllFilms() {
    return this._films;
  }

  updateFilm(id, newFilm) {
    const index = this._films.findIndex((film) => film.id === id);

    if (index === -1) {
      return false;
    }
    this._films = Array.prototype.concat(this._films.slice(0, index), newFilm, this._films.slice(index + 1));

    this._callHandlers(this._dataChangeHandler);

    return true;
  }

  setFilter(filterType) {
    this._activeFilterType = filterType;
    this._filterChangeHandlers.forEach((handler) => handler());
  }

  setFilterChangeHandler(handler) {
    this._filterChangeHandlers.push(handler);
  }

  setDataChangeHandler(handler) {
    this._dataChangeHandler.push(handler);
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }
}
