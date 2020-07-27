import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { fetchTotalShares } from '../services/requests/SharesTotalRequest';
import { RootState } from '../store/index';
import { sharesTotal } from '../store/finance/FinanceActions';

export const setTotalShares = (): ThunkAction<
  void,
  RootState,
  null,
  Action<string>
> => async (dispatch) => {
  const totalShares: number = await fetchTotalShares();

  dispatch(sharesTotal(totalShares));
};
