import View from './View.js';

class SearchView extends View {
  _parentEl = document.querySelector('.search');
  _errMsg;
  _successMsg;

  getQuery() {
    return this._parentEl.querySelector('.search__field').value;
  }
  addSearchHandler(handler) {
    this._parentEl.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
      document.querySelector('.search__field').value = '';
    });
  }
}
export default new SearchView();
