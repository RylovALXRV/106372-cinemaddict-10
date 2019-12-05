import {getFilteredFilms, Menu} from "../mock/menu";

const createMenuListMarkup = (films) => {
  const filteredFilms = getFilteredFilms(films);

  return Menu.map((item) => {
    return `<a href="#${item.toLocaleLowerCase()}" class="main-navigation__item">${item}
              <span class="main-navigation__item-count">${filteredFilms[item].length}</span>
            </a>`;
  }).join(``);
};

const removeMenu = () => {
  const menuElement = document.querySelector(`.main-navigation`);

  if (menuElement) {
    menuElement.remove();
  }
};

const createMenuTemplate = (films) => {
  removeMenu();

  return (
    `<nav class="main-navigation">
      <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
      ${createMenuListMarkup(films)}
      <a href="#stats" class="main-navigation__item main-navigation__item--additional">Stats</a>
    </nav>`
  );
};

export {createMenuTemplate};
