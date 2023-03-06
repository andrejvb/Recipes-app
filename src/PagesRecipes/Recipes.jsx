import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ButtonRecipes from '../components/ButtonRecipes';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { apiRecipesDrinks } from '../ServicesRecipes/apiDrinks';
import { apiRecipesFood } from '../ServicesRecipes/apiFood';
// import { useLocation } from 'react-router-dom';

function Recipes() {
  const { pathname } = useLocation(); // usado para acessar as telas /meals e /drinks
  const [mealsApi, setMealsApi] = useState([]); // armazena a api de receitas
  const [drinksApi, setDrinksApi] = useState([]); // armazena a api de drinks
  // const [mealsSet, setMealsSet] = useState([]);
  // const [drinkSet, setDrinkSet] = useState([]);
  // console.log(pathname);

  const renderizaApi = async () => { // renderizando as api's para serem usadas
    const mealsDados = await apiRecipesFood();
    setMealsApi(mealsDados.meals);
    const drinksDados = await apiRecipesDrinks();
    setDrinksApi(drinksDados.drinks);
  };

  useEffect(() => { // chamando a função  das api's
    renderizaApi();
  }, []);

  const numberPathName = 12; // precisa armazenar para usar no slice

  return (
    <div>
      <ButtonRecipes />
      { pathname === '/meals'
        ? (mealsApi.slice(0, numberPathName).map((e, index) => (
          <div
            key={ e.idMeal }
            data-testid={ `${index}-recipe-card` }
          >
            <h1>Meals</h1>
            <p data-testid={ `${index}-card-name` }>
              { e.strMeal }
            </p>
            <img
              src={ e.strMealThumb }
              alt="food"
              data-testid={ `${index}-card-img` }
            />
          </div>
        ))) : (drinksApi.slice(0, numberPathName).map((e, index) => (
          <div
            key={ e.idDrinks }
            data-testid={ `${index}-recipe-card` }
          >
            <h1>Drinks</h1>
            <p data-testid={ `${index}-card-name` }>
              { e.strDrink }
            </p>
            <img
              src={ e.strDrinkThumb }
              alt="drink"
              data-testid={ `${index}-card-img` }
            />
          </div>
        )))}
      <Footer />
      <Header />
    </div>
  );
}

export default Recipes;
