const Description = {
  'MAX_LENGTH': 140,
  'DEFAULT_LENGTH': 139
};

const Emoji = {
  'SLEEPING': `sleeping.png`,
  'SMILE': `smile.png`,
  'PUKE': `puke.png`,
  'ANGRY': `angry.png`
};

const Film = {
  START: 0,
  END: 2,
  SHOW: 5
};

const FilterType = {
  ALL: `all`,
  WATCHLIST: `watchlist`,
  HISTORY: `history`,
  FAVORITES: `favorites`,
  STATS: `stats`
};

const FilterValue = {
  WATCHLIST: `watchlist`,
  WATCHED: `watched`,
  FAVORITE: `favorite`
};

const Outline = {
  DEFAULT: ``,
  STYLE: `4px solid red`
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

const StatisticsFilterValue = {
  ALL_TIME: `all-time`,
  TODAY: `today`,
  WEEK: `week`,
  MONTH: `month`,
  YEAR: `year`
};

const UserRank = {
  'NO_RANK': 0,
  'NOTICE': 10,
  'FAN': 20
};

const HIDDEN_CLASS = `visually-hidden`;

const MENU_NAMES = [
  FilterType.WATCHLIST,
  FilterType.HISTORY,
  FilterType.FAVORITES
];

const STATISTICS_PERIODS = [
  StatisticsFilterValue.ALL_TIME,
  StatisticsFilterValue.TODAY,
  StatisticsFilterValue.WEEK,
  StatisticsFilterValue.MONTH,
  StatisticsFilterValue.YEAR
];

const SHAKE_ANIMATION_TIMEOUT = 600;

export {Description, Emoji, Film, FilterType, FilterValue, Outline, RenderPosition, SortType,
  StatisticsFilterValue, UserRank, HIDDEN_CLASS, MENU_NAMES, STATISTICS_PERIODS, SHAKE_ANIMATION_TIMEOUT};
