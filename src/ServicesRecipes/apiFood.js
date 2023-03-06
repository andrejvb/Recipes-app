export const apiRecipesFood = async () => {
  const fetchApiFood = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  const apiFoodResponse = await fetchApiFood.json();
  // console.log(apiFoodResponse);
  return apiFoodResponse;
}; // api com todas as chaves para renderizar as 12 receitas na tela

export const apiRecipesSetFood = async () => {
  const fetchApiFood = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
  const apiFoodResponse = await fetchApiFood.json();
  // console.log(apiFoodResponse);
  return apiFoodResponse;
}; // api com as categorias e renderizar os 5 botões na tela
