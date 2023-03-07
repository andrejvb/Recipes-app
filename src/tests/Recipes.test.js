import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

describe('Teste o componente Recipes', () => {
  it('Na tela renderiza imagem profile', () => {
    renderWithRouter(<App />, '/drinks');
    const teste = screen.getByRole('img', {
      name: /ícone de meals/i,
    });
    userEvent.click(teste);
    expect(teste).toBeInTheDocument();
  });
});
