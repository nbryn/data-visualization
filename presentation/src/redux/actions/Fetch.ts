import axios, { AxiosResponse } from "axios";

export async function fetchFromServer<T>(
  action: string,
  data: string
): Promise<T> {
  const url = "/graphql";

  let response = null;

  try {
    response = await axios({
      url: url,
      method: "post",
      data: {
        query: data,
      },
    });
  } catch (err) {
    console.log(err);
  }

  return responseAssembler(response, action);
}

function responseAssembler<T>(result: AxiosResponse | null, action: string): T {
  // if (!result || result.status !== 200) {
  //   throwValidationFailed('', 'NO_DATA');
  // }

  const data = result!.data.data[action];
  // if (data.result) {
  //   throw new ValidationResult(data.result);
  // }

  return data;
}