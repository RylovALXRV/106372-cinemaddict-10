import Common from "../utils/common";

// переделал типы эмоций по новому ТЗ, но шаблоны старые, поэтому при нажатии на эмоцию
// в комментарии - не вставляются/не появляются правильные смайлы
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

const generateComment = () => {
  return {
    emoji: Emoji[Common.getRandomElement(CommentFeature.TYPES).toLocaleUpperCase()],
    text: Common.getRandomElement(CommentFeature.TEXTS),
    author: Common.getRandomElement(CommentFeature.AUTHORS),
    day: Common.getRandomDate()
  };
};

const generateComments = (count) => {
  return new Array(count).fill(``).map(generateComment);
};

export {generateComments, Emoji};
