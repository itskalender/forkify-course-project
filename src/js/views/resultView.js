import View from './View.js';
import previewView from './previewView.js';

class ResultView extends View {
  _parentEl = document.querySelector('.results');
  _errMsg = 'No recipes found for your query. Please try again! 😥';
  _successMsg;

  _generateMarkup() {
    const id = window.location.hash.slice(1);
    return this._data
      .map(results => {
        return previewView.render(results, false);
      })
      .join('');
  }
}
export default new ResultView();

// _generateMarkup() {
//   const id = window.location.hash.slice(1);
//   return this._data
//     .map(results => {
//       return `<li class="preview ${
//         results.id === id ? 'preview__link--active' : ''
//       }">
//         <a class="preview__link" href="#${results.id}">
//           <figure class="preview__fig">
//             <img src="${results.image}" alt="Test" />
//            </figure>
//           <div class="preview__data">
//             <h4 class="preview__title">${results.title}</h4>
//               <p class="preview__publisher">${results.publisher}</p>
//           </div>
//         </a>
//       </li>
//     `;
//     })
//     .join('');
// }
