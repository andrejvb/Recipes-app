import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

describe('Testes Header', () => {
  it('Testa path "/meals", se search aparece e dasaparece', () => {
    renderWithRouter(<App />, '/meals');
    const mealsTitle = screen.getByRole('heading', { name: /meals/i });
    expect(mealsTitle).toBeInTheDocument();
    const searchIcon = screen.getByTestId('search-top-btn');
    userEvent.click(searchIcon);
    const searchBar = screen.getByTestId('search-input');
    expect(searchBar).toBeInTheDocument();
    userEvent.click(searchIcon);
    expect(searchBar).not.toBeInTheDocument();
  });
  it('Testa path "/drinks", se search aparece e dasaparece', () => {
    renderWithRouter(<App />, '/drinks');
    const mealsTitle = screen.getByRole('heading', { name: /drinks/i });
    expect(mealsTitle).toBeInTheDocument();
    const searchIcon = screen.getByTestId('search-top-btn');
    userEvent.click(searchIcon);
    const searchBar = screen.getByTestId('search-input');
    expect(searchBar).toBeInTheDocument();
    userEvent.click(searchIcon);
    expect(searchBar).not.toBeInTheDocument();
  });
  it('Testa acesso ao Profile', () => {
    renderWithRouter(<App />, '/drinks');
    const profileIcon = screen.getByTestId('profile-top-btn');
    const mealsTitle = screen.getByRole('heading', { name: /drinks/i });
    expect(mealsTitle).toBeInTheDocument();
    expect(profileIcon).toBeInTheDocument();
    userEvent.click(profileIcon);
    expect(mealsTitle).not.toBeInTheDocument();
    const profileTitle = screen.getByRole('heading', { name: /profile/i });
    expect(profileTitle).toBeInTheDocument();
    // const { pathname } = history.location;
    // expect(pathname).toBe('/profile');
  });
});
