// не понимаю как применить, если эта модель нужна вообще
export default class Comments {
  constructor(film) {
    this._film = film;

    this._dataChangeHandler = [];
  }

  removeComment(id) {
    const index = this._film.comments.findIndex((comment) => comment.id === id);

    if (index === -1) {
      return false;
    }

    this._film.comments = Array.prototype.concat(this._film.comments.slice(0, index), this._film.comments.slice(index + 1));

    this._calHandlers(this._dataChangeHandler);

    return true;
  }

  addComment(comment) {
    this._film.comments = Array.prototype.concat(this._film.comments, comment);
  }

  _calHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }
}
