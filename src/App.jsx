import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import Recipes from './PagesRecipes/Recipes';
// import SearchBar from './components/SearchBar';
import Header from './components/Header';
import Footer from './components/Footer';
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
        <Route exact path="/" component={ Login } />
        <Route path="/meals/:id-da-receita" component={ Footer } />
        <Route path="/drinks/:id-da-receita" component={ Footer } />
        <Route path="/meals/:id-da-receita/in-progress" component={ Footer } />
        <Route path="/drinks/:id-da-receita/in-progress" component={ Footer } />
        {/* Precisa ter componente <Footer/> no final do componente */}
        <Route path="/profile" component={ Footer } />
        <Route path="/done-recipes" component={ Footer } />
        <Route path="/favorite-recipes" component={ Footer } />
        <Route path="/meals" component={ Recipes } />
        <Route path="/drinks" component={ Recipes } />
        <Route path="*" component={ Footer } />
      </Switch>
      <Header />
    </>
  );
}

export default App;
