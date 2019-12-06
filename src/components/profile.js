import {getUserRank} from "../utils";
import {getFilteredFilms} from "../mock/menu";

const createProfileTemplate = (films) => {
  const historiesFilms = getFilteredFilms(films).history;

  return (
    `<section class="header__profile profile">
      <p class="profile__rating">${getUserRank(historiesFilms.length)}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
};

export {createProfileTemplate};
