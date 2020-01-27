import CardFilm from "../components/card-film";
import Render from "../utils/render";
import {RenderPosition, SHAKE_ANIMATION_TIMEOUT} from "../const";

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

    this._api.getComments(film.id).then((comments) => {
      film.comments = comments;
    });

    this._cardFilmComponent = new CardFilm(film);

    this._cardFilmComponent.setClickOpenPopupHandler(() => this._onOpen(film, this._cardFilmComponent, this));

    this._cardFilmComponent.setClickAddWatchlistHandler(() => {
      film.watchlist = !film.watchlist;

      this._changeFilmData(this, film).catch(() => {
        this._shake();
      });
    });

    this._cardFilmComponent.setClickMarkAsWatchedHandler(() => {
      film.alreadyWatched = !film.alreadyWatched;

      if (!film.alreadyWatched) {
        film.watchingDate = new Date().toISOString();
        film.personalRating = 0;
      }

      this._changeFilmData(this, film).catch(() => {
        this._shake();
      });
    });

    this._cardFilmComponent.setClickFavoriteHandler(() => {
      film.favorite = !film.favorite;

      this._changeFilmData(this, film).catch(() => {
        this._shake();
      });
    });

    if (oldCardFilmComponent) {
      Render.replace(this._cardFilmComponent.getElement(), oldCardFilmComponent.getElement());
    } else {
      Render.render(this._container, this._cardFilmComponent.getElement(), RenderPosition.BEFOREEND);
    }
  }

  _shake() {
    this._cardFilmComponent.getElement().style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / 1000}s`;

    setTimeout(() => {
      this._cardFilmComponent.getElement().style.animation = ``;
    }, SHAKE_ANIMATION_TIMEOUT);
  }
}
