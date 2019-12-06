import {getRandomElement, getRandomDate, castTimeFormat} from "../utils";

// Здесь тоже не понял про соответствие типа и картинки - не вижу нейтральной эмоции, где grinning эмоция
// в шаблоне напутано
const Emoji = {
  'SLEEPING': `sleeping.png`,
  'NEUTRAL': `smile.png`,
  'GRINNING': `puke.png`
};

const CommentFeature = {
  'EMOJIS': [`angry.png`, `puke.png`, `sleeping.png`, `smile.png`],
  'TYPES': [`sleeping`, `neutral`, `grinning`],
  'TEXTS': [`Interesting setting and a good cast`, `Booooooooooring`,
    `Very very old. Meh`, `Almost two hours? Seriously?`,
    `Great movie!`, `I personally did't like the movie`, `Very interesting`],
  'AUTHORS': [`Tim Macoveev`, `John Doe`, `Alexander Setro`, `Mary Chery`, `Kristina Selena`]
};

const formatDate = (date) => {
  const [months, day, hours, minutes] = [
    castTimeFormat(date.getMonth() + 1),
    castTimeFormat(date.getDate()),
    castTimeFormat(date.getHours()),
    castTimeFormat(date.getMinutes())
  ];

  return `${date.getFullYear()}/${months}/${day} ${hours}:${minutes}`;
};

const generateComment = () => {
  return {
    emoji: Emoji[getRandomElement(CommentFeature.TYPES).toLocaleUpperCase()],
    text: getRandomElement(CommentFeature.TEXTS),
    author: getRandomElement(CommentFeature.AUTHORS),
    day: formatDate(getRandomDate())
  };
};

const generateComments = (count) => {
  return new Array(count).fill(``).map(generateComment);
};

export {generateComments, formatDate};
