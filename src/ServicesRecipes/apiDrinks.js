export const apiRecipesDrinks = async () => {
  const fetchApiDrinks = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  const apiDrinksResponse = await fetchApiDrinks.json();
  console.log(apiDrinksResponse);
  return apiDrinksResponse;
};
