import {createCardFilmTemplate} from "./card-film";
import {createButtonShowMoreTemplate} from "./button-show-more";
import {Films} from "../const";
import {isFilmsComments, isFilmsRating, compareComments, compareRating} from "../mock/filter";

const renderFilms = (films, startIndex, endIndex) => {
  return films.slice(startIndex, endIndex).map((film) => createCardFilmTemplate(film)).join(``);
};

const createFilmsRatedTemplate = (films) => {

  return (isFilmsRating(films)) ?
    `<section class="films-list--extra">
       <h2 class="films-list__title">Top rated</h2>
       <div class="films-list__container">
         ${renderFilms(films.sort(compareRating), Films.START, Films.END)}
       </div>
     </section>` : ``;
};

const createFilmsCommentsTemplate = (films) => {

  return (isFilmsComments(films)) ?
    `<section class="films-list--extra">
      <h2 class="films-list__title">Most commented</h2>
      <div class="films-list__container">
        ${renderFilms(films.sort(compareComments), Films.START, Films.END)}
      </div>
    </section>` : ``;
};

const createFilmsTemplate = (films) => {
  return (
    `<section class="films">
      <section class="films-list">
        <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
        <div class="films-list__container">
          ${renderFilms(films, Films.START, Films.SHOW)}
        </div>
        ${createButtonShowMoreTemplate()}
      </section>
      ${createFilmsRatedTemplate(films)}
      ${createFilmsCommentsTemplate(films)}
    </section>`
  );
};

export {renderFilms, createFilmsTemplate};
