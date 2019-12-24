const MONTH_NAMES = [
  `January`,
  `February`,
  `March`,
  `April`,
  `May`,
  `June`,
  `July`,
  `August`,
  `September`,
  `October`,
  `November`,
  `December`,
];

const MENU_NAMES = [
  `watchlist`,
  `history`,
  `favorites`
];

const Film = {
  START: 0,
  END: 2,
  SHOW: 5,
  COUNT: 22
};

const UserRank = {
  'NO_RANK': 0,
  'NOTICE': 10,
  'FAN': 20
};

const Description = {
  'MAX_LENGTH': 140,
  'DEFAULT_LENGTH': 139
};

const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  AFTEREND: `afterend`,
  BEFOREEND: `beforeend`
};

const SortType = {
  DATE_DOWN: `date-down`,
  DEFAULT: `default`,
  RATING_DOWN: `rating-down`
};

export {MONTH_NAMES, MENU_NAMES, Film, UserRank, Description, RenderPosition, SortType};
