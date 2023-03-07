import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import Page from '../App';
import { genFetchFunction } from './helpers/mockHelper';

const searchInputDtid = 'search-input';
const execSearchBtnDtid = 'exec-search-btn';
const nameSearchRadioDtid = 'name-search-radio';

describe('test SearchBar on /meals', () => {
  test('if it render search bar on /meals', async () => {
    const promisses = [];
    global.fetch = jest.fn(genFetchFunction(promisses));
    renderWithRouter(<Page />, '/meals');
    await act(async () => {
      await Promise.all(promisses);
    });
    expect(screen.getByText(/Search/i)).toBeInTheDocument();
  });
  test('if it query by search name with 0 results and display alert', async () => {
    global.alert = jest.fn();
    const promisses = [];
    global.fetch = jest.fn(genFetchFunction(promisses));
    renderWithRouter(<Page />, '/meals');
    userEvent.type(screen.getByTestId(searchInputDtid), 'xablau');
    userEvent.click(screen.getByTestId('ingredient-search-radio'));
    userEvent.click(screen.getByTestId(execSearchBtnDtid));
    await act(async () => {
      await Promise.all(promisses);
    });
    expect(global.alert).toHaveBeenCalledWith('Sorry, we haven\'t found any recipes for these filters.');
  });
  test('if it query by first letter with with more than one character display alert', async () => {
    global.alert = jest.fn();
    const promisses = [];
    global.fetch = jest.fn(genFetchFunction(promisses));
    renderWithRouter(<Page />, '/meals');
    await act(async () => {
      await Promise.all(promisses);
    });
    userEvent.type(screen.getByTestId(searchInputDtid), 'pasta');
    userEvent.click(screen.getByTestId('first-letter-search-radio'));
    userEvent.click(screen.getByTestId(execSearchBtnDtid));
    expect(global.alert).toHaveBeenCalledWith('Your search must have only 1 (one) character');
  });
  test('if it query by search name with more than 12 results and display correctly', async () => {
    const promisses = [];
    global.fetch = jest.fn(genFetchFunction(promisses));
    renderWithRouter(<Page />, '/meals');
    userEvent.type(screen.getByTestId(searchInputDtid), 'soup');
    userEvent.click(screen.getByTestId(nameSearchRadioDtid));
    userEvent.click(screen.getByTestId(execSearchBtnDtid));
    await act(async () => {
      await Promise.all(promisses);
    });
    expect(screen.getAllByTestId(/-recipe-card/i)).toHaveLength(12);
  });
  test('if it query by search name with one result and redirect to its page', async () => {
    const promisses = [];
    global.fetch = jest.fn(genFetchFunction(promisses));
    renderWithRouter(<Page />, '/meals');
    userEvent.type(screen.getByTestId(searchInputDtid), 'Arrabiata');
    userEvent.click(screen.getByTestId(nameSearchRadioDtid));
    userEvent.click(screen.getByTestId(execSearchBtnDtid));
    await act(async () => {
      await Promise.all(promisses);
    });
    expect(screen.queryAllByTestId(/-recipe-card/i)).toHaveLength(0);
    // TODO check if there was redirected to /meals/52771
  });
});

describe('test SearchBar on /drinks', () => {
  test('if it render search bar on /drinks', async () => {
    const promisses = [];
    global.fetch = jest.fn(genFetchFunction(promisses));
    renderWithRouter(<Page />, '/drinks');
    await act(async () => {
      await Promise.all(promisses);
    });
    expect(screen.getByText(/Search/i)).toBeInTheDocument();
  });
  test('if it query by search name with 0 results and display alert', async () => {
    global.alert = jest.fn();
    const promisses = [];
    global.fetch = jest.fn(genFetchFunction(promisses));
    renderWithRouter(<Page />, '/drinks');
    userEvent.type(screen.getByTestId(searchInputDtid), 'xablau');
    userEvent.click(screen.getByTestId('ingredient-search-radio'));
    userEvent.click(screen.getByTestId(execSearchBtnDtid));
    await act(async () => {
      await Promise.all(promisses);
    });
    expect(global.alert).toHaveBeenCalledWith('Sorry, we haven\'t found any recipes for these filters.');
  });
  test('if it query by first letter with with more than one character display alert', async () => {
    global.alert = jest.fn();
    const promisses = [];
    global.fetch = jest.fn(genFetchFunction(promisses));
    renderWithRouter(<Page />, '/drinks');
    userEvent.type(screen.getByTestId(searchInputDtid), 'pasta');
    userEvent.click(screen.getByTestId('first-letter-search-radio'));
    userEvent.click(screen.getByTestId(execSearchBtnDtid));
    await act(async () => {
      await Promise.all(promisses);
    });
    expect(global.alert).toHaveBeenCalledWith('Your search must have only 1 (one) character');
  });
  test('if it query by search name with more than 12 results and display correctly', async () => {
    const promisses = [];
    global.fetch = jest.fn(genFetchFunction(promisses));
    renderWithRouter(<Page />, '/drinks');
    userEvent.type(screen.getByTestId(searchInputDtid), 'gin');
    userEvent.click(screen.getByTestId(nameSearchRadioDtid));
    userEvent.click(screen.getByTestId(execSearchBtnDtid));
    await act(async () => {
      await Promise.all(promisses);
    });
    expect(screen.getAllByTestId(/-recipe-card/i)).toHaveLength(12);
  });
  test('if it query by search name with one result and redirect to its page', async () => {
    const promisses = [];
    global.fetch = jest.fn(genFetchFunction(promisses));
    renderWithRouter(<Page />, '/drinks');
    userEvent.type(screen.getByTestId(searchInputDtid), 'Aquamarine');
    userEvent.click(screen.getByTestId(nameSearchRadioDtid));
    userEvent.click(screen.getByTestId(execSearchBtnDtid));
    await act(async () => {
      await Promise.all(promisses);
    });
    expect(screen.queryAllByTestId(/-recipe-card/i)).toHaveLength(0);
    // TODO check if there was redirected to /meals/52771
  });
});
