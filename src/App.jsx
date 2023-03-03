import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Recipes from './PagesRecipes/Recipes';
import SearchBar from './components/SearchBar';
import Header from './components/Header';
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
        <Route path="/" component={ SearchBar } />
        <Route path="/meals" component={ SearchBar } />
        <Route path="/drinks" component={ Recipes } />
      </Switch>
      <Header />
    </>
  );
}

export default App;
