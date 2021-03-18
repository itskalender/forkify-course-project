import icons from 'url:../../img/icons.svg';

export default class View {
  _data;

  renderSpinner() {
    const spinnerMarkup = `
          <div class="spinner">
            <svg>
              <use href="${icons}#icon-loader"></use>
            </svg>
          </div>
        `;
    this.clear();
    this._parentEl.insertAdjacentHTML('afterbegin', spinnerMarkup);
  }

  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderErrorMsg(this.errMsg);

    this._data = data;
    const markup = this._generateMarkup();
    if (!render) return markup;
    this.clear();
    this._parentEl.insertAdjacentHTML('afterbegin', this._generateMarkup());
  }

  //  WARNING  :You really work it again! Especially DOM methods
  updateView(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElemets = Array.from(newDOM.querySelectorAll('*'));
    const currElements = Array.from(this._parentEl.querySelectorAll('*'));

    newElemets.forEach((newEl, i) => {
      const currEl = currElements[i];
      if (
        !newEl.isEqualNode(currEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        currEl.textContent = newEl.textContent;
      }
      if (!newEl.isEqualNode(currEl)) {
        Array.from(newEl.attributes).forEach(attr =>
          currEl.setAttribute(attr.name, attr.value)
        );
      }
    });
  }

  renderErrorMsg(errMsg = this._errMsg) {
    const errorMarkup = `
      <div class="error">
        <div>
          <svg>
            <use href="${icons}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${errMsg}</p>
      </div>
    `;
    this.clear();
    this._parentEl.insertAdjacentHTML('afterbegin', errorMarkup);
  }

  renderSuccessMsg(successMsg = this._successMsg) {
    const successMarkup = `
      <div class="message">
        <div>
          <svg>
            <use href="${icons}#icon-smile"></use>
          </svg>
        </div>
        <p>${successMsg}</p>
      </div>
    `;
    this.clear();
    this._parentEl.insertAdjacentHTML('afterbegin', successMarkup);
  }

  clear() {
    this._parentEl.innerHTML = '';
  }
}
