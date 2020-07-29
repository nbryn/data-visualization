import { fetchFromServer } from '../Fetch';

export const fetchGroupData = async (): Promise<any> => {
    const data = `query{
      groupStats{
        groupTotal
        groupSize{
          value
          count
        }
        groupsLastMonth{
            count
            day{
              year
              month
              day
            }
        }
        groupsLastYear{
          year
          month
          count
          }
      }
    }`;

    const response = await fetchFromServer('groupStats', data);

    return response;
};
