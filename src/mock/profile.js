const getUserRank = (count) => {
  let rank;

  if (count === 0) {
    rank = ``;
  } else if (count <= 10) {
    rank = `notice`;
  } else if (count <= 20) {
    rank = `fan`;
  } else {
    rank = `movie buff`;
  }

  return rank;
};

export {getUserRank};
