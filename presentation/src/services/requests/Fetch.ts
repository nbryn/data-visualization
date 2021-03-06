import axios, {AxiosResponse} from 'axios';

import Error from '../../util/Error';

export async function fetchFromServer<T>(action: string, data: string, dataType?: string): Promise<T> {
   let response = null;

   try {
      response = await axios({
         url: '/graphql',
         method: 'post',
         data: {
            query: data,
         },
      });
   } catch (err) {
      console.log(err);
   }

   return responseAssembler<T>(response, action, dataType);
}

function responseAssembler<T>(result: AxiosResponse | null, action: string, dataType?: string): T {
   const data = dataType ? result!.data.data[action][dataType] : result!.data.data[action];

   if (data.errorMessage) {
      throw new Error(data.errorMessage);
   }

   return data;
}
