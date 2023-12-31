import { Link } from 'react-router-dom';
import React from 'react';

import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

import './Login.css';

function Footer() {
  return (
    <footer className="footer" data-testid="footer">
      <Link to="/drinks">
        <img
          data-testid="drinks-bottom-btn"
          src={ drinkIcon }
          alt="ícone de drinks"
          className="button-drinks"
        />
      </Link>
      <Link to="/meals">
        <img
          data-testid="meals-bottom-btn"
          src={ mealIcon }
          alt="ícone de meals"
          className="button-meals"
        />
      </Link>
    </footer>
  );
}

export default Footer;
