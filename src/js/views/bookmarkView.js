import View from './View.js';
import previewView from './previewView.js';

class BookmarkViews extends View {
  _parentEl = document.querySelector('.bookmarks__list');
  _errMsg = 'No bookmarks yet. Find a nice recipe and bookmark it :)';
  _successMsg;

  _generateMarkup() {
    const id = window.location.hash.slice(1);
    return this._data
      .map(bookmarks => {
        return previewView.render(bookmarks, false);
      })
      .join('');
  }
  // _generateMarkup() {
  //   const id = window.location.hash.slice(1);
  //   return this._data
  //     .map(recipe => {
  //       return `
  //       <li class="preview ${recipe.id === id ? 'preview__link--active' : ''}">
  //         <a class="preview__link" href="#${recipe.id}">
  //           <figure class="preview__fig">
  //             <img src="${recipe.image}" alt="Test" />
  //            </figure>
  //           <div class="preview__data">
  //             <h4 class="preview__title">${recipe.title}</h4>
  //             <p class="preview__publisher">${recipe.publisher}</p>
  //           </div>
  //         </a>
  //       </li>
  //     `;
  //     })
  //     .join('');
  // }
}

export default new BookmarkViews();
