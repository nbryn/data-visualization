import { fetchFromServer } from '../Fetch';
import { LastYearDto } from '../Dto';

export const fetchGroupsLastYear = async (): Promise<LastYearDto[]> => {
    const data = `query{
      groupStats{
        groupsLastYear{
          year
          month
          count
          }
      }
    }`;

    const response: LastYearDto[] = await fetchFromServer<LastYearDto[]>(
        'groupStats',
        data,
        'groupsLastYear'
    );

    return response;
};
