import AbstractSmartComponent from "./abstract-smart-component";
import Chart from "chart.js";
import chartDataLabels from "chartjs-plugin-datalabels";
import Common from "../utils/common";
import {StatisticsFilterValue, STATISTICS_PERIOD} from "../const";

const calcUniqCountGenre = (films, genre) => {
  return films.filter((film) => {
    return film.genres.indexOf(genre) !== -1;
  }).length;
};

const getMaxIndex = (array) => {
  let greatest = array[0];
  let index = 0;
  array.forEach((item, i) => {
    if (item > greatest) {
      index = i;
      greatest = item;
    }
  });
  return index;
};

const getUniqueGenres = (films) => {
  const genres = [];
  films.forEach((film) => {
    film.genres.forEach((genre) => {
      genres.push(genre);
    });
  });

  return Array.from(new Set(genres));
};

const getGenresAmount = (films, genres) => {
  return genres.map((genre) => calcUniqCountGenre(films, genre));
};

const renderFilmsCharts = (ctx, films) => {
  const uniqueGenres = getUniqueGenres(films);
  const genresAmount = getGenresAmount(films, uniqueGenres);

  return new Chart(ctx, {
    plugins: [chartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: uniqueGenres,
      datasets: [{
        data: genresAmount,
        backgroundColor: `yellow`
      }],
    },
    options: {
      plugins: {
        datalabels: {
          display: true,
          color: `black`
        }
      },
      legend: {
        display: false
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `white`,
            fontSize: 20,
            stepSize: 1,
            beginAtZero: true
          },
          barPercentage: 0.6
        }],
        xAxes: [{
          ticks: {
            display: false,
            stepSize: 1,
            beginAtZero: true
          }
        }]
      }
    }
  });
};

const createStatisticsFilters = (activeChecked) => {
  return STATISTICS_PERIOD.map((statisticPeriod) => {
    const isStatisticsChecked = (statisticPeriod === activeChecked);

    return (
      `<input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-${statisticPeriod}"
          value="${statisticPeriod}" ${isStatisticsChecked ? `checked` : ``}>
      <label for="statistic-${statisticPeriod}" class="statistic__filters-label">${statisticPeriod[0].toUpperCase()}${statisticPeriod.slice(1)}</label>`
    );
  }).join(``);
};

const createStatisticsTemplate = (films, activeChecked) => {
  const totalDuration = films.reduce((accumulator, film) => {
    return accumulator + film.duration;
  }, 0);
  const uniqueGenres = getUniqueGenres(films);
  const genresAmount = getGenresAmount(films, uniqueGenres);

  return (
    `<section class="statistic">
    <p class="statistic__rank">
      Your rank
      <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
      <span class="statistic__rank-label">${Common.getUserRank(films.length)}</span>
    </p>

    <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
      <p class="statistic__filters-description">Show stats:</p>
      ${createStatisticsFilters(activeChecked)}
    </form>

    <ul class="statistic__text-list">
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">You watched</h4>
        <p class="statistic__item-text">${films.length} <span class="statistic__item-description">movies</span></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Total duration</h4>
        <p class="statistic__item-text">${Common.generateHours(totalDuration)} <span class="statistic__item-description">h</span> ${Common.generateMinutes(totalDuration)} <span class="statistic__item-description">m</span></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Top genre</h4>
        <p class="statistic__item-text">${films.length ? uniqueGenres[getMaxIndex(genresAmount)] : `-`}</p>
      </li>
    </ul>

    <div class="statistic__chart-wrap">
      <canvas class="statistic__chart" width="1000"></canvas>
    </div>

  </section>`
  );
};

export default class Statistics extends AbstractSmartComponent {
  constructor(filmsModel) {
    super();

    this._filmsModel = filmsModel;

    this._films = null;
    this._filmsChart = null;
    this._switchStatisticFilter = null;

    this._activeFilterType = StatisticsFilterValue.ALL_TIME;

    this._renderCharts();
    this._subscribeOnEvents();
  }

  getTemplate() {
    return createStatisticsTemplate(this._films, this._activeFilterType);
  }

  _renderCharts() {
    if (!this._films) {
      this._films = this._getFilteredFilmsHistory();
    }

    const chartCtx = this._getStatisticsChartElement();

    this._resetCharts();
    // не разобрался как сделать второй столбец под количество фильмов и кастомизировать цифры соответственно.
    this._filmsChart = renderFilmsCharts(chartCtx, this._films);
  }

  recoveryListeners() {
    this._subscribeOnEvents();
  }

  _subscribeOnEvents() {
    const element = this.getElement();

    element.querySelector(`.statistic__filters`).addEventListener(`change`, (evt) => {
      this._activeFilterType = evt.target.value;
      this._films = this._switchStatisticFilter(this._activeFilterType);

      this.rerender();
    });
  }

  setSwitchStatisticFilter(handler) {
    this._switchStatisticFilter = handler;
  }

  show() {
    super.show();

    this.rerender();
  }

  rerender() {
    this._films = this._filmsModel.getWatchedFilms(this._getFilteredFilmsHistory(), this._activeFilterType);

    super.rerender();
    this._renderCharts();
  }

  _resetCharts() {
    if (this._filmsChart) {
      this._filmsChart.destroy();
      this._filmsChart = null;
    }
  }

  _getStatisticsChartElement() {
    return this.getElement().querySelector(`.statistic__chart`);
  }

  _getFilteredFilmsHistory() {
    return this._filmsModel.getFilms().filter((film) => film.isHistory);
  }
}
