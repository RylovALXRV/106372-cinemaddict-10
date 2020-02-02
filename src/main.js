import {RenderPosition} from "./const";
import API from "./api";
import Profile from "./components/profile";
import FooterStatistics from "./components/footer-statistics";
import PageController from "./controllers/page-controller";
import Element from "./utils/element";
import FilmsModel from "./models/films";
import {createLoadingMarkup} from "./components/films";

const BASE = 36;
const END_POINT = `https://htmlacademy-es-10.appspot.com/cinemaddict`;
const authorization = `Basic ${Math.random().toString(BASE)}`;

const api = new API(END_POINT, authorization);
const filmsModel = new FilmsModel();

Element.render(document.querySelector(`.main`), Element.create(createLoadingMarkup()), RenderPosition.BEFOREEND);

api.getFilms()
  .then((films) => {
    document.querySelector(`.films`).remove();
    filmsModel.setFilms(films);

    Element.render(document.querySelector(`.header`), new Profile(filmsModel.getAllFilms()).getElement(), RenderPosition.BEFOREEND);
    new PageController(document.querySelector(`.main`), filmsModel, api).render();
    Element.render(document.querySelector(`.footer`), new FooterStatistics(filmsModel.getAllFilms()).getElement(), RenderPosition.BEFOREEND);
  });
