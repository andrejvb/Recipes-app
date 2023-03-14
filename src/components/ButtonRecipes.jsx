import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { apiRecipesDrinks, apiRecipesSetDrinks } from '../ServicesRecipes/apiDrinks';
import { apiRecipesFood, apiRecipesSetFood } from '../ServicesRecipes/apiFood';
import { RecipeContext } from '../context/recipes';
import './Login.css';

function ButtonRecipes() {
  const { pathname } = useLocation(); // usado para acessar as telas /meals e /drinks
  const [mealsSet, setMealsSet] = useState([]); // armazena as categorias da api food
  const [drinkSet, setDrinkSet] = useState([]); // armazena as categorias da api drink
  const { setRecipes } = useContext(RecipeContext);
  // const [setSituacao] = useState(true);
  const [category, setCategory] = useState('All');
  // console.log(recipes);

  const renderizaApiSet = async () => { // renderizando as api's para serem usadas
    const mealsSetDados = await apiRecipesSetFood();
    const drinksSetDados = await apiRecipesSetDrinks();
    setMealsSet([...new Set(mealsSetDados.meals?.map((e) => e.strCategory))]);
    setDrinkSet([...new Set(drinksSetDados.drinks?.map((e) => e.strCategory))]);
    // consulta do set no site https://vidafullstack.com.br/javascript/new-set-com-javascript/
    // console.log(([...new Set(mealsDados.meals.map((e) => e.strCategory))]));
  };

  useEffect(() => { // chamando a função  das api's
    renderizaApiSet();
  }, []);

  const numberCategory = 5; // precisa armazenar para usar no slice

  const apiButton = async (e) => { // usada para o filtro do requsiito 21, para filtrar por categorias
    const mealsApi = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${e}`;
    const drinksApi = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${e}`;
    const createCondicao = pathname === '/meals' ? mealsApi : drinksApi;
    const fetchApiFood = await fetch(createCondicao);
    const apiFoodResponse = await fetchApiFood.json();
    // console.log(apiFoodResponse[pathname.split('/')[1]]);
    setRecipes(apiFoodResponse[pathname.split('/')[1]]);
    setCategory(e);
    /* if (e !== recipes) {
      setSituacao(true);
    } */
  };

  const handleClean = async () => { // usada para o requisito 21 para o botão all retonar as receitas iniciais
    const mealsDados = await apiRecipesFood();
    const drinksDados = await apiRecipesDrinks();
    console.log(mealsDados);
    if (pathname === '/meals') setRecipes(mealsDados.meals);
    else setRecipes(drinksDados.drinks);
    setCategory('All');
  };

  const changeCategory = (e) => { // usada para o requisito 22, para ao clicar novamente na categoria, volta para as receitas iniciais
    if (category === e) {
      handleClean();
    } else {
      apiButton(e);
    }
  };

  return (
    <div className="buttons-header">
      { pathname === '/meals'
        ? (mealsSet?.slice(0, numberCategory).map((e) => (
          <Button
            key={ e }
            data-testid={ `${e}-category-filter` }
            onClick={ () => changeCategory(e) }
            variant="secondary"
            className="botoes-header"
          >
            { e }
          </Button>
        ))) : (drinkSet?.slice(0, numberCategory).map((e) => (
          <Button
            key={ e }
            data-testid={ `${e}-category-filter` }
            onClick={ () => changeCategory(e) }
            variant="secondary"
            className="botoes-header"
          >
            { e }
          </Button>
        ))) }
      <Button
        data-testid="All-category-filter"
        onClick={ () => handleClean() }
        variant="secondary"
        className="botoes-header"
      >
        All
      </Button>
    </div>
  );
}

export default ButtonRecipes;
