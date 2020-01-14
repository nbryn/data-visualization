import axios from "axios";

export const fetchFromServer = async (method, data) => {
  const url = "/graphql";

  let response;

  try {
    response = await axios({
      url: url,
      method: method,
      data: {
        query: data
      }
    });

    return response;
  } catch (err) {
    console.log(err);
  }
};
