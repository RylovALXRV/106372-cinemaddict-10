import CardFilm from "../components/card-film";
import Render from "../utils/render";
import {RenderPosition} from "../const";
import FilmDetails from "../components/film-details";

export default class FilmController {
  constructor(container, onOpen, onDataChange) {
    this._container = container;

    this._cardFilmComponent = null;
    this._editCardFilmComponent = null;

    this._onOpen = onOpen;
    this._onDataChange = onDataChange;
  }

  render(film) {
    const oldCardFilmComponent = this._cardFilmComponent;

    this._cardFilmComponent = new CardFilm(film);
    this._editCardFilmComponent = new FilmDetails(film);

    this._cardFilmComponent.setClickOpenPopupHandler(() => this._onOpen(film, this._cardFilmComponent, this._editCardFilmComponent, this));

    this._cardFilmComponent.setClickAddWatchlistHandler(() => {
      this._onDataChange(this, film, Object.assign({}, film, {
        isWatchlist: !film.isWatchlist,
      }));
    });

    this._cardFilmComponent.setClickMarkAsWatchedHandler(() => {
      const isHistory = !film.isHistory;

      this._onDataChange(this, film, Object.assign({}, film, {
        isHistory,
        watchingDate: isHistory ? new Date() : ``
      }));
    });

    this._cardFilmComponent.setClickFavoriteHandler(() => {
      this._onDataChange(this, film, Object.assign({}, film, {
        isFavorites: !film.isFavorites,
      }));
    });

    if (oldCardFilmComponent) {
      Render.replace(this._cardFilmComponent.getElement(), oldCardFilmComponent.getElement());
    } else {
      Render.render(this._container, this._cardFilmComponent.getElement(), RenderPosition.BEFOREEND);
    }
  }
}
