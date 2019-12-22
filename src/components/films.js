import AbstractComponent from "./abstract-component";

const createNoMoviesMarkup = () => {
  return (
    `<h2 class="films-list__title">There are no movies in our database</h2>`
  );
};

const createFilmsTemplate = () => {
  return (
    `<section class="films">
      <section class="films-list">
        <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
        <div class="films-list__container"></div>
      </section>
    </section>`
  );
};

export default class Films extends AbstractComponent {
  getTemplate() {
    return createFilmsTemplate();
  }

  getFilmsListElement() {
    return this.getElement().querySelector(`.films-list`);
  }

  getFilmsListContainerElement() {
    return this.getElement().querySelector(`.films-list__container`);
  }
}

export {createNoMoviesMarkup};
