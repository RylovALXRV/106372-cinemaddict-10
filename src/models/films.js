import {FilterType} from "../const";
import {getFilmsByFilter} from "../utils/filter";
import {getFilmsBySort} from "../utils/sort";
import {getWatchedFilmsByFilter} from "../utils/statistics";

export default class Films {
  constructor() {
    this._films = [];
    this._comments = [];

    this._activeFilterType = FilterType.ALL;

    this._filterChangeHandlers = [];
    this._dataChangeHandlers = [];
  }

  setFilms(films) {
    this._films = Array.from(films);
  }

  setComments(comments) {
    this._comments = Array.from(comments);
  }

  getFilms() {
    return getFilmsByFilter(this._films, this._activeFilterType);
  }

  getSortedFilms(sortType) {
    return getFilmsBySort(this.getFilms(), sortType);
  }

  getWatchedFilms(films, filterType) {
    return getWatchedFilmsByFilter(films, filterType);
  }

  getAllFilms() {
    return this._films;
  }

  getComments() {
    return this._comments;
  }

  deleteCommentFilm(film, id) {
    const index = film.comments.findIndex((comment) => comment.id === id);

    if (index === -1) {
      return false;
    }

    film.comments = Array.prototype.concat(film.comments.slice(0, index), film.comments.slice(index + 1));

    return film.comments;
  }

  addCommentFilm(film, comment) {
    film.comments = Array.prototype.concat(film.comments, comment);

    return film.comments;
  }

  updateFilm(id, newData) {
    const index = this._films.findIndex((film) => film.id === id);

    if (index === -1) {
      return false;
    }

    this._films = Array.prototype.concat(this._films.slice(0, index), newData, this._films.slice(index + 1));

    this._callHandlers(this._dataChangeHandlers);

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
    this._dataChangeHandlers.push(handler);
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }
}
