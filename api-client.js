// ** VARIABELEN ** //
const baseUrl = "http://localhost:3000/"; // locatie van de database/API

// ** POST DATA ** //
const postTodo = async (body) => {
  try {
    await fetch(baseUrl, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log(error);
  }
};

// ** GET DATA ** //
const getTodo = async () => {
  try {
    const res = await fetch(baseUrl, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    return await res.json();
  } catch (error) {
    console.log(error);
  }
};

// ** DELETE DATA ** //
const delTodo = async (itemId) => {
  const idUrl = `${baseUrl}${itemId}`;
  try {
    await fetch(idUrl, {
      method: "DELETE",
    });
  } catch (error) {
    console.log(error);
  }
};

// ** PUT DATA ** //
const putTodo = async (body, itemId) => {
  try {
    const idUrl = `${baseUrl}${itemId}`;
    await fetch(idUrl, {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log(error);
  }
};
