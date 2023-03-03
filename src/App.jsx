import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Recipes from './PagesRecipes/Recipes';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/meals" component={ Recipes } />
        <Route path="/drinks" component={ Recipes } />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
