import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Header() {
  const { pathname } = useLocation();

  function pathExclusive(path) {
    let title;
    let icon;
    let search = false;
    switch (path) {
    case '/meals':
      title = 'Meals';
      icon = mealIcon;
      break;
    case '/drinks':
      title = 'Drinks';
      icon = drinkIcon;
      break;
    case '/profile':
      title = 'Profile';
      icon = null;
      search = true;
      break;
    case '/done-recipes':
      title = 'Done Recipes';
      search = true;
      break;
    case '/favorite-recipes':
      title = 'Favorite Recipes';
      search = true;
      break;
    default:
      break;
    }
    return [title, icon, search];
  }
  const [title, icon, search] = pathExclusive(pathname);
  return (
    <header>
      <section className="boxHeader">
        <h1>RECIPES app</h1>
        <Link to="/profile">
          <img
            data-testid="profile-top-btn"
            src={ profileIcon }
            alt="Profile Icon"
          />
        </Link>
        {search || (
          <img
            data-testid="search-top-btn"
            src={ searchIcon }
            alt="Search Icon"
          />
        )}
        <section className="meals">
          <h2 data-testid="page-title">{ title }</h2>
          <img src={ icon } alt="Icon" />
        </section>
      </section>
    </header>
  );
}

export default Header;
