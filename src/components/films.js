import {createCardFilmTemplate} from "./card-film";
import {createButtonShowMoreTemplate} from "./button-show-more";

const Count = {
  EXTRA: 2,
  FILM: 5
};

const renderFilms = (count) => {
  return new Array(count).fill(``).map(createCardFilmTemplate).join(``);
};

export const createFilmsTemplate = () => {
  return (
    `<section class="films">
      <section class="films-list">
        <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
        <div class="films-list__container">
          ${renderFilms(Count.FILM)}
        </div>
        ${createButtonShowMoreTemplate()}
      </section>
      <section class="films-list--extra">
        <h2 class="films-list__title">Top rated</h2>
        <div class="films-list__container">
          ${renderFilms(Count.EXTRA)}
        </div>
      </section>
      <section class="films-list--extra">
        <h2 class="films-list__title">Most commented</h2>
        <div class="films-list__container">
          ${renderFilms(Count.EXTRA)}
        </div>
      </section>
    </section>`
  );
};
