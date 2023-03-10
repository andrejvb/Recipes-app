import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
// import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const MOCK_DATA_FAVORITE = [
  {
    id: '52771',
    type: 'meal',
    nationality: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
  },
  {
    id: '178319',
    type: 'drink',
    nationality: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'Aquamarine',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
  },
];

function FavoriteRecipes() {
  const [recipesFav, setRecipesFav] = useState([]);
  const [filters, setFilters] = useState([]);
  console.log(filters);
  const [copie, setCopie] = useState(false);
  // console.log(recipesFav);

  useEffect(() => { // requisito 50 buscando e pegando as coisa do localStorage e simulando caso não tenha nada ainda
    const data = localStorage.getItem('favoriteRecipes');
    if (!data) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    }
    localStorage.setItem('favoriteRecipes', JSON.stringify(MOCK_DATA_FAVORITE));
    const parseData = JSON.parse(data);
    setRecipesFav(parseData);
  }, []);

  const linkCopie = (type, id) => { // requisito 53 para copiar o link url
    const acessoUrl = `http://localhost:3000/${type}s/${id}`;
    console.log(acessoUrl);
    copy(acessoUrl);
    setCopie(true);
  };

  const mealsFilter = () => { // requisito 55 essa e as outras duas abaixo, descobrir em como unir em uma
    const meals = recipesFav.filter((eMeals) => eMeals.type === 'meal');
    setFilters(meals);
  };

  const drinkFilter = () => {
    const drink = recipesFav.filter((eDrinks) => eDrinks.type === 'drink');
    setFilters(drink);
  };

  const allFilter = () => {
    setFilters(recipesFav);
  };

  useEffect(() => {
    setFilters(recipesFav);
  }, [recipesFav]);

  return (
    <>
      <Header />
      <Card />
      <div>FavoriteRecipes</div>
      <button
        data-testid="filter-by-all-btn"
        onClick={ () => allFilter() }
      >
        All
      </button>
      <button
        data-testid="filter-by-meal-btn"
        onClick={ () => mealsFilter() }
      >
        Meals
      </button>
      <button
        data-testid="filter-by-drink-btn"
        onClick={ () => drinkFilter() }
      >
        Drinks
      </button>
      { filters.map((e, index) => (
        <div
          key={ e.id }
        >
          <Link
            to={ `/${e.type}s/${e.id}` }
          >
            <img
              data-testid={ `${index}-horizontal-image` }
              src={ e.image }
              alt="teste"
              width="150px"
            />
          </Link>
          <p
            data-testid={ `${index}-horizontal-top-text` }
          >
            { e.type === 'meal'
              ? `${e.nationality} - ${e.category}` : e.alcoholicOrNot }
          </p>
          <Link
            to={ `/${e.type}s/${e.id}` }
          >
            <p
              data-testid={ `${index}-horizontal-name` }
            >
              { e.name }
            </p>
          </Link>
          <input
            type="image"
            data-testid={ `${index}-horizontal-share-btn` }
            src={ shareIcon }
            alt="Share Icon"
            onClick={ () => linkCopie(e.type, e.id) }
          />
          { copie && <p>Link copied!</p> }
          <input
            type="image"
            data-testid={ `${index}-horizontal-favorite-btn` }
            src={ blackHeartIcon }
            alt="Black Heart Icon"
          />
        </div>
      )) }
    </>
  );
}

FavoriteRecipes.propTypes = {};

export default FavoriteRecipes;
