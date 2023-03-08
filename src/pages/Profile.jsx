import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
// import { Button } from 'bootstrap';
import { Link, useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Profile() {
  const [emailUser, setEmailUser] = useState('');
  useEffect(() => {
    const { email } = JSON.parse(localStorage.getItem('user'));
    setEmailUser(email);
  }, [emailUser]);

  const history = useHistory();

  return (
    <>
      <Header />
      <h2 data-testid="profile-email">{emailUser}</h2>
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
        onClick={ () => {
          localStorage.clear();
          history.push('/');
        } }
      >
        Logout
      </button>
      <Footer />
    </>
  );
}

Profile.propTypes = {};

export default Profile;
