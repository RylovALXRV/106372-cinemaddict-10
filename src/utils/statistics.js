import {StatisticsFilterValue} from "../const";
import moment from "moment";

const getMonthPeriodFilms = (films, date) => {
  const firstDateOfMonth = moment(date).set(`date`, 1).format(`YYYY-MM-DD`);
  const lastDateOfMonth = moment(date).set({'month': date.getMonth() + 1, 'date': 0}).format(`YYYY-MM-DD`);

  return films.filter((film) => {
    const watchedDate = moment(film.watchingDate).format(`YYYY-MM-DD`);
    return watchedDate >= firstDateOfMonth && watchedDate <= lastDateOfMonth;
  });
};

const getTodayPeriodFilms = (films, date) => {
  const today = moment(date).format(`YYYY-MM-DD`);

  return films.filter((film) => {
    const watchedDate = moment(film.watchingDate).format(`YYYY-MM-DD`);
    return watchedDate === today;
  });
};

const getWeekPeriodFilms = (films, date) => {
  const firstDateOfWeek = moment(date).startOf(`week`).format(`YYYY-MM-DD`);
  const lastDateOfWeek = moment(date).endOf(`week`).format(`YYYY-MM-DD`);

  return films.filter((film) => {
    const watchedDate = moment(film.watchingDate).format(`YYYY-MM-DD`);
    return watchedDate >= firstDateOfWeek && watchedDate <= lastDateOfWeek;
  });
};

const getYearPeriodFilms = (films, date) => {
  const currentYear = moment(date).format(`YYYY`);

  return films.filter((film) => {
    const watchedDate = moment(film.watchingDate).format(`YYYY`);
    return watchedDate === currentYear;
  });
};

export const getWatchedFilmsByFilter = (films, filterType) => {
  const date = new Date();

  switch (filterType) {
    case StatisticsFilterValue.ALL_TIME:
      return films;
    case StatisticsFilterValue.MONTH:
      return getMonthPeriodFilms(films, date);
    case StatisticsFilterValue.TODAY:
      return getTodayPeriodFilms(films, date);
    case StatisticsFilterValue.WEEK:
      return getWeekPeriodFilms(films, date);
    case StatisticsFilterValue.YEAR:
      return getYearPeriodFilms(films, date);
  }

  return films;
};
