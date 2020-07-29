import { fetchFromServer } from '../Fetch';

export const fetchGroupsLastMonth = async (): Promise<any> => {
    const data = `query{
      groupStats{  
        groupsLastMonth{
            count
            day{
              year
              month
              day
            }
          }
        }
    }`;

    const response = await fetchFromServer(
        'groupStats',
        data,
        'groupsLastMonth'
    );

    return response;
};
