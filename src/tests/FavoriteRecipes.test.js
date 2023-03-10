// import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import mockedData from './helpers/mockedData';

beforeEach(() => {
  jest.spyOn(global, 'fetch').mockResolvedValue({
    json: jest.fn().mockResolvedValue(mockedData),
  });
});

afterEach(() => {
  global.fetch.mockClear();
});

const rota = '/favorite-recipes';

describe('Teste do FavoriteRecipes', () => {
  it('Existe botao com nome "All, Meals e Drinks"', () => {
    renderWithRouter(<App />, rota);
    const buttonAll = screen.getByTestId('filter-by-all-btn');
    const buttonMeals = screen.getByTestId('filter-by-meal-btn');
    const buttonDrinks = screen.getByTestId('filter-by-drink-btn');
    expect(buttonAll).toBeInTheDocument();
    expect(buttonMeals).toBeInTheDocument();
    expect(buttonDrinks).toBeInTheDocument();
  });
});
