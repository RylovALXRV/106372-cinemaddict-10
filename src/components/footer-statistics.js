const createFooterStatisticsTemplate = (films) => {
  return (
    `<section class="footer__statistics">
      <p>${films.length} movies inside</p>
    </section>`
  );
};

export {createFooterStatisticsTemplate};
