import AbstractComponent from "./abstract-component";

const createFilmsRatingTemplate = () => {
  return (
    `<section class="films-list--extra">
       <h2 class="films-list__title">Top rated</h2>
       <div class="films-list__container"></div>
     </section>`
  );
};

export default class FilmsRating extends AbstractComponent {
  getTemplate() {
    return createFilmsRatingTemplate();
  }

  getFilmsListContainerElement() {
    return this.getElement().querySelector(`.films-list__container`);
  }
}
