import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

describe('Testes Profile', () => {
  it('Testa se email cadastrado aparece no Profile', () => {
    renderWithRouter(<App />, '/');
    const emailId = screen.getByTestId('email-input');
    const senha = screen.getByTestId('password-input');
    userEvent.type(emailId, 'thalita@gmail.com');
    userEvent.type(senha, '1234567');
    const botao = screen.getByRole('button', { name: /Enter/i });
    userEvent.click(botao);
    const profileIcon = screen.getByTestId('profile-top-btn');
    userEvent.click(profileIcon);
    const titleRecipesApp = screen.getByRole('heading', { name: /recipes app/i });
    expect(titleRecipesApp).toBeInTheDocument();
    const profileTitle = screen.getByRole('heading', { name: /profile/i });
    expect(profileTitle).toBeInTheDocument();
    const email = screen.getByTestId('profile-email');
    expect(email).toBeInTheDocument();
    expect(email).toHaveTextContent('thalita@gmail.com');
    const profileIcon2 = screen.getByAltText('Icon');
    expect(profileIcon2).toBeInTheDocument();
    const doneRecipes = screen.getByRole('button', { name: /done recipes/i });
    expect(doneRecipes).toBeInTheDocument();
    const favRecipes = screen.getByRole('button', { name: /favorite recipes/i });
    expect(favRecipes).toBeInTheDocument();
    const logout = screen.getByRole('button', { name: /logout/i });
    expect(logout).toBeInTheDocument();
    userEvent.click(logout);
    expect(email).not.toBeInTheDocument();
  });
});
