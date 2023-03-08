import React from 'react';
// import PropTypes from 'prop-types';
// import { Button } from 'bootstrap';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Profile() {
  return (
    <>
      <Header />
      <div>Profile</div>
      <Link
        to="/done-recipes"
      >
        <button
          type="button"
          data-testid="profile-done-btn"
        >
          Done Recipes
        </button>
      </Link>
      <Link
        to="/favorite-recipes"
      >
        <button
          type="button"
          data-testid="profile-favorite-btn"
        >
          Favorite Recipes
        </button>
      </Link>
      <button
        type="button"
        data-testid="profile-logout-btn"
      >
        Logout
      </button>
      <Footer />
    </>
  );
}

Profile.propTypes = {};

export default Profile;
