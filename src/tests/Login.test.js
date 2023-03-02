import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
// import { renderWithRouter } from '../helpers/renderWithRouter';
// import Login from '../components/Login';

describe('Testes da página de Login', () => {
  it('', () => {
    render(<App />);
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
});
