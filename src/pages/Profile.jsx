import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
// import { Button } from 'bootstrap';
import Button from 'react-bootstrap/Button';
import { Link, useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './Profile.css';

function Profile() {
  const [emailUser, setEmailUser] = useState('');
  useEffect(() => {
    const { email } = JSON.parse(localStorage.getItem('user')) || 'user';
    setEmailUser(email);
  }, [emailUser]);

  const history = useHistory();

  return (
    <>
      <Header />
      <p data-testid="profile-email" className="email-profile">{emailUser}</p>
      <div className="buttons-profile">
        <Link
          to="/done-recipes"
        >
          <Button
            type="button"
            data-testid="profile-done-btn"
            variant="secondary"
          >
            Done Recipes
          </Button>
        </Link>
        <Link
          to="/favorite-recipes"
        >
          <Button
            type="button"
            data-testid="profile-favorite-btn"
            variant="secondary"
          >
            Favorite Recipes
          </Button>
        </Link>
        <Button
          type="button"
          data-testid="profile-logout-btn"
          variant="secondary"
          onClick={ () => {
            localStorage.clear();
            history.push('/');
          } }
        >
          Logout
        </Button>
      </div>
      <Footer />
    </>
  );
}

Profile.propTypes = {};

export default Profile;
