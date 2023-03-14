import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import SearchBar from './SearchBar';
import './Login.css';
// import '../style/Header.css';

function Header() {
  const [startSearch, setStartSearch] = useState(false);
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
      icon = profileIcon;
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
    }
    return [title, icon, search];
  }

  const [title, icon, search] = pathExclusive(pathname);
  return (
    <header>
      <section className="boxHeader">
        <div className="container-title">
          <h1 className="recipes-app-title">RECIPES</h1>
          <h1 className="recipes-app-title-2">app</h1>
          <Link to="/profile">
            <img
              data-testid="profile-top-btn"
              src={ profileIcon }
              alt="Profile Icon"
              className="button-profile"
            />
          </Link>
          {search || (
            <input
              type="image"
              data-testid="search-top-btn"
              value={ startSearch }
              onClick={ () => setStartSearch(!startSearch) }
              className="button-search"
              src={ searchIcon }
              alt="Search Icon"
            />
          )}
        </div>
        <div className="meals-title-e-image">
          <section className="meals">
            <img src={ icon } alt="Icon" className="image-meals" />
            <h2 data-testid="page-title" className="title-header">{title}</h2>
          </section>
        </div>
        {startSearch === true ? <SearchBar /> : null}
      </section>
    </header>
  );
}

export default Header;
