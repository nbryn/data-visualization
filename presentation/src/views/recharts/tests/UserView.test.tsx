import * as redux from 'react-redux';
import React from 'react';

import {render, screen} from '../../../test-utils';
import UserView from '../UserView';

const mockUpdateUserView = jest.fn();
const mockDispatch = jest.fn(() => mockUpdateUserView());

jest.spyOn(redux, 'useDispatch').mockImplementation().mockReturnValue(mockDispatch);

const usersPerCountry = 'Users Per Country';
const usersPerDay = 'Users Per Day';

afterEach(() => {
    jest.clearAllMocks();
});

describe('UserView.test.jsx', () => {
    describe('calls the correct functions', () => {
        it('calls dispatch on mount', () => {
            render(<UserView />);

            expect(mockDispatch).toHaveBeenCalled();
        });
        it('calls updateUserView on mount', () => {
            render(<UserView />);

            expect(mockUpdateUserView).toHaveBeenCalled();
        });
    });
    describe('renders the correct text', () => {
        it(`renders the text ${usersPerCountry}`, () => {});
        render(<UserView />);

        expect(screen.getAllByText(usersPerCountry)).toBeTruthy();
    });
    it(`renders the text ${usersPerDay}`, () => {
        render(<UserView />);

        expect(screen.getAllByText(usersPerDay)).toBeTruthy();
    });
});
