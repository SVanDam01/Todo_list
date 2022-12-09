// ** VARIABELEN ** //
const input = document.getElementById("input"); // betreft de search-bar
const button = document.getElementById("addButton"); // betreft de submit button
const todoList = document.getElementById("todoList"); // de ul waar alle item in komen

// Functie - Leeghalen todo lijst //
const clearList = () => {
  todoList.innerHTML = "";
};

// ** DISPLAY DATA ** //
const setTodo = async () => {
  clearList();
  const data = await getTodo();
  data.forEach((item) => {
    const li = document.createElement("li");
    li.id = item._id; // het unieke id koppelen aan de li
    const liContent = document.createElement("textarea");
    liContent.className = "text-field";
    liContent.value = item.description;
    const img = document.createElement("img");
    img.src = "trash-bin.png";
    img.alt =
      "trash can icons - trash can icons created by IYAHICON - Flaticon";
    img.className = "bin";
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.name = "done";
    checkbox.className = "checkbox";
    const status = item.done;
    if (status === true) {
      checkbox.checked = true;
      liContent.className = "text-field done";
    } else {
      checkbox.checked = false;
    }
    todoList.append(li);
    li.appendChild(checkbox);
    li.appendChild(liContent);
    li.appendChild(img);
  });
  const checkboxes = document.getElementsByClassName("checkbox");
  const bins = document.getElementsByClassName("bin");
  const textfields = document.getElementsByClassName("text-field");
  itemDone(checkboxes);
  deleteTodo(bins);
  updateItem(textfields);
};

// ** ADD DATA ** //
const addTodo = () => {
  button.addEventListener("click", () => {
    const data = input.value;
    if (data !== "") {
      const body = { description: data, done: false };
      postTodo(body);
      input.value = "";
      setTodo();
    } else {
      alert("Geef een beschrijving mee!");
    }
  });
};

// ** DELETE DATA ** //
const deleteTodo = (bins) => {
  Array.from(bins).forEach((bin) => {
    bin.addEventListener("click", (e) => {
      const item = e.target.parentElement;
      const itemId = item.id;
      delTodo(itemId);
      item.parentNode.removeChild(item);
    });
  });
};

// ** UPDATE STATUS DONE ** //
const itemDone = (checkboxes) => {
  Array.from(checkboxes).forEach((checkbox) => {
    checkbox.addEventListener("click", (e) => {
      const textItem = e.target.nextElementSibling;
      const item = e.target.parentElement;
      const itemId = item.id;
      textItem.classList.toggle("done");
      if (textItem.classList[1] === "done") {
        let body = { done: true };
        putTodo(body, itemId);
      } else {
        const body = { done: false };
        putTodo(body, itemId);
      }
    });
  });
};

// ** UPDATE TEXT-ITEM ** //
const updateItem = (textfields) => {
  Array.from(textfields).forEach((textfield) => {
    textfield.addEventListener("change", (e) => {
      const item = e.target.parentElement;
      const itemId = item.id;
      const itemValue = e.target.value;
      const body = { description: itemValue };
      putTodo(body, itemId);
    });
  });
};

// ** SETUP ** //
document.addEventListener("DOMContentLoaded", () => {
  addTodo();
  setTodo();
});
