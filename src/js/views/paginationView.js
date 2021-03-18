import View from './View.js';

import { state } from '../model.js';
import { RES_PER_PAGE } from '../config.js';
import icons from 'url:../../img/icons.svg'; // --> icon importing Parcel-2

class PaginationView extends View {
  _parentEl = document.querySelector('.pagination');
  _errMsg = '';
  _successMsg;
  _currPage;

  addClickHandler(handler) {
    this._parentEl.addEventListener('click', function (e) {
      const buttonClicked = e.target.closest('.btn--inline');
      if (!buttonClicked) return;
      const goToPage = +buttonClicked.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkup() {
    const numberOfPages = Math.ceil(state.search.results.length / RES_PER_PAGE);

    this._currPage = this._data.page;

    // currPage number is 1 and other pages exists
    if (this._currPage === 1 && numberOfPages > 1) {
      return `
        <button data-goto="${
          this._currPage + 1
        }" class="btn--inline pagination__btn--next">
          <span>Page ${this._currPage + 1}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </button>
      `;
    }

    // currPage is among the first and last page
    if (1 < this._currPage && this._currPage < numberOfPages) {
      return `
      <button data-goto="${
        this._currPage - 1
      }" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${this._currPage - 1}</span>
      </button>
      <button data-goto="${
        this._currPage + 1
      }" class="btn--inline pagination__btn--next">
        <span>Page ${this._currPage + 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>
    `;
    }

    // currPage is last page and other pages exist
    if (this._currPage === numberOfPages && numberOfPages > 1) {
      return `
      <button data-goto="${
        this._currPage - 1
      }" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${this._currPage - 1}</span>
      </button>
      `;
    }

    // Only one page
    if (numberOfPages === 1) {
      return '';
    }
  }
}

export default new PaginationView();
