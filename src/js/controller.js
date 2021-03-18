import 'core-js/stable'; // Polyfiling everything else
import 'regenerator-runtime/runtime';

import * as model from './model.js'; // --> import everything
import searchView from './views/searchView.js'; // --> default import
import resultView from './views/resultView.js'; // --> default import
import { recipeView } from './views/recipeView.js'; // --> named import
import paginationView from './views/paginationView.js'; // --> default import
import bookmarkView from './views/bookmarkView.js';
import addRecipeView from './views/addRecipeView.js'; // --> //  WARNING  :why we have to import this module?
import { UPLOAD_SEC } from './config.js';
import View from './views/View.js';

// https://forkify-api.herokuapp.com/v2 --> API

const controlSearch = async function () {
  try {
    resultView.renderSpinner();
    const query = searchView.getQuery();
    if (!query) throw new Error("We can't search for nothing! :/");
    await model.loadSearch(query);
    resultView.render(model.defineWantedPage());
    paginationView.render(model.state.search);
  } catch (err) {
    console.error(`${err.message} 🎃🎃 `);
    resultView.renderErrorMsg(err.message);
  }
};

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner();
    resultView.updateView(model.defineWantedPage());
    bookmarkView.render(model.state.bookmarks);
    await model.loadRecipe(id);
    recipeView.render(model.state.recipe);
  } catch (err) {
    console.error(`${err.message} 🎃🎃`);
    recipeView.renderErrorMsg();
  }
};

const controlPagination = function (goToPage) {
  resultView.render(model.defineWantedPage(goToPage));
  paginationView.render(model.state.search);
};

const controlServings = function (numberOfServings) {
  model.adjustNewServings(numberOfServings);
  // recipeView.render(model.state.recipe);
  recipeView.updateView(model.state.recipe);
};

const controlBookmark = function () {
  if (!model.state.recipe.bookmark) {
    model.addBookmark(model.state.recipe);
  } else {
    model.deleteBookmark(model.state.recipe.id);
  }
  recipeView.updateView(model.state.recipe);
  bookmarkView.render(model.state.bookmarks);
};

const controlUpdateRecipe = async function (uploadedRecipe) {
  try {
    addRecipeView.renderSpinner();
    await model.uploadRecipeToAPI(uploadedRecipe);
    setTimeout(function () {
      addRecipeView.toggleRecipeWindow();
    }, UPLOAD_SEC * 1000);
    addRecipeView.renderSuccessMsg();

    recipeView.render(model.state.recipe);
    bookmarkView.render(model.state.bookmarks);

    window.history.pushState(null, '', `#${model.state.recipe.id}`);
  } catch (err) {
    addRecipeView.renderErrorMsg(err.message);
  }
};
//  WARNING  :Just try to upload 2 recipe in a sequence.

(function () {
  recipeView.addRenderHandler(controlRecipes);
  recipeView.addServingHandler(controlServings);
  recipeView.addBookmarkHandler(controlBookmark);
  searchView.addSearchHandler(controlSearch);
  paginationView.addClickHandler(controlPagination);
  addRecipeView.addHandlerUpload(controlUpdateRecipe);
})();
