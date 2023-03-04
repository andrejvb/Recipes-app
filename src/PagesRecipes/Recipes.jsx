import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Footer from '../components/Footer';
import SearchBar from '../components/SearchBar';
import { apiRecipesDrinks } from '../ServicesRecipes/apiDrinks';
import { apiRecipesFood } from '../ServicesRecipes/apiFood';

function Recipes() {
  const { pathname } = useLocation();
  const [mealsApi, setMealsApi] = useState([]);
  const [drinksApi, setDrinksApi] = useState([]);
  // console.log(pathname);

  const renderizaApi = async () => {
    const mealsDados = await apiRecipesFood();
    setMealsApi(mealsDados.meals);
    const drinksDados = await apiRecipesDrinks();
    setDrinksApi(drinksDados.drinks);
    console.log(mealsDados);
  };

  useEffect(() => {
    renderizaApi();
  }, []);

  const numberPathName = 12;

  return (
    <div>
      <SearchBar />
      { pathname === '/meals'
        ? (mealsApi.slice(0, numberPathName).map((e, index) => (
          <div
            key={ e.idMeal }
            data-testid={ `"${index}-recipe-card"` }
          >
            <p data-testid={ `"${index}-card-name"` }>
              { e.strMeal }
            </p>
            <img
              src={ e.strMealThumb }
              alt="food"
              data-testid={ `"${index}-card-img"` }
            />
          </div>
        ))) : (drinksApi.slice(0, numberPathName).map((e, index) => (
          <div
            key={ e.idDrinks }
            data-testid={ `"${index}-recipe-card"` }
          >
            <p data-testid={ `"${index}-card-name"` }>
              { e.strDrink }
            </p>
            <img
              src={ e.strDrink }
              alt="drink"
              data-testid={ `"${index}-card-img"` }
            />
          </div>
        )))}
      <Footer />
    </div>
  );
}

export default Recipes;
