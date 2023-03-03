export const apiRecipesFood = async () => {
  const fetchApiFood = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  const apiFoodResponse = await fetchApiFood.json();
  console.log(apiFoodResponse);
  return apiFoodResponse;
};
