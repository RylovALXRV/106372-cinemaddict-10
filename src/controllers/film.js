import CardFilm from "../components/card-film";
import Render from "../utils/render";
import {RenderPosition} from "../const";
import FilmModel from "../models/film";
// import moment from "moment";

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

    this._cardFilmComponent.setClickOpenPopupHandler(() => this._onOpen(film, this._cardFilmComponent, this._editCardFilmComponent, this));

    this._cardFilmComponent.setClickAddWatchlistHandler(() => {
      const newFilm = FilmModel.clone(film);
      newFilm.watchlist = !newFilm.watchlist;
      this._onDataChange(this, film, newFilm);
    });

    this._cardFilmComponent.setClickMarkAsWatchedHandler(() => {
      const newFilm = FilmModel.clone(film);
      newFilm.alreadyWatched = !newFilm.alreadyWatched;
      // newFilm.watchingDate = newFilm.alreadyWatched ? moment(new Date()).format(`YYYY-MM-DDTHH:MM:SS`) : null;

      this._onDataChange(this, film, newFilm);
    });

    this._cardFilmComponent.setClickFavoriteHandler(() => {
      const newFilm = FilmModel.clone(film);
      newFilm.favorite = !newFilm.favorite;

      this._onDataChange(this, film, newFilm);
    });

    if (oldCardFilmComponent) {
      Render.replace(this._cardFilmComponent.getElement(), oldCardFilmComponent.getElement());
    } else {
      Render.render(this._container, this._cardFilmComponent.getElement(), RenderPosition.BEFOREEND);
    }
  }
}
