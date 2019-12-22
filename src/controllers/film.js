import CardFilm from "../components/card-film";
import Render from "../utils/render";
import {RenderPosition} from "../const";

export default class FilmController {
  constructor(container, onOpen) {
    this._container = container;

    this._cardFilmComponent = null;

    this.onOpen = onOpen;
  }

  render(film) {
    this._cardFilmComponent = new CardFilm(film);

    this._cardFilmComponent.setClickHandler((evt) => {
      evt.preventDefault();
      const target = evt.target;

      if (target !== this._cardFilmComponent.getFilmTitleElement() &&
        target !== this._cardFilmComponent.getFilmPosterElement() &&
        target !== this._cardFilmComponent.getFilmCommentsElement()) {
        return;
      }

      this.onOpen(film, this._cardFilmComponent);
    });

    Render.render(this._container, this._cardFilmComponent.getElement(), RenderPosition.BEFOREEND);
  }
}
