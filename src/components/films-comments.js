import AbstractComponent from "./abstract-component";

const createFilmsCommentsTemplate = () => {
  return (
    `<section class="films-list--extra">
      <h2 class="films-list__title">Most commented</h2>
      <div class="films-list__container"></div>
    </section>`
  );
};

export default class FilmsComments extends AbstractComponent {
  getTemplate() {
    return createFilmsCommentsTemplate();
  }


  getFilmsListContainer() {
    return this.getElement().querySelector(`.films-list__container`);
  }
}
