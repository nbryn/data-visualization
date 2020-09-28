import * as redux from 'react-redux';
import React from 'react';

import {render, screen} from '../../../test-utils';
import MainView from '../MainView';

const mockUpdateMainView = jest.fn();
const mockDispatch = jest.fn(() => mockUpdateMainView());

jest.spyOn(redux, 'useDispatch').mockImplementation().mockReturnValue(mockDispatch);

afterEach(() => {
   jest.clearAllMocks();
});

const totalUsers = 'Total Users';
const teamsLastMonth = 'Teams Last Month';

describe('MainView.test.jsx', () => {
   describe('calls the correct functions', () => {
      it('calls dispatch on mount', () => {
         render(<MainView />);

         expect(mockDispatch).toHaveBeenCalled();
      });
      it('calls updateMainView on mount', () => {
         render(<MainView />);

         expect(mockUpdateMainView).toHaveBeenCalled();
      });
   });
   describe('renders the correct text', () => {
      it(`renders the text ${totalUsers}`, () => {
         render(<MainView />);

         expect(screen.getAllByText(totalUsers)).toBeTruthy();
      });
   });
   it(`renders the text ${teamsLastMonth}`, () => {
      render(<MainView />);

      expect(screen.getAllByText(teamsLastMonth)).toBeTruthy();
   });
});
