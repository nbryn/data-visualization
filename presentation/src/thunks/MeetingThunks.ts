import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { fetchTotalMeetings } from '../services/requests/MeetingsTotalRequest';
import { RootState } from '../store/index';
import { meetingsTotal } from '../store/meeting/MeetingActions';

export const setTotalMeetings = (): ThunkAction<
  void,
  RootState,
  null,
  Action<string>
> => async (dispatch) => {
  const totalMeetings: number = await fetchTotalMeetings();

  dispatch(meetingsTotal(totalMeetings));
};
