export const fetchItemDeinitions = async () => {
  const options = {
    method: "GET",
  };
  const response = await fetch(`/.netlify/functions/item-definitions`, options);
  console.log(response);
  if (response && response.ok) {
    const data = await response.json();
    const { definitions } = data;
    return definitions || [];
  }
  return [];
};
