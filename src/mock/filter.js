const isFilmsRating = (films) => {
  return films.some((film) => {
    return film.rating > 0;
  });
};

const isFilmsComments = (films) => {
  return films.some((film) => {
    return film.comments.length > 0;
  });
};

const compareComments = (filmA, filmB) => {
  return filmB.comments.length - filmA.comments.length;
};

const compareRating = (filmA, filmB) => {
  return filmB.rating - filmA.rating;
};

export {compareComments, compareRating, isFilmsComments, isFilmsRating};
