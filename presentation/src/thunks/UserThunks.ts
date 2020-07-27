import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { fetchUserGenderStats } from '../services/requests/UserGenderStatsRequest';
import { RootState } from '../store/index';
import { userGenderStats } from '../store/user/UserActions';

export const setGenderStats = (): ThunkAction<void, RootState, null, Action<string>> => async (dispatch) => {
    const tempData: any = await fetchUserGenderStats();

    const genderStats = tempData.map((element: any) => {
        return {
            name: element.value,
            value: element.count,
        }
    })

    dispatch(userGenderStats(genderStats));
};


