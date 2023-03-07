import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { apiRecipesDrinks, apiRecipesSetDrinks } from '../ServicesRecipes/apiDrinks';
import { apiRecipesFood, apiRecipesSetFood } from '../ServicesRecipes/apiFood';
import { RecipeContext } from '../context/recipes';

function ButtonRecipes() {
  const { pathname } = useLocation(); // usado para acessar as telas /meals e /drinks
  const [mealsSet, setMealsSet] = useState([]); // armazena as categorias da api food
  const [drinkSet, setDrinkSet] = useState([]); // armazena as categorias da api drink
  const { setRecipes } = useContext(RecipeContext);

  const renderizaApiSet = async () => { // renderizando as api's para serem usadas
    const mealsSetDados = await apiRecipesSetFood();
    const drinksSetDados = await apiRecipesSetDrinks();
    setMealsSet([...new Set(mealsSetDados.meals.map((e) => e.strCategory))]);
    setDrinkSet([...new Set(drinksSetDados.drinks.map((e) => e.strCategory))]);
    // consulta do set no site https://vidafullstack.com.br/javascript/new-set-com-javascript/
    // console.log(([...new Set(mealsDados.meals.map((e) => e.strCategory))]));
  };

  useEffect(() => { // chamando a função  das api's
    renderizaApiSet();
  }, []);

  const numberCategory = 5; // precisa armazenar para usar no slice

  const apiButton = async (e) => {
    const mealsApi = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${e}`;
    const drinksApi = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${e}`;
    const createCondicao = pathname === '/meals' ? mealsApi : drinksApi;
    const fetchApiFood = await fetch(createCondicao);
    const apiFoodResponse = await fetchApiFood.json();
    // console.log(apiFoodResponse[pathname.split('/')[1]]);
    setRecipes(apiFoodResponse[pathname.split('/')[1]]);
  };

  const handleClean = async () => {
    const mealsDados = await apiRecipesFood();
    const drinksDados = await apiRecipesDrinks();
    if (pathname === '/meals') setRecipes(mealsDados.meals);
    else setRecipes(drinksDados.drinks);
  };

  return (
    <div>
      { pathname === '/meals'
        ? (mealsSet.slice(0, numberCategory).map((e) => (
          <button
            key={ e }
            data-testid={ `${e}-category-filter` }
            onClick={ () => apiButton(e) }
          >
            { e }
          </button>
        ))) : (drinkSet.slice(0, numberCategory).map((e) => (
          <button
            key={ e }
            data-testid={ `${e}-category-filter` }
            onClick={ () => apiButton(e) }
          >
            { e }
          </button>
        ))) }
      <button
        data-testid="All-category-filter"
        onClick={ () => handleClean() }
      >
        All
      </button>
    </div>
  );
}

export default ButtonRecipes;
