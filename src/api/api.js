const base = `/.netlify/functions/item-definitions`;

export const fetchItemDeinitions = async () => {
  const options = {
    method: "GET",
  };
  const response = await fetch(base, options);
  if (response && response.ok) {
    const data = await response.json();
    const { definitions } = data;
    return definitions || [];
  }
  return [];
};

export const createItemDefinition = async (body) => {
  const options = {
    method: "POST",
    body: JSON.stringify(body),
  };

  const response = await fetch(base, options);
  console.log(response);
};

export const deleteItemDefinition = async (id) => {
  const options = {
    method: "DELETE",
    body: JSON.stringify({ id }),
  };
  const response = await fetch(`${base}/${id}`, options);
};
