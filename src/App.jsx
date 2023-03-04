import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Login from './components/Login';
// import Recipes from './PagesRecipes/Recipes'; tive que tirar para passar nos testes colocar novamente quando tiver pagina dedicada com todos os companentes
import SearchBar from './components/SearchBar';
import Header from './components/Header';
// import Footer from './components/Footer';
import RecipeDetails from './pages/RecipeDetails';
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
      <Header />
      <Switch>
        <Route path="/meals/:idMeal" component={ RecipeDetails } />
        <Route path="/drinks/:idDrink" component={ RecipeDetails } />
        {/* <Route path="/meals/:id-da-receita/in-progress" component={ Footer } />
        <Route path="/drinks/:id-da-receita/in-progress" component={ Footer } /> */}
        {/* Precisa ter componente <Footer/> no final do componente */}
        {/* <Route path="/profile" component={ Footer } />
        <Route path="/done-recipes" component={ Footer } />
        <Route path="/favorite-recipes" component={ Footer } /> */}
        <Route exact path="/meals" component={ SearchBar } />
        <Route exact path="/drinks" component={ SearchBar } />
        <Route exact path="/" component={ Login } />
        {/* <Route path="*" component={ Footer } /> */}
      </Switch>
    </>
  );
}

export default App;
