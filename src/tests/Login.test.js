import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
// import Login from '../components/Login';

describe('Testes da página de Login', () => {
  it('', () => {
    renderWithRouter(<App />);
    const emailId = screen.getByTestId('email-input');
    expect(emailId).toBeInTheDocument();
    const senha = screen.getByTestId('password-input');
    expect(senha).toBeInTheDocument();
    const botao = screen.getByRole('button', {
      name: /Enter/i,
    });
    expect(botao).toBeInTheDocument();
    expect(botao).toBeDisabled();
    userEvent.type(emailId, 'thalita@gmail.com');
    userEvent.type(senha, '1234567');
    expect(botao).toBeEnabled();
    userEvent.click(botao);
  });
  it('Testa se é possível digitar nos campos de email e senha', () => {
    renderWithRouter(<App />);

    const email = screen.getByTestId('email-input');

    const senha = screen.getByTestId('password-input');

    userEvent.type(email, 'tha@gmail.com');
    userEvent.type(senha, '12345678');

    expect(email.value).toBe('tha@gmail.com');
    expect(senha.value).toBe('12345678');
  });
});
