const MENU = [
  `watchlist`,
  `history`,
  `favorites`
];

const getAmountFilms = (films) => {
  return films.reduce((accumulator, item) => {
    return {
      watchlist: accumulator.watchlist + item.isWatchlist,
      history: accumulator.history + item.isHistory,
      favorites: accumulator.favorites + item.isFavorites
    };
  }, {watchlist: 0, favorites: 0, history: 0});
};

export {MENU, getAmountFilms};
