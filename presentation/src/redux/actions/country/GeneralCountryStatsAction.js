import { GENERAL_COUNTRY_STATS } from "../ActionTypes";
import { fetchFromServer } from "../Fetch";

export const fetchGeneralCountryStats = () => async (dispatch) => {
    const data = `query {
        generalCountryStats {
          groupsCountry {
            name
            count
          }
          usersCountry{
            name
            count
          }
          meetingsCountry {
            name
            count
          }
        }
      }`;
  
    const response = await fetchFromServer("post", data);
  
    dispatch({
      type: GENERAL_COUNTRY_STATS,
      payload: response.data.data.generalCountryStats,
    });
  };