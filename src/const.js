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

const Emoji = {
  'SLEEPING': `sleeping.png`,
  'SMILE': `smile.png`,
  'PUKE': `puke.png`,
  'ANGRY': `angry.png`
};

const CommentFeature = {
  'TYPES': [`sleeping`, `smile`, `puke`, `angry`],
  'TEXTS': [`Interesting setting and a good cast`, `Booooooooooring`,
    `Very very old. Meh`, `Almost two hours? Seriously?`,
    `Great movie!`, `I personally did't like the movie`, `Very interesting`],
  'AUTHORS': [`Tim Macoveev`, `John Doe`, `Alexander Setro`, `Mary Chery`, `Kristina Selena`]
};

export {MENU_NAMES, Film, UserRank, Description, RenderPosition, SortType, FilterType,
  StatisticsFilterValue, STATISTICS_PERIODS, FilterValue, Emoji, CommentFeature};
