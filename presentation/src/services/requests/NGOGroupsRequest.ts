import { fetchFromServer } from '../../redux/actions/Fetch';

export const fetchGroupsPerNGO = async (): Promise<any> => {
    const data = `query {
        ngoStats {
          groupsNGO {
            name
            count
          }
        }
      }`;

    const response = await fetchFromServer("ngoStats", data, 'groupsNGO');

    return response;

}