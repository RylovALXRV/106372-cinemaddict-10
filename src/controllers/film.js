import CardFilm from "../components/card-film";
import Render from "../utils/render";
import {RenderPosition} from "../const";

export default class FilmController {
  constructor(container, onOpen, onDataChange) {
    this._container = container;

    this._cardFilmComponent = null;

    this._onOpen = onOpen;
    this._onDataChange = onDataChange;
  }

  render(film) {
    const oldCardFilmComponent = this._cardFilmComponent;

    this._cardFilmComponent = new CardFilm(film);

    this._cardFilmComponent.setClickOpenPopupHandler(() => this._onOpen(film, this._cardFilmComponent, this));

    this._cardFilmComponent.setClickAddWatchlistHandler(() => {
      this._onDataChange(this, film, Object.assign({}, film, {
        isWatchlist: !film.isWatchlist,
      }));
    });

    this._cardFilmComponent.setClickMarkAsWatchedHandler(() => {
      this._onDataChange(this, film, Object.assign({}, film, {
        isHistory: !film.isHistory,
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
