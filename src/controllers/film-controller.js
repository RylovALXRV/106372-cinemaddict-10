import CardFilm from "../components/card-film";
import Element from "../utils/element";
import {RenderPosition} from "../const";

export default class FilmController {
  constructor(container, api, onOpen, changeFilmData) {
    this._container = container;

    this._cardFilmComponent = null;
    this._api = api;

    this._onOpen = onOpen;
    this._changeFilmData = changeFilmData;
  }

  render(film) {
    const oldCardFilmComponent = this._cardFilmComponent;
    // добавил oldFilm для обновления(или для восстановления) прежних данных, т.к. данные меняются изначально
    // в случае ошибки - восстанавливаю
    const oldFilm = Object.assign({}, film);

    this._api.getComments(film.id).then((comments) => {
      film.comments = comments;
    });

    this._cardFilmComponent = new CardFilm(film);

    this._cardFilmComponent.setOpenPopupClickHandler(() => this._onOpen(film, this._cardFilmComponent, this));
    this._cardFilmComponent.setAddWatchlistClickHandler(() => this._onAddWatchList(film, oldFilm));
    this._cardFilmComponent.setMarkAsWatchedClickHandler(() => this._onMarkAsWatched(film, oldFilm));
    this._cardFilmComponent.setAddFavoriteClickHandler(() => this._onAddFavorite(film, oldFilm));

    if (oldCardFilmComponent) {
      Element.replace(this._cardFilmComponent.getElement(), oldCardFilmComponent.getElement());
    } else {
      Element.render(this._container, this._cardFilmComponent.getElement(), RenderPosition.BEFOREEND);
    }
  }

  _onAddFavorite(film, oldFilm) {
    film.favorite = !film.favorite;

    this._changeFilmData(this, film).catch(() => {
      film.favorite = oldFilm.favorite;
      this._cardFilmComponent.shake();
    });
  }

  _onAddWatchList(film, oldFilm) {
    film.watchlist = !film.watchlist;

    this._changeFilmData(this, film).catch(() => {
      film.watchlist = oldFilm.watchlist;
      this._cardFilmComponent.shake();
    });
  }

  _onMarkAsWatched(film, oldFilm) {
    film.alreadyWatched = !film.alreadyWatched;

    if (!film.alreadyWatched) {
      film.watchingDate = new Date().toISOString();
      film.personalRating = 0;
    }

    this._changeFilmData(this, film).catch(() => {
      film.alreadyWatched = oldFilm.alreadyWatched;
      film.personalRating = oldFilm.personalRating;
      this._cardFilmComponent.shake();
    });
  }
}
