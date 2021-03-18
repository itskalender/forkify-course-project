import View from './View.js';
import icons from 'url:../../img/icons.svg'; // --> icon importing Parcel-2

class previewView extends View {
  _parentEl = document.querySelector('.bookmarks__list');
  _errMsg = 'No bookmarks yet. Find a nice recipe and bookmark it :)';
  _successMsg;

  _generateMarkup() {
    const id = window.location.hash.slice(1);
    return `
        <li class="preview ${
          this._data.id === id ? 'preview__link--active' : ''
        }">
          <a class="preview__link" href="#${this._data.id}">
            <figure class="preview__fig">
              <img src="${this._data.image}" alt="Test" />
             </figure>
            <div class="preview__data">
              <h4 class="preview__title">${this._data.title}</h4>
              <p class="preview__publisher">${this._data.publisher}</p>
              <div class="preview__user-generated ${
                this._data.key ? '' : 'hidden'
              }">
                <svg>
                  <use href="${icons}#icon-user"></use>
                </svg>
              </div>
            </div>
          </a>
        </li>
      `;
  }
}

export default new previewView();
