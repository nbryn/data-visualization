import * as redux from 'react-redux';
import React from 'react';

import {render, screen} from '../../../test-utils';
import MatchView from '../MatchView';

const mockUpdateMatchView = jest.fn();
const mockDispatch = jest.fn(() => mockUpdateMatchView());

jest.spyOn(redux, 'useDispatch').mockImplementation().mockReturnValue(mockDispatch);

afterEach(() => {
   jest.clearAllMocks();
});

const totalMatches = 'Total Matches';
const matches = 'Matches Last Month';

describe('MatchView.test.jsx', () => {
   describe('calls the correct functions', () => {
      it('calls dispatch on mount', () => {
         render(<MatchView />);

         expect(mockDispatch).toHaveBeenCalled();
      });
      it('calls updateMatchView on mount', () => {
         render(<MatchView />);

         expect(mockUpdateMatchView).toHaveBeenCalled();
      });
   });
   describe('renders the correct text', () => {
      it(`renders the text ${totalMatches}`, () => {
         render(<MatchView />);

         expect(screen.getAllByText(totalMatches)).toBeTruthy();
      });
   });
   it(`renders the text ${matches}`, () => {
      render(<MatchView />);

      expect(screen.getAllByText(matches)).toBeTruthy();
   });
});
