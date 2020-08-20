import React from 'react';
import AddWine from './AddWine';
import {render, screen, fireEvent } from '@testing-library/react';
import App from '../App';

test('The correct content has been rendered', () => {
    const { getByText, getByLabelText, getByRole } = render(<AddWine />);

    getByText("Add a new wine");
    getByLabelText("Name");
    getByLabelText("Type");
    getByLabelText("Price");

    getByLabelText("1");
    getByLabelText("2");
    getByLabelText("3");
    getByLabelText("4");
    getByLabelText("5");

    getByText("Rating");
    getByText("Take photo");
    getByText("Add wine");

});

test('A name can be entered', () => {
    const { getByText } = render(<AddWine />);
    const nameOfWine = 'Lovely Summer Red';

    fireEvent.change(screen.getByLabelText('Name'), {
        target: { value: nameOfWine},
    });

    expect(screen.getByLabelText('Name')).toHaveValue(nameOfWine);
});

test('A price can be entered', () => {
    const { getByText } = render(<AddWine />);
    const valueOfWine = '14.99';

    fireEvent.change(screen.getByLabelText('Price'), {
        target: { value: valueOfWine},
    });

    expect(screen.getByLabelText('Price')).toHaveValue(valueOfWine);
});