import React from 'react';
import AddWine from './AddWine';
import { WineTypes } from '../interfaces';
import {render, screen, fireEvent } from '@testing-library/react';
import App from '../App';

test('The correct content has been rendered', () => {
    const { getByText, getByLabelText, getAllByRole } = render(<AddWine />);
    
    // add assertions
    expect(getByText("Add a new wine").toHaveValue); // toHaveContent seems better if works
    expect(getByLabelText("Name").toHaveValue);
    expect(getByLabelText("Type").toHaveValue);
    expect(getByLabelText("Price").toHaveValue);

    expect(getByLabelText("1").toHaveValue);
    expect(getByLabelText("2").toHaveValue);
    expect(getByLabelText("3").toHaveValue);
    expect(getByLabelText("4").toHaveValue);
    expect(getByLabelText("5").toHaveValue);

    expect(getByText("Rating").toHaveValue);
    expect(getAllByRole('button', { name: 'Take photo' }.toHaveValue));
    expect(getAllByRole('button', { name: 'Add wine' }.toHaveValue));
});

test('A name can be entered', () => {
    const { getByLabelText } = render(<AddWine />);
    const nameOfWine = 'Lovely Summer Red';

    fireEvent.change(screen.getByLabelText('Name'), {
        target: { value: nameOfWine},
    });

    expect(getByLabelText('Name')).toHaveValue(nameOfWine);
});

test('A price can be entered', () => {
    const { getByLabelText } = render(<AddWine />);
    const valueOfWine = '14.99';

    fireEvent.change(screen.getByLabelText('Price'), {
        target: { value: valueOfWine},
    });

    expect(getByLabelText('Price')).toHaveValue(valueOfWine);
});

test('All types of wine can be selected', () => {
    const { getByLabelText } = render(<AddWine />);

    for (let type in WineTypes) {
        fireEvent.change(screen.getByLabelText('Type'), {
            target: { value: WineTypes[type]},
        });
        expect(getByLabelText('Type')).toHaveValue(WineTypes[type]);
    }
});

test('A rating can be selected', () => {
    const { getByLabelText } = render(<AddWine />);
    const chosenRating = 3;
    
    fireEvent.change(screen.getByLabelText("3"), {
        target: { value: chosenRating},
    });

    expect(getByLabelText('3')).toBeChecked;
});

test('A wine can be added', () => {
    const nameOfWine = 'Lovely Summer Red';
    const valueOfWine = '14.99';
    const handleAddWine = jest.fn();
    const { getByText } = render(<AddWine addWine={handleAddWine} />);

    fireEvent.change(screen.getByLabelText('Name'), {
        target: { value: nameOfWine},
    });

    fireEvent.change(screen.getByLabelText('Price'), {
        target: { value: valueOfWine},
    });


    getByText('Add wine').click();

    expect(handleAddWine).toHaveBeenCalled();
    expect(handleAddWine).toHaveBeenCalledWith({
        key: '',
        name: nameOfWine,
        price: valueOfWine,
        type: 'red',
        rating: 1,
        image: ''
    });
})