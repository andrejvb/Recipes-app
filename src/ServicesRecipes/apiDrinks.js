export const apiRecipesDrinks = async () => {
  const fetchApiDrinks = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  const apiDrinksResponse = await fetchApiDrinks.json();
  // console.log(apiDrinksResponse);
  return apiDrinksResponse;
}; // api com todas as chaves para renderizar as 12 receitas na tela

export const apiRecipesSetDrinks = async () => {
  const fetchApiDrinks = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
  const apiDrinksResponse = await fetchApiDrinks.json();
  // console.log(apiDrinksResponse);
  return apiDrinksResponse;
}; // api com as categorias e renderizar os 5 botões na tela
