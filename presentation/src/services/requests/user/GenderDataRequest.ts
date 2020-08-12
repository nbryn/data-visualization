import { fetchFromServer } from '../Fetch';
import { ServerDto } from '../Dto';

export const fetchUserGenderData = async (): Promise<ServerDto[]> => {
    const data = `query {
      userStats{
        userGenderStats{
          name
          count
        }
      }
    }`;

    const response: ServerDto[] = await fetchFromServer<ServerDto[]>(
        'userStats',
        data,
        'userGenderStats'
    );

    return response;
};
