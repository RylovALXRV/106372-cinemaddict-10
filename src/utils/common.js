import {MONTH_NAMES, UserRank} from "../const";

export default class Common {
  static getRandomFloatNumber(min, max) {
    return parseFloat((Math.random() * (max - min) + min).toFixed(1));
  }

  static getRandomInteger(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  }

  static getRandomElement(elements) {
    return elements[Math.floor(Math.random() * elements.length)];
  }

  static getRandomDate() {
    const targetDate = new Date();
    const diffValue = Common.getRandomInteger(0, 10000);

    targetDate.setDate(targetDate.getDate() - diffValue);

    return targetDate;
  }

  static castTimeFormat(value) {
    return value < 10 ? `0${value}` : String(value);
  }

  static isRandomBoolean() {
    return Math.random() > 0.5;
  }

  static getUserRank(count) {
    let rank;

    if (count === UserRank.NO_RANK) {
      rank = ``;
    } else if (count <= UserRank.NOTICE) {
      rank = `notice`;
    } else if (count <= UserRank.FAN) {
      rank = `fan`;
    } else {
      rank = `movie buff`;
    }

    return rank;
  }

  static isFilmsRating(films) {
    return films.some((film) => {
      return film.rating > 0;
    });
  }

  static isFilmsComments(films) {
    return films.some((film) => {
      return film.comments.length > 0;
    });
  }

  static compareComments(filmA, filmB) {
    return filmB.comments.length - filmA.comments.length;
  }

  static compareRating(filmA, filmB) {
    return filmB.rating - filmA.rating;
  }

  static compareDate(filmA, filmB) {
    return filmB.releaseDate - filmA.releaseDate;
  }

  static generateDuration(minutes) {
    return `${Math.floor(minutes / 60 || 0)}h ${minutes % 60}m`;
  }

  static isEscKeyDown(evt) {
    return evt.key === `Escape` || evt.key === `Esc`;
  }

  static formatDate(date) {
    return `${date.getDate()} ${MONTH_NAMES[date.getMonth()]} ${date.getFullYear()}`;
  }
}
