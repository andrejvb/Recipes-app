import React, { useCallback, useContext, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ButtonRecipes from '../components/ButtonRecipes';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { apiRecipesDrinks } from '../ServicesRecipes/apiDrinks';
import { apiRecipesFood } from '../ServicesRecipes/apiFood';
import { RecipeContext } from '../context/recipes';
import Card from '../components/Card';

const MAX_RECIPES = 12;

function Recipes() {
  const { recipes, setRecipes } = useContext(RecipeContext);
  // console.log(recipes);
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
      <ButtonRecipes />
      <div>
        {pathname === '/meals'
          ? (
            <div
              className="div-img-container"
            >
              { recipes.slice(0, MAX_RECIPES)
                .map(({ idMeal, strMeal, strMealThumb,
                }, idx) => (
                  <Link
                    key={ idMeal }
                    to={ `/meals/${idMeal}` }
                    className="div-card"
                  >
                    <Card index={ idx } title={ strMeal } thumb={ strMealThumb } />
                  </Link>
                ))}
            </div>)
          : (
            <div
              className="div-img-container"
            >
              { recipes.slice(0, MAX_RECIPES)
                .map(({ strDrink, strDrinkThumb, idDrink }, idx) => (
                  <Link
                    key={ idDrink }
                    to={ `/drinks/${idDrink}` }
                    className="div-card"
                  >
                    <Card index={ idx } title={ strDrink } thumb={ strDrinkThumb } />
                  </Link>
                ))}
            </div>)}
      </div>
      <Footer />
    </div>
  );
}

export default Recipes;
