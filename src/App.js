import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './components/Footer';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Footer } />
      {/* Precisa ter componente <Footer/> no final do componente */}
      <Route exact path="/meals" component={ Footer } />
      {/* Precisa ter componente <Footer/> no final do componente */}
      <Route exact path="/drinks" component={ Footer } />
      <Route exact path="/meals/:id-da-receita" component={ Footer } />
      <Route exact path="/drinks/:id-da-receita" component={ Footer } />
      <Route exact path="/meals/:id-da-receita/in-progress" component={ Footer } />
      <Route exactpath="/drinks/:id-da-receita/in-progress" component={ Footer } />
      {/* Precisa ter componente <Footer/> no final do componente */}
      <Route exact path="/profile" component={ Footer } />
      <Route exact path="/done-recipes" component={ Footer } />
      <Route exact path="/favorite-recipes" component={ Footer } />
      <Route exact path="*" component={ Footer } />
    </Switch>
  );
}

export default App;
