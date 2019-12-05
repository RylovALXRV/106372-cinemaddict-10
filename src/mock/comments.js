import {getRandomElement, getRandomDate, castTimeFormat} from "../utils";

const CommentFeatures = {
  'EMOJIS': [`angry.png`, `puke.png`, `sleeping.png`, `smile.png`, `trophy.png`],
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
    emoji: getRandomElement(CommentFeatures.EMOJIS),
    text: getRandomElement(CommentFeatures.TEXTS),
    author: getRandomElement(CommentFeatures.AUTHORS),
    day: formatDate(getRandomDate())
  };
};

const generateComments = (comment) => {
  return new Array(comment).fill(``).map(generateComment);
};

export {generateComments, formatDate};
