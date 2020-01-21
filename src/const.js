const FilterType = {
  ALL: `all`,
  WATCHLIST: `watchlist`,
  HISTORY: `history`,
  FAVORITES: `favorites`,
  STATS: `stats`
};

const MENU_NAMES = [
  FilterType.WATCHLIST,
  FilterType.HISTORY,
  FilterType.FAVORITES
];

const StatisticsFilterValue = {
  ALL_TIME: `all-time`,
  TODAY: `today`,
  WEEK: `week`,
  MONTH: `month`,
  YEAR: `year`
};

const STATISTICS_PERIODS = [
  StatisticsFilterValue.ALL_TIME,
  StatisticsFilterValue.TODAY,
  StatisticsFilterValue.WEEK,
  StatisticsFilterValue.MONTH,
  StatisticsFilterValue.YEAR
];

const Film = {
  START: 0,
  END: 2,
  SHOW: 5
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

const FilterValue = {
  WATCHLIST: `watchlist`,
  WATCHED: `watched`,
  FAVORITE: `favorite`
};

export {MENU_NAMES, Film, UserRank, Description, RenderPosition, SortType, FilterType,
  StatisticsFilterValue, STATISTICS_PERIODS, FilterValue};
