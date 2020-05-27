/* eslint-disable */
const fetch = require("node-fetch");
const host = process.env.BACKEND_HOST || "http://localhost:9000";
const url = `${host}/.netlify/functions/item-definitions`;

const handleGet = async (event, context) => {
  const showDeleted = event.queryStringParameters["show-deleted"];
  const response = await fetch(`${url}?show-deleted=${showDeleted}`, {
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
};

const handlePost = async (event, context) => {
  const response = await fetch(url, {
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: event.body,
    method: "POST",
  });
  if (!response.ok) {
    return { statusCode: response.status, body: JSON.stringify(response.body) };
  }
  const data = await response.json();
  const { definition } = data;
  return {
    statusCode: 201,
    body: JSON.stringify({ definition }),
  };
};

const handleDelete = async (event, context) => {
  const { id } = JSON.parse(event.body);
  console.log(id);
  const response = await fetch(`${url}/${id}`, { method: "DELETE" });
  if (!response.ok) {
    return { statusCode: response.status, body: JSON.stringify(response.body) };
  }
  return {
    statusCode: 200,
    body: JSON.stringify({}),
  };
};

exports.handler = async function (event, context) {
  try {
    switch (event.httpMethod) {
      case "GET":
        return await handleGet(event, context);
        break;
      case "POST":
        return await handlePost(event, context);
        break;
      case "DELETE":
        return await handleDelete(event, context);
        break;
      default:
        return {
          statusCode: 405,
          body: JSON.stringify({ msg: "unsupported method" }),
        };
    }
  } catch (err) {
    console.log(err); // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }), // Could be a custom message or object i.e. JSON.stringify(err)
    };
  }
};
