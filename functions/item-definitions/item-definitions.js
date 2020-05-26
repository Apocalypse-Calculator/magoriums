/* eslint-disable */
const fetch = require("node-fetch");
const host = process.env.BACKEND_HOST || "http://localhost:9000";
const url = `${host}/.netlify/functions/item-definitions`;

exports.handler = async function (event, context) {
  try {
    const response = await fetch(url, {
      headers: { Accept: "application/json" },
    });
    if (!response.ok) {
      // NOT res.status >= 200 && res.status < 300
      return { statusCode: response.status, body: response.body };
    }
    const data = await response.json();
    const { definitions } = data;

    return {
      statusCode: 200,
      body: JSON.stringify({ definitions }),
    };
  } catch (err) {
    console.log(err); // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }), // Could be a custom message or object i.e. JSON.stringify(err)
    };
  }
};
