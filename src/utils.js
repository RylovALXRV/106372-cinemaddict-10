import {UserRank} from "./const";

const getRandomFloatNumber = (min, max) => {
  return parseFloat((Math.random() * (max - min) + min).toFixed(1));
};

const getRandomInteger = (min, max) => {
  return Math.round(Math.random() * (max - min) + min);
};

const getRandomElement = (elements) => {
  return elements[Math.floor(Math.random() * elements.length)];
};

const getRandomDate = () => {
  const targetDate = new Date();
  const diffValue = getRandomInteger(0, 10000);

  targetDate.setDate(targetDate.getDate() - diffValue);

  return targetDate;
};

const castTimeFormat = (value) => {
  return value < 10 ? `0${value}` : String(value);
};

const isRandomBoolean = () => {
  return Math.random() > 0.5;
};

const getUserRank = (count) => {
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
};

export {getRandomFloatNumber, getRandomElement, getRandomInteger, getRandomDate, castTimeFormat, isRandomBoolean, getUserRank};
