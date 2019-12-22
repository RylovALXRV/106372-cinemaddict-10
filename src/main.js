import {Film} from "./const";
import {generateFilms} from "./mock/card-film";
import PageController from "./controllers/page";

const films = generateFilms(Film.COUNT);

new PageController(films).render();
