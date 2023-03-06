import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import RecipeContext from './RecipeContext';

function RecipeProvider({ children }) {
  const [recipes, setRecipes] = useState([]);

  const prop = useMemo(() => ({ recipes, setRecipes }), [recipes]);
  return (
    <RecipeContext.Provider value={ prop }>
      { children }
    </RecipeContext.Provider>
  );
}

RecipeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RecipeProvider;
