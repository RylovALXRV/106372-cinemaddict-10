import Common from "../utils/common";
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

const generateFeatures = (features) => {
  const uniqueFeatures = new Set(features.filter(() => Math.random() > 0.5).slice(0, 3));

  return Array.from(uniqueFeatures);
};

const generateFilm = () => {
  const date = Common.getRandomDate();
  const isHistory = Common.isRandomBoolean();

  return {
    duration: Common.getRandomInteger(0, 180),
    rating: Common.getRandomFloatNumber(0, 10),
    releaseDate: date,
    title: Common.getRandomElement(FilmFeature.TITLES),
    year: date.getFullYear(),
    genres: generateFeatures(FilmFeature.GENRES),
    description: generateFeatures(FilmFeature.DESCRIPTIONS).join(` `),
    poster: Common.getRandomElement(FilmFeature.POSTERS),
    age: Common.getRandomInteger(0, 18),
    director: Common.getRandomElement(FilmFeature.DIRECTORS),
    writers: generateFeatures(FilmFeature.WRITERS),
    actors: generateFeatures(FilmFeature.ACTORS),
    country: Common.getRandomElement(FilmFeature.COUNTRIES),
    comments: generateComments(Common.getRandomInteger(0, 5)),
    isWatchlist: Common.isRandomBoolean(),
    isHistory,
    isFavorites: Common.isRandomBoolean(),
    id: String(+new Date() + Math.random()),
    watchingDate: isHistory ? date : ``
  };
};

const generateFilms = (count) => {
  return new Array(count).fill(``).map(generateFilm);
};

export {generateFilms};
