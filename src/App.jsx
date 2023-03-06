import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import Recipes from './pages/Recipes';
import RecipeDetails from './pages/RecipeDetails';
import FavoriteRecipes from './pages/FavoriteRecipes';
import DoneRecipes from './pages/DoneRecipes';
import RecipeInProgress from './pages/RecipeInProgress';
import Profile from './pages/Profile';
// import rockGlass from './images/rockGlass.svg';
// import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    // <div className="meals">
    //   <span className="logo">TRYBE</span>
    //   <object
    //     className="rocksGlass"
    //     type="image/svg+xml"
    //     data={ rockGlass }
    //   >
    //     Glass
    //   </object>
    // </div>
    <>
      <Switch>
        <Route path="/meals/:idMeal" component={ RecipeDetails } />
        <Route path="/drinks/:idDrink" component={ RecipeDetails } />
        <Route path="/meals/:idMeal/progress" component={ RecipeInProgress } />
        <Route path="/drinks/:idDrink/progress" component={ RecipeInProgress } />
        <Route path="/profile" component={ Profile } />
        <Route path="/done-recipes" component={ DoneRecipes } />
        <Route path="/favorite-recipes" component={ FavoriteRecipes } />
        <Route exact path="/meals" component={ Recipes } />
        <Route exact path="/drinks" component={ Recipes } />
        <Route exact path="/" component={ Login } />
        <Route path="*" component={ Login } />
      </Switch>
      {/* <Routes>
        <Route path="/">
          <Route index element={ <Login /> } />
          <Route path="meals" element={ <Recipes /> }>
            <Route path=":mealId" element={ <RecipeDetails /> }>
              <Route path="progress" element={ <Footer /> } />
            </Route>
          </Route>
          <Route path="drinks" element={ <Recipes /> }>
            <Route path=":drinkId" element={ <RecipeDetails /> }>
              <Route path="progress" element={ <Footer /> } />
            </Route>
          </Route>
        </Route>
      </Routes> */}
    </>
  );
}

export default App;
