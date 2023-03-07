import React, { useCallback, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ButtonRecipes from '../components/ButtonRecipes';
import SearchBar from '../components/SearchBar';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { apiRecipesDrinks } from '../ServicesRecipes/apiDrinks';
import { apiRecipesFood } from '../ServicesRecipes/apiFood';
import { RecipeContext } from '../context/recipes';
import Card from '../components/Card';
// import { useLocation } from 'react-router-dom';

const MAX_RECIPES = 12;

function Recipes() {
  const { recipes, setRecipes } = useContext(RecipeContext);
  const { pathname } = useLocation(); // usado para acessar as telas /meals e /drinks

  const renderizaApi = useCallback(async () => { // renderizando as api's para serem usada
    const mealsDados = await apiRecipesFood();
    const drinksDados = await apiRecipesDrinks();
    if (pathname === '/meals') setRecipes(mealsDados.meals);
    else setRecipes(drinksDados.drinks);
  }, [pathname, setRecipes]);

  useEffect(() => { // chamando a função  das api's
    renderizaApi();
  }, [renderizaApi]);

  return (
    <div>
      <Header />
      <SearchBar />
      <ButtonRecipes />
      <ul>
        {pathname === '/meals'
          ? recipes.slice(0, MAX_RECIPES)
            .map(({ idMeal, strMeal, strMealThumb }, idx) => (
              <li key={ idMeal }>
                <Card index={ idx } title={ strMeal } thumb={ strMealThumb } />
              </li>
            ))
          : recipes.slice(0, MAX_RECIPES)
            .map(({ strDrink, strDrinkThumb, idDrink }, idx) => (
              <li key={ idDrink }>
                <Card index={ idx } title={ strDrink } thumb={ strDrinkThumb } />
              </li>
            ))}
      </ul>
      <Footer />
    </div>
  );
}

export default Recipes;
