import React from 'react';
import AddWine from './AddWine';
import {render} from '@testing-library/react';
import App from '../App';

test('A new wine can be added', () => {
    const { getByText } = render(<AddWine />);
});