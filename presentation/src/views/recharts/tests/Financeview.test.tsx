import * as redux from 'react-redux';
import React from 'react';

import {render, screen} from '../../../test-utils';
import FinanceView from '../FinanceView';

const mockUpdateFinanceView = jest.fn();
const mockDispatch = jest.fn(() => mockUpdateFinanceView());

const spy = jest.spyOn(redux, 'useDispatch').mockImplementation().mockReturnValue(mockDispatch);

const totalLoans = 'Total Loans';
const etbOnLoan = 'ETB On Loan';

afterEach(() => {
    jest.clearAllMocks();
});

describe('FinanceView.test.jsx', () => {
    describe('calls the correct functions', () => {
        it('calls dispatch on mount', () => {
            render(<FinanceView />);

            expect(mockDispatch).toHaveBeenCalled();
        });
        it('calls updateFinanceView on mount', () => {
            render(<FinanceView />);

            expect(mockUpdateFinanceView).toHaveBeenCalled();
        });
    });
    describe('renders the correct text', () => {
        it(`renders the text ${totalLoans}`, () => {});
        render(<FinanceView />);

        expect(screen.getAllByText(totalLoans)).toBeTruthy();
    });
    it(`renders the text ${etbOnLoan}`, () => {
        render(<FinanceView />);

        expect(screen.getAllByText(etbOnLoan)).toBeTruthy();
    });
});
