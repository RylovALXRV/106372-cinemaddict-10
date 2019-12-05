import {createCardFilmTemplate} from "./card-film";
import {createButtonShowMoreTemplate} from "./button-show-more";
import {Films} from "../const";
import {filterRating, sortByRating, filterComments, sortByComments} from "../mock/filter";

const renderFilms = (films, startIndex, endIndex) => {
  return films.slice(startIndex, endIndex).map((film) => createCardFilmTemplate(film)).join(``);
};

const createFilmsRatedTemplate = (films) => {
  const filmsRating = filterRating(films).sort(sortByRating);

  return (filmsRating.length > 0) ?
    `<section class="films-list--extra">
       <h2 class="films-list__title">Top rated</h2>
       <div class="films-list__container">
         ${renderFilms(filmsRating, Films.START, Films.END)}
       </div>
     </section>` : ``;
};

const createFilmsCommentsTemplate = (films) => {
  const filmsComment = filterComments(films).sort(sortByComments);

  return (filmsComment.length > 0) ?
    `<section class="films-list--extra">
      <h2 class="films-list__title">Most commented</h2>
      <div class="films-list__container">
        ${renderFilms(filmsComment, Films.START, Films.END)}
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
