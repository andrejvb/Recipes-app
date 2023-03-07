export const apiRecipesFood = async () => {
  let apiFoodResponse;
  try {
    const fetchApiFood = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    apiFoodResponse = await fetchApiFood.json();
  } catch {
    apiFoodResponse = { meals: null, drinks: null };
  }
  return apiFoodResponse;
}; // api com todas as chaves para renderizar as 12 receitas na tela

export const apiRecipesSetFood = async () => {
  let apiFoodResponse;
  try {
    const fetchApiFood = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
    apiFoodResponse = await fetchApiFood.json();
  } catch {
    apiFoodResponse = { meals: null, drinks: null };
  }
  return apiFoodResponse;
}; // api com as categorias e renderizar os 5 botões na tela
