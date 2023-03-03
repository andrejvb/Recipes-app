import React from 'react';
// import { screen, act } from '@testing-library/react';
import { screen } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter';
// import userEvent from '@testing-library/user-event';
import Page from '../App';
// import { data } from './mokedData';

describe('test app', () => {
  beforeEach(async () => {
    // const promise = Promise.resolve({
    //   json: () => Promise.resolve(data),
    // });
    // global.fetch = jest.fn(() => promise);
    // renderWithRouter(<Page />, '/meals');
    // await act(async () => {
    //   await promise;
    // });
  });
  test('if it render', () => {
    renderWithRouter(<Page />, '/meals');
    expect(screen.getByText(/Search/i)).toBeInTheDocument();
  });
});
