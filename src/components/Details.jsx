import React, { useEffect, useState } from 'react';
import copy from 'clipboard-copy';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import PropTypes from 'prop-types';
import { useLocation, useParams, Link } from 'react-router-dom';
import Recomendation from './Recomendation';

const START_RECIPE = 'Start Recipe';
const PROGRESS_RECIPE = 'Continue Recipe';

function Details({
  id,
  strArea,
  strAlcoholic,
  str,
  strThumb,
  strCategory,
  strInstructions,
  youtubeId,
  ingredients,
  recomendations,
}) {
  const [favorite, setFavorite] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favorite));
  }, [favorite]);

  const { pathname } = useLocation();
  const { idMeal, idDrink } = useParams();
  const inProgressSave = localStorage.getItem('inProgressRecipes');
  const inProgressRecipes = inProgressSave ? JSON.parse(inProgressSave) : {
    drinks: {},
    meals: {},
  };
  let drinks = {};
  let meals = {};
  if ('drinks' in inProgressRecipes) drinks = inProgressRecipes.drinks;
  if ('meals' in inProgressRecipes) meals = inProgressRecipes.meals;
  const jointRecipes = [...Object.keys(drinks), ...Object.keys(meals)];
  const isInProgress = jointRecipes.some((eid) => eid === idMeal || eid === idDrink);
  const donesSaved = localStorage.getItem('doneRecipes');
  const doneRecipes = donesSaved ? JSON.parse(donesSaved) : [];
  const isDone = doneRecipes.some(({ id: eid }) => eid === idMeal || eid === idDrink);
  return (
    <section>
      <ToastContainer position="bottom-center">
        <Toast
          className="mb-4"
          onClose={ () => setShow(false) }
          show={ show }
          delay={ 3000 }
          autohide
          bg="success"
        >
          <Toast.Body
            className="text-white"
          >
            Link copied!
          </Toast.Body>
        </Toast>
      </ToastContainer>
      <button
        type="button"
        data-testid="favorite-btn"
        value={ favorite }
        onClick={ (() => {
          setFavorite([{
            id,
            type: strAlcoholic === 'Alcoholic' ? 'drink' : 'meal',
            name: str,
            category: strCategory,
            image: strThumb,
            nationality: strArea || '',
            alcoholicOrNot: strAlcoholic || '',
          }]);
        }) }
      >
        Favoritar
      </button>
      <button
        type="button"
        data-testid="share-btn"
        onClick={ () => {
          copy(`http://localhost:3000${pathname}`);
          setShow(true);
        } }
      >
        Compartilhar
      </button>
      <h1 data-testid="recipe-title">{ str }</h1>
      <img data-testid="recipe-photo" src={ strThumb } alt="recipe" />
      <h3 data-testid="recipe-category">{ strAlcoholic || strCategory }</h3>
      <ul>
        {ingredients.map((ingredient, index) => (
          <li key={ index }>
            <span
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              { ingredient }
            </span>
          </li>
        ))}
      </ul>
      <p data-testid="instructions">{ strInstructions }</p>
      {youtubeId && <iframe
        data-testid="video"
        width="853"
        height="480"
        src={ `https://www.youtube.com/embed/${youtubeId}` }
        allow="accelerometer; autoplay; clipboard-write;
        encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
      />}
      <Recomendation recomendations={ recomendations } />
      {isDone || (
        <Link
          className="fixed-bottom"
          data-testid="start-recipe-btn"
          to={ `${pathname}/in-progress` }
        >
          { isInProgress ? PROGRESS_RECIPE : START_RECIPE }
        </Link>
      )}
    </section>
  );
}

Details.propTypes = {
  id: PropTypes.string.isRequired,
  strArea: PropTypes.string.isRequired,
  strAlcoholic: PropTypes.string.isRequired,
  str: PropTypes.string.isRequired,
  strThumb: PropTypes.string.isRequired,
  strCategory: PropTypes.string.isRequired,
  strInstructions: PropTypes.string.isRequired,
  youtubeId: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
  recomendations: PropTypes.arrayOf(PropTypes.shape({
    title1: PropTypes.string.isRequired,
    title2: PropTypes.string.isRequired,
    image1: PropTypes.string.isRequired,
    image2: PropTypes.string.isRequired,
    index1: PropTypes.number.isRequired,
    index2: PropTypes.number.isRequired,
  })).isRequired,
};

export default Details;
