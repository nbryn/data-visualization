import * as redux from 'react-redux';
import React from 'react';

import {render, screen} from '../../../test-utils';
import MeetingView from '../MatchView';

const mockUpdateMeetingView = jest.fn();
const mockDispatch = jest.fn(() => mockUpdateMeetingView());

jest.spyOn(redux, 'useDispatch').mockImplementation().mockReturnValue(mockDispatch);

const totalMeetings = 'Total Meetings';
const meetingsLastMonth = 'Meetings Last Month';

afterEach(() => {
   jest.clearAllMocks();
});

describe('MeetingView.test.jsx', () => {
   describe('calls the correct functions', () => {
      it('calls dispatch on mount', () => {
         render(<MeetingView />);

         expect(mockDispatch).toHaveBeenCalled();
      });
      it('calls updateMeetingView on mount', () => {
         render(<MeetingView />);

         expect(mockUpdateMeetingView).toHaveBeenCalled();
      });
   });
   describe('renders the correct text', () => {
      it(`renders the text ${totalMeetings}`, () => {});
      render(<MeetingView />);

      expect(screen.getAllByText(totalMeetings)).toBeTruthy();
   });
   it(`renders the text ${meetingsLastMonth}`, () => {
      render(<MeetingView />);

      expect(screen.getAllByText(meetingsLastMonth)).toBeTruthy();
   });
});
