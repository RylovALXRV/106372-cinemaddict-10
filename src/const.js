const FilterType = {
  ALL: `all`,
  WATCHLIST: `watchlist`,
  HISTORY: `history`,
  FAVORITES: `favorites`
};

const MENU_NAMES = [
  FilterType.WATCHLIST,
  FilterType.HISTORY,
  FilterType.FAVORITES
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

export {MENU_NAMES, Film, UserRank, Description, RenderPosition, SortType, FilterType};
