import { async } from 'regenerator-runtime'; // polyfiling async/await

import { API_URL, RES_PER_PAGE, KEY } from './config.js'; // --> data import
import { AJAX } from './helpers.js'; // --> data import

export const state = {
  search: {
    query: '',
    page: 1,
    results: [],
  },
  recipe: {},
  bookmarks: [],
};

const addRecipe = function (recipe) {
  return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
    ...(recipe.key && { key: recipe.key }),
  };
};

export const loadRecipe = async function (id) {
  try {
    const data = await AJAX(`${API_URL}${id}?key=${KEY}`);
    const { recipe } = data.data;
    state.recipe = addRecipe(recipe);
  } catch (err) {
    throw err;
    // console.error(`${err.message} 🎃`);
  }
  if (state.bookmarks.some(rec => rec.id === id)) {
    state.recipe.bookmark = true;
  }
};

export const loadSearch = async function (query) {
  try {
    const data = await AJAX(`${API_URL}?search=${query}&key=${KEY}`);
    if (data.results === 0)
      throw new Error("We cound't find any recipe with that name! :/");
    state.search.results = [];
    data.data.recipes.forEach(result => {
      state.search.results.push({
        id: result.id,
        title: result.title,
        publisher: result.publisher,
        image: result.image_url,
        ...(result.key && { key: result.key }),
      });
    });
  } catch (err) {
    throw err;
    // console.log(err);
  }
};

export const defineWantedPage = function (page = 1) {
  state.search.page = page;
  const first = (page - 1) * RES_PER_PAGE;
  const last = page * RES_PER_PAGE;
  return state.search.results.slice(first, last);
};

export const adjustNewServings = function (newServings) {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (newServings / state.recipe.servings) * ing.quantity;
  });
  state.recipe.servings = newServings;
};

export const addBookmark = function (recipe) {
  state.bookmarks.push(recipe);
  recipe.bookmark = true;
  addBookmarkToLocalStorage();
};

export const deleteBookmark = function (id) {
  const indexOfBookmark = state.bookmarks.findIndex(rec => rec.id === id);
  console.log(indexOfBookmark);
  state.bookmarks.splice(indexOfBookmark, 1);
  state.recipe.bookmark = false;

  addBookmarkToLocalStorage();
};

const addBookmarkToLocalStorage = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

export const getBookmarkFromLocalStorage = function () {
  const bookmarksInLocalStorage = localStorage.getItem('bookmarks');
  if (!bookmarksInLocalStorage) return;
  const bookmarksFromLocalStorage = JSON.parse(bookmarksInLocalStorage);
  bookmarksFromLocalStorage.forEach(bookmark => state.bookmarks.push(bookmark));
};
getBookmarkFromLocalStorage();

export const uploadRecipeToAPI = async function (recipe) {
  try {
    const ingredients = Object.entries(recipe)
      .filter(ing => ing[0].startsWith('ingredient') && ing[1] !== '')
      .map(ing => {
        const [quantity, unit, description] = ing[1]
          .split(',')
          .map(el => el.trim());
        return {
          quantity: quantity ? +quantity : null,
          unit: unit ? unit : '',
          description: description ? description : '',
        };
      });
    const data = {
      // id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      source_url: recipe.sourceUrl,
      image_url: recipe.image,
      servings: recipe.servings,
      cooking_time: recipe.cookingTime,
      ingredients,
    };
    const res = await AJAX(`${API_URL}?key=${KEY}`, data);
    state.recipe = addRecipe(res.data.recipe);
    state.recipe.bookmark = true;
    addBookmark(addRecipe(res.data.recipe));
    console.log(state);
  } catch (err) {
    throw err;
  }
};
