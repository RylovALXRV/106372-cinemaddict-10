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

export {getRandomFloatNumber, getRandomElement, getRandomInteger, getRandomDate, castTimeFormat, isRandomBoolean};
