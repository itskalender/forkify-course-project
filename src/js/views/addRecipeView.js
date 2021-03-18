import View from './View.js';
import previewView from './previewView.js';

class AddRecipeView extends View {
  _btnAddRecipe = document.querySelector('.nav__btn--add-recipe');

  _overlay = document.querySelector('.overlay');
  _window = document.querySelector('.add-recipe-window');

  _btnCloseRecipe = document.querySelector('.btn--close-modal');
  _btnUploadRecipe = document.querySelector('.upload__btn');

  _parentEl = document.querySelector('.upload');

  _errMsg = 'Something went wrong!';
  _successMsg = 'Recipe successfuly uploaded :)';

  constructor() {
    super();
    this._showRecipeWindow();
    this._closeRecipeWindow();
  }

  toggleRecipeWindow() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }

  _showRecipeWindow() {
    this._btnAddRecipe.addEventListener(
      'click',
      this.toggleRecipeWindow.bind(this)
    );
  }

  _closeRecipeWindow() {
    this._btnCloseRecipe.addEventListener(
      'click',
      this.toggleRecipeWindow.bind(this)
    );
    this._overlay.addEventListener('click', this.toggleRecipeWindow.bind(this));
  }

  addHandlerUpload(handler) {
    this._parentEl.addEventListener('submit', function (e) {
      e.preventDefault();
      const dataArr = [...new FormData(this)];
      const dataObj = Object.fromEntries(dataArr);
      handler(dataObj);
    });
  }

  _generateMarkup() {}
}
export default new AddRecipeView();
