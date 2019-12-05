import {getUserRank} from "../mock/profile";
import {getRandomInteger} from "../utils";

const createProfileTemplate = () => {
  return (
    `<section class="header__profile profile">
      <p class="profile__rating">${getUserRank(getRandomInteger(0, 30))}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
};

export {createProfileTemplate};
