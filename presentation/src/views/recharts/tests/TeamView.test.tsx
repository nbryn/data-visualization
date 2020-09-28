import * as redux from 'react-redux';
import React from 'react';

import {render, screen} from '../../../test-utils';
import TeamView from '../TeamView';

const mockUpdateTeamView = jest.fn();
const mockDispatch = jest.fn(() => mockUpdateTeamView());

jest.spyOn(redux, 'useDispatch').mockImplementation().mockReturnValue(mockDispatch);

const totalTeams = 'Total Teams';
const teamPerCountry = 'Teams Per Country';

afterEach(() => {
   jest.clearAllMocks();
});

describe('TeamView.test.jsx', () => {
   describe('calls the correct functions', () => {
      it('calls dispatch on mount', () => {
         render(<TeamView />);

         expect(mockDispatch).toHaveBeenCalled();
      });
      it('calls updateTeamView on mount', () => {
         render(<TeamView />);

         expect(mockUpdateTeamView).toHaveBeenCalled();
      });
   });
   describe('renders the correct text', () => {
      it(`renders the text ${totalTeams}`, () => {
         render(<TeamView />);

         expect(screen.getAllByText(totalTeams)).toBeTruthy();
      });
   });
   it(`renders the text ${teamPerCountry}`, () => {
      render(<TeamView />);

      expect(screen.getAllByText(teamPerCountry)).toBeTruthy();
   });
});
