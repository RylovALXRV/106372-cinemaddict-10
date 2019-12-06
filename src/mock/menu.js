const MENU = [
  `watchlist`,
  `history`,
  `favorites`
];

/*
* Оставил пару возможный вариантов.
* Так и не понял, нужно ли фильтровать данные или здесь только посчитать нужно.
* и можно ли так отфильтровать данные за один проход как в ф-ии getFilteredFilms
* */

// const getAmountFilms = (films) => {
//   return films.reduce((accumulator, item) => {
//     return {
//       watchlist: accumulator.watchlist + item.isWatchlist,
//       history: accumulator.history + item.isHistory,
//       favorites: accumulator.favorites + item.isFavorites
//     };
//   }, {watchlist: 0, favorites: 0, history: 0});
// };

const getFilteredFilms = (films) => {
  const watchLists = [];
  const histories = [];
  const favorites = [];

  return films.reduce((accumulator, item) => {
    const {isWatchlist, isHistory, isFavorites} = item;

    if (isWatchlist) {
      watchLists.push(item);
    }
    if (isHistory) {
      histories.push(item);
    }
    if (isFavorites) {
      favorites.push(item);
    }

    return {
      watchlist: watchLists,
      history: histories,
      favorites
    };
  }, 0);
};

export {MENU, getFilteredFilms};
