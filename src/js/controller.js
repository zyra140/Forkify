import * as model from './model.js';
import recipeView from './views/recipeView.js';

import 'core-js/stable'; // polyfiling
import 'regenerator-runtime/runtime'; // polyfiling async / await

// https://forkify-api.jonas.io/
// api key be226632-7332-42f6-ac20-48d8ee6197a2
// https://forkify-api.jonas.io/api/v2/recipes?search=pizza
// https://forkify-api.jonas.io/api/v2/recipes/:id
///////////////////////////////////////

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    recipeView.renderSpinner();

    // 1) Loading recipe
    await model.loadRecipe(id);

    // 2) Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

// Publisher - Subcriber Pattern
const init = function () {
  recipeView.addHandlerRender(controlRecipes);
};

init();
