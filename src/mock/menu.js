const getAmountFilms = (films) => {
  return films.reduce((accumulator, item) => {
    return {
      watchlist: accumulator.watchlist + item.watchlist,
      alreadyWatched: accumulator.alreadyWatched + item.alreadyWatched,
      favorite: accumulator.favorite + item.favorite
    };
  }, {watchlist: 0, favorite: 0, alreadyWatched: 0});
};

export {getAmountFilms};
