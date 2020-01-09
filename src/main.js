import {Film, RenderPosition} from "./const";
import {generateFilms} from "./mock/card-film";
import Profile from "./components/profile";
import FooterStatistics from "./components/footer-statistics";
import PageController from "./controllers/page";
import Render from "./utils/render";
import Films from "./models/films";

const films = generateFilms(Film.COUNT);

const filmsModel = new Films();
filmsModel.setFilms(films);

Render.render(document.querySelector(`.header`), new Profile(filmsModel.getAllFilms()).getElement(), RenderPosition.BEFOREEND);
Render.render(document.querySelector(`.footer`), new FooterStatistics(filmsModel.getAllFilms()).getElement(), RenderPosition.BEFOREEND);

new PageController(document.querySelector(`.main`), filmsModel).render();
