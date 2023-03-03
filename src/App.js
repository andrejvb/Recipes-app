import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css'; 
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/"component = {} />
        <Route exact path="/meals"component = {}  /* Precisa ter componente <Footer/> no final do componente */ /> 
        <Route exact path="/drinks" component = {}  /* Precisa ter componente <Footer/> no final do componente *//>
        <Route exact path="/meals/:id-da-receita" component = {}/>
        <Route exact path="/drinks/:id-da-receita"component = {} />
        <Route exact path="/meals/:id-da-receita/in-progress"component = {} />
        <Route exactpath="/drinks/:id-da-receita/in-progress" component = {} />
        <Route exact path="/profile" component = {}  /* Precisa ter componente <Footer/> no final do componente *//>
        <Route exact path="/done-recipes"component = {} />
        <Route exact path="/favorite-recipes"component = {} />
        <Route exact path="*"component = {} />
      </Switch>
    </BrowserRouter>

  );
}

export default App;
