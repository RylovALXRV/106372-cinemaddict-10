import {UserRank, RenderPosition} from "./const";

export default class Utils {
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
    const diffValue = Utils.getRandomInteger(0, 10000);

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

  static createElement(template) {
    const divElement = document.createElement(`div`);
    divElement.innerHTML = template;

    return divElement.firstElementChild;
  }

  static render(container, template, position) {
    switch (position) {
      case RenderPosition.BEFOREEND:
        container.append(template);
        break;
      case RenderPosition.AFTERBEGIN:
        container.prepend(template);
        break;
      case RenderPosition.AFTEREND:
        container.after(template);
        break;
    }
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
}
