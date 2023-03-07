export const apiRecipesDrinks = async () => {
  let apiDrinksResponse;
  try {
    const fetchApiDrinks = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    apiDrinksResponse = await fetchApiDrinks.json();
  } catch {
    apiDrinksResponse = { meals: null, drinks: null };
  }
  return apiDrinksResponse;
}; // api com todas as chaves para renderizar as 12 receitas na tela

export const apiRecipesSetDrinks = async () => {
  let apiDrinksResponse;
  try {
    const fetchApiDrinks = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
    apiDrinksResponse = await fetchApiDrinks.json();
  } catch {
    apiDrinksResponse = { meals: null, drinks: null };
  }
  return apiDrinksResponse;
}; // api com as categorias e renderizar os 5 botões na tela
