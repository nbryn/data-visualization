import { GENERAL_COUNTRY_STATS } from "../ActionTypes.ts";
import { fetchFromServer } from "../Fetch.ts";

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
  
    const response = await fetchFromServer("generalCountryStats", data);
  
    dispatch({
      type: GENERAL_COUNTRY_STATS,
      payload: response,
    });
  };