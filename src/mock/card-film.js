import {getRandomFloatNumber, getRandomElement, getRandomInteger, getRandomDate, isRandomBoolean} from "../utils";
import {MonthNames} from "../const";
import {generateComments} from "./comments";

const FilmFeature = {
  'TITLES': [`Moon`, `Avengers`, `Interstellar`, `Rush`, `Over the Top`, `Assassins`, `Batman Begins`,
    `The Dark Knight`, `Equilibrium`, `Green Book`, `Gladiator`, `The Lord of the Rings`, `Papillon`,
    `The Girl with the Dragon Tattoo`],
  'POSTERS': [`made-for-each-other.png`, `popeye-meets-sinbad.png`, `sagebrush-trail.jpg`,
    `santa-claus-conquers-the-martians.jpg`, `the-dance-of-life.jpg`, `the-great-flamarion.jpg`,
    `the-man-with-the-golden-arm.jpg`],
  'DESCRIPTIONS': [
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
    `Cras aliquet varius magna, non porta ligula feugiat eget.`,
    `Fusce tristique felis at fermentum pharetra.`,
    `Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
    `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
    `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
    `Sed sed nisi sed augue convallis suscipit in sed felis.`,
    `Aliquam erat volutpat.`, `Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`
  ],
  'GENRES': [`Drama`, `Film-Noir`, `Mystery`, `Fantasy`, `Action`, `Thriller`, `Detective`],
  'DIRECTORS': [`Duncan Jones`, `Anthony Russo`, `Christopher Nolan`, `Ron Howard`, `Michael Noer`,
    `Kurt Wimmer`, `David Fincher`, `Menahem Golan`],
  'ACTORS': [`Sylvester Stallone`, `Sam Rockwell`, `Chris Evans`, `Matthew McConaughey`,
    `Chris Hemsworth`, `Christian Bale`, `Viggo Mortensen`, `Mahershala Ali`, `Charlie Hunnam`,
    `Rami Malek`, `Robert Downey Jr.`],
  'WRITERS': [`Nathan Parker`, `Duncan Jones`, `Christopher Markus`, `Stephen McFeely`, `Jonathan Nolan`,
    `Christopher Nolan`, `Peter Morgan`, `David S. Goyer`, `Nick Vallelonga`, `Peter Farrelly`, `Robert Mark Kamen`,
    `Lyle Kessler`],
  'COUNTRIES': [`USA`, `Russia`, `France`, `England`, `China`]
};

const generateDuration = () => {
  return `${getRandomInteger(0, 3)}h ${getRandomInteger(0, 60)}m`;
};

const generateFeature = (features) => {
  return features.filter(() => Math.random() > 0.5).slice(0, 3);
};

const formatDate = (date) => {
  return `${date.getDate()} ${MonthNames[date.getMonth()]} ${date.getFullYear()}`;
};

const generateFilm = () => {
  const date = getRandomDate();

  return {
    duration: generateDuration(),
    rating: getRandomFloatNumber(0, 10),
    releaseDate: formatDate(date),
    title: getRandomElement(FilmFeature.TITLES),
    year: date.getFullYear(),
    genres: new Set(generateFeature(FilmFeature.GENRES)),
    description: new Set(generateFeature(FilmFeature.DESCRIPTIONS)),
    poster: getRandomElement(FilmFeature.POSTERS),
    age: getRandomInteger(0, 18),
    director: getRandomElement(FilmFeature.DIRECTORS),
    writers: new Set(generateFeature(FilmFeature.WRITERS)),
    actors: new Set(generateFeature(FilmFeature.ACTORS)),
    country: getRandomElement(FilmFeature.COUNTRIES),
    comments: generateComments(getRandomInteger(0, 5)),
    isWatchlist: isRandomBoolean(),
    isWatched: isRandomBoolean(),
    isFavorites: isRandomBoolean()
  };
};

const generateFilms = (count) => {
  return new Array(count).fill(``).map(generateFilm);
};

export {generateFilms};
