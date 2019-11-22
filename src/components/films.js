import {createCardFilmTemplate} from "./card-film";
import {createButtonShowMoreTemplate} from "./button-show-more";

const Count = {
  EXTRA: 3,
  FILM: 6
};

const appendFilms = (count) => {
  return new Array(count).join(createCardFilmTemplate());
};

export const createFilmsTemplate = () => {
  return (
    `<section class="films">
      <section class="films-list">
        <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
        <div class="films-list__container">
          ${appendFilms(Count.FILM)}
        </div>
        ${createButtonShowMoreTemplate()}
      </section>
      <section class="films-list--extra">
        <h2 class="films-list__title">Top rated</h2>
        <div class="films-list__container">
          ${appendFilms(Count.EXTRA)}
        </div>
      </section>
      <section class="films-list--extra">
        <h2 class="films-list__title">Most commented</h2>
        <div class="films-list__container">
          ${appendFilms(Count.EXTRA)}
        </div>
      </section>
    </section>`
  );
};
