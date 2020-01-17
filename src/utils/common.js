import {UserRank} from "../const";
import moment from "moment";

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

  static formatDate(date) {
    return moment(date).format(`YYYY/MM/DD hh:mm`);
  }

  static formatReleaseDate(date) {
    return moment(date).format(`DD MMMM YYYY`);
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

  static generateHours(minutes) {
    return Math.floor(minutes / 60 || 0);
  }

  static generateMinutes(minutes) {
    return minutes % 60;
  }

  static isEscKeyDown(evt) {
    return evt.key === `Escape` || evt.key === `Esc`;
  }

  static isActiveButtonClass(isFeature) {
    return isFeature ? `film-card__controls-item--active` : ``;
  }
}
