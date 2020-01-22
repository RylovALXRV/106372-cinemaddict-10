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

export const getAmountFilms = (films) => {
  return films.reduce((accumulator, item) => {
    return {
      watchlist: accumulator.watchlist + item.watchlist,
      alreadyWatched: accumulator.alreadyWatched + item.alreadyWatched,
      favorite: accumulator.favorite + item.favorite
    };
  }, {watchlist: 0, favorite: 0, alreadyWatched: 0});
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
