import * as redux from 'react-redux';
import React from 'react';

import {render, screen} from '../../../test-utils';
import FinanceView from '../FinanceView';

const mockUpdateFinanceView = jest.fn();
const mockDispatch = jest.fn(() => mockUpdateFinanceView());

jest.spyOn(redux, 'useDispatch').mockImplementation().mockReturnValue(mockDispatch);

const totalEvents = 'Total Events';
const etbPerEvent = 'ETB Per Event';

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
      it(`renders the text ${totalEvents}`, () => {
         render(<FinanceView />);

         expect(screen.getAllByText(totalEvents)).toBeTruthy();
      });
   });
   it(`renders the text ${etbPerEvent}`, () => {
      render(<FinanceView />);

      expect(screen.getAllByText(etbPerEvent)).toBeTruthy();
   });
});
