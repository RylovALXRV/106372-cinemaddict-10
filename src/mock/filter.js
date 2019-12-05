const filteredByFeature = (films, features) => {
  return films.filter((film) => {
    return !!film[features];
  });
};

const filterComments = (films) => {
  return films.filter((film) => {
    return film.comments.length > 0;
  });
};

const filterRating = (films) => {
  return films.filter((film) => {
    return film.rating > 0;
  });
};

const sortByComments = (filmA, filmB) => {
  return filmB.comments.length - filmA.comments.length;
};

const sortByRating = (filmA, filmB) => {
  return filmB.rating - filmA.rating;
};

export {sortByComments, sortByRating, filterComments, filterRating, filteredByFeature};
