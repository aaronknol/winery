import React from 'react';
import WineList from './WineList';
import { BrowserRouter } from 'react-router-dom';
import { WineTypes } from '../interfaces';
import {render, getAllByText, screen, fireEvent, waitFor, waitForDomChange } from '@testing-library/react';

test('The correct content has been rendered', () => {
    const wines = [{
        key: '1',
        name: 'Wine 1',
        type: 'Red',
        price: '1422',
        rating: 3,
    },
    {
        key: '2',
        name: 'Wine 2',
        type: 'Red',
        price: '1783',
        rating: 1,
    },
    {
        key: '3',
        name: 'Wine 3',
        type: 'Red',
        price: '699',
        rating: 5,
    }];
    const deleteWine = jest.fn();
    const updateWine = jest.fn();

    const { getByText, getByLabelText, getAllByRole, getByTestId } = render(<BrowserRouter><WineList wines={wines} deleteWine={deleteWine} updateWine={updateWine} /></BrowserRouter>);

    // Wine 1
    const wine0 = getByTestId('wine-0');
    const wine0Stars = wine0.querySelectorAll('svg');
    const wine0StarsLength = wine0Stars.length;

    expect(getByText("Wine 1").toHaveValue);
    expect(getByText("$14.22").toHaveValue);
    expect(wine0).toHaveValue;
    expect(wine0StarsLength).toEqual(3);

    //Wine 2
    const wine1 = getByTestId('wine-1');
    const wine1Stars = wine1.querySelectorAll('svg');
    const wine1StarsLength = wine1Stars.length;

    expect(getByText("Wine 2").toHaveValue);
    expect(getByText("$17.83").toHaveValue);
    expect(wine1.toHaveValue);
    expect(wine1StarsLength).toEqual(1);

    //Wine 3
    expect(getByText("Wine 2").toHaveValue);
    expect(getByText("$6.99").toHaveValue);

    const wine2 = getByTestId('wine-2');
    const wine2Stars = wine2.querySelectorAll('svg');
    const wine2StarsLength = wine2Stars.length;

    expect(wine2.toHaveValue);
    expect(wine2StarsLength).toEqual(5);


    // expect(screen.getAllByText("Red").toHaveLength(3));
});

test('A wine can be deleted', () => {
    const wines = [{
        key: '1',
        name: 'Wine 1',
        type: 'Red',
        price: '1422',
        rating: '3',
    }];

    const deleteWine = jest.fn();
    const updateWine = jest.fn();
    const { getByText, getByLabelText, getAllByRole } = render(<BrowserRouter><WineList wines={wines} deleteWine={deleteWine} updateWine={updateWine} /></BrowserRouter>);

    getByText('Delete').click();

    expect(deleteWine).toHaveBeenCalled();
    expect(deleteWine).toHaveBeenCalledWith('1');

});

test('A wine can be edited', async() => {
    const wines = [{
        key: '1',
        name: 'Wine 1',
        type: 'Red',
        price: '1422',
        rating: '3',
    }];
    history.push = jest.fn();
    const deleteWine = jest.fn();
    const updateWine = jest.fn();
    const { getByText, queryAllByText, getByTestId } = render(<BrowserRouter><WineList wines={wines} deleteWine={deleteWine} updateWine={updateWine} /></BrowserRouter>);

    getByText('Edit').click();
    window.location.href = '/edit/0';

    const content = getByText(/Edit/);
    expect(content).toHaveValue;

});