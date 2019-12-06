import {MENU, getFilteredFilms} from "../mock/menu";

const createMenuListMarkup = (films) => {
  const filteredFilms = getFilteredFilms(films);

  return MENU.map((item) => {
    return `<a href="#${item}" class="main-navigation__item">${item[0].toLocaleUpperCase() + item.slice(1)}
              <span class="main-navigation__item-count">${filteredFilms[item].length}</span>
            </a>`;
  }).join(``);
};

// здесь не понял про активный элемент
const createMenuTemplate = (films) => {
  return (
    `<nav class="main-navigation">
      <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
      ${createMenuListMarkup(films)}
      <a href="#stats" class="main-navigation__item main-navigation__item--additional">Stats</a>
    </nav>`
  );
};

export {createMenuTemplate};
