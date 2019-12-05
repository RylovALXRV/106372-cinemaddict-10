import {filteredByFeature} from "./filter";

const Menu = [
  `Watchlist`,
  `History`,
  `Favorites`
];

const getFilteredFilms = (films) => {
  return {
    Favorites: filteredByFeature(films, `isFavorites`),
    History: filteredByFeature(films, `isWatched`),
    Watchlist: filteredByFeature(films, `isWatchlist`)
  };
};

export {getFilteredFilms, Menu};
