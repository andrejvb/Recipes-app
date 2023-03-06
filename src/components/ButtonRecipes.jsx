import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { apiRecipesSetDrinks } from '../ServicesRecipes/apiDrinks';
import { apiRecipesSetFood } from '../ServicesRecipes/apiFood';

function ButtonRecipes() {
  const { pathname } = useLocation(); // usado para acessar as telas /meals e /drinks
  const [mealsSet, setMealsSet] = useState([]); // armazena as categorias da api food
  const [drinkSet, setDrinkSet] = useState([]); // armazena as categorias da api drink

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

  return (
    <div>
      { pathname === '/meals'
        ? (mealsSet.slice(0, numberCategory).map((e) => (
          <button
            key={ e }
            data-testid={ `${e}-category-filter` }
          >
            { e }
          </button>
        ))) : (drinkSet.slice(0, numberCategory).map((e) => (
          <button
            key={ e }
            data-testid={ `${e}-category-filter` }
          >
            { e }
          </button>
        ))) }
    </div>
  );
}

export default ButtonRecipes;
