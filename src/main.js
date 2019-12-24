import {Film, RenderPosition} from "./const";
import {generateFilms} from "./mock/card-film";
import Profile from "./components/profile";
import FooterStatistics from "./components/footer-statistics";
import PageController from "./controllers/page";
import Render from "./utils/render";

const films = generateFilms(Film.COUNT);

Render.render(document.querySelector(`.header`), new Profile(films).getElement(), RenderPosition.BEFOREEND);
Render.render(document.querySelector(`.footer`), new FooterStatistics(films).getElement(), RenderPosition.BEFOREEND);

new PageController(document.querySelector(`.main`), films).render();
