import { fetchFromServer } from '../Fetch';
import { GroupViewDto } from './GroupViewDto';

export const fetchGroupViewData = async (): Promise<GroupViewDto> => {
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

    const response: GroupViewDto = await fetchFromServer<GroupViewDto>('groupStats', data);

    return response;
};
