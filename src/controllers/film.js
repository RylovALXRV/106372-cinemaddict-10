import CardFilm from "../components/card-film";
import Render from "../utils/render";
import {RenderPosition} from "../const";

export default class FilmController {
  constructor(container, onOpen) {
    this._container = container;

    this._cardFilmComponent = null;

    this._onOpen = onOpen;
  }

  render(film) {
    this._cardFilmComponent = new CardFilm(film);

    this._cardFilmComponent.setClickHandler(this._onOpen);

    Render.render(this._container, this._cardFilmComponent.getElement(), RenderPosition.BEFOREEND);
  }
}
