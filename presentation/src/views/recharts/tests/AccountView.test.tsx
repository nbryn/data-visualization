import * as redux from 'react-redux';
import React from 'react';

import {render, screen} from '../../../test-utils';
import AccountView from '../AccountView';

const mockUpdateAccountView = jest.fn();
const mockDispatch = jest.fn(() => mockUpdateAccountView());

jest.spyOn(redux, 'useDispatch').mockImplementation().mockReturnValue(mockDispatch);

const totalEvents = 'Total Events';
const dollarPerEvent = 'Dollars Per Event';

afterEach(() => {
   jest.clearAllMocks();
});

describe('AccountView.test.jsx', () => {
   describe('calls the correct functions', () => {
      it('calls dispatch on mount', () => {
         render(<AccountView />);

         expect(mockDispatch).toHaveBeenCalled();
      });
      it('calls updateAccountView on mount', () => {
         render(<AccountView />);

         expect(mockUpdateAccountView).toHaveBeenCalled();
      });
   });
   describe('renders the correct text', () => {
      it(`renders the text ${totalEvents}`, () => {
         render(<AccountView />);

         expect(screen.getAllByText(totalEvents)).toBeTruthy();
      });
   });
   it(`renders the text ${dollarPerEvent}`, () => {
      render(<AccountView />);

      expect(screen.getAllByText(dollarPerEvent)).toBeTruthy();
   });
});
