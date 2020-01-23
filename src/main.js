import {RenderPosition} from "./const";
import API from "./api";
import Profile from "./components/profile";
import FooterStatistics from "./components/footer-statistics";
import PageController from "./controllers/page";
import Render from "./utils/render";
import Films from "./models/films";

const BASE = 36;
const END_POINT = `https://htmlacademy-es-10.appspot.com/cinemaddict`;
const authorization = `Basic ${Math.random().toString(BASE)}`;

const api = new API(END_POINT, authorization);
const filmsModel = new Films();

api.getFilms()
  .then((films) => {
    filmsModel.setFilms(films);

    const commentsPromises = films.map((film) => api.getComments(film.id).then((comments) => comments));
    Promise.all(commentsPromises).then((comments) => {
      filmsModel.setComments(comments);
      Render.render(document.querySelector(`.header`), new Profile(filmsModel.getAllFilms()).getElement(), RenderPosition.BEFOREEND);
      Render.render(document.querySelector(`.footer`), new FooterStatistics(filmsModel.getAllFilms()).getElement(), RenderPosition.BEFOREEND);
      new PageController(document.querySelector(`.main`), filmsModel, api).render();
    });
  });
