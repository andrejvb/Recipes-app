// import React from 'react';
// import { screen } from '@testing-library/react';
// import App from '../App';
// import renderWithRouter from './helpers/renderWithRouter';
import mockedData from './helpers/mockedData';

beforeEach(() => {
  jest.spyOn(global, 'fetch').mockResolvedValue({
    json: jest.fn().mockResolvedValue(mockedData),
  });
});

afterEach(() => {
  global.fetch.mockClear();
});
