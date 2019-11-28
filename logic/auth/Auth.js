const axios = require("axios");

function setTokenInHeader(context) {
  const token = context.token.substring(
    7,
    context.token.length
  );

  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

module.exports = { setTokenInHeader };
