import {SortType} from "../const";
import Common from "./common";

const getSortedByDateDown = (films) => {
  return films.slice().sort(Common.compareDate);
};

const getSortedByRatingDown = (films) => {
  return films.slice().sort(Common.compareRating);
};

export const getFilmsBySort = (films, sortType) => {
  switch (sortType) {
    case SortType.DEFAULT:
      return films;
    case SortType.DATE_DOWN:
      return getSortedByDateDown(films);
    case SortType.RATING_DOWN:
      return getSortedByRatingDown(films);
  }

  return films;
};
