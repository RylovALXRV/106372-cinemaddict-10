const removeButtonShowMore = (currentFilmsCount, filmsCount) => {
  const buttonShowMore = document.querySelector(`.films-list__show-more`);

  if (buttonShowMore && currentFilmsCount >= filmsCount) {
    buttonShowMore.remove();
  }
};

const createButtonShowMoreTemplate = () => {
  return (
    `<button class="films-list__show-more">Show more</button>`
  );
};

export {createButtonShowMoreTemplate, removeButtonShowMore};
