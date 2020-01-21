import {FilterType} from "../const";

const getWatchlistFilms = (films) => {
  return films.filter((film) => !!film.watchlist);
};

const getHistoryFilms = (films) => {
  return films.filter((film) => !!film.alreadyWatched);
};

const getFavoritesFilms = (films) => {
  return films.filter((film) => !!film.favorite);
};

export const getFilmsByFilter = (films, filterType) => {
  switch (filterType) {
    case FilterType.ALL:
      return films;
    case FilterType.WATCHLIST:
      return getWatchlistFilms(films);
    case FilterType.HISTORY:
      return getHistoryFilms(films);
    case FilterType.FAVORITES:
      return getFavoritesFilms(films);
  }

  return films;
};
