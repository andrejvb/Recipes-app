import React from 'react';
import { useLocation } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Header() {
  const { pathname } = useLocation();
  return (
    <header>
      <section className="boxHeader">
        <img
          data-testid="profile-top-btn"
          src={ profileIcon }
          alt="Profile Icon"
        />
        <h1>RECIPES app</h1>
        <img
          data-testid="search-top-btn"
          src={ searchIcon }
          alt="Search Icon"
        />
        <section className="meals">
          <h2 data-testid="page-title">{ pathname }</h2>
          {pathname === '/meals'
            ? <img src={ mealIcon } alt="Icon of meals" />
            : <img src={ drinkIcon } alt="Icon of drinks" />}
        </section>
      </section>
    </header>

  );
}

export default Header;
