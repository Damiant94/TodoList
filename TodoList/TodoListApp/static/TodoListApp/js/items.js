// Start with first item
let counter = 0;

// Load 6 items at start
const QUANTITY_START = 6;

// Load 3 items on scroll down
const QUANTITY_TO_ADD_ON_SCROLL = 3;

const itemsIdsToBeRemoved = [];
let areMoreItems = true;

document.addEventListener("DOMContentLoaded", () => {
  load(QUANTITY_START);

  addScrollDownListener();
  addDeleteItemListener();
  addConfirmDeleteButtonListener();
});

function load(quantity) {
  const start = counter;
  const end = start + quantity - 1;
  counter = end + 1;

  fetch(`itemslist?start=${start}&end=${end}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.itemslist.length > 0) {
        data.itemslist.forEach(addItem);
      } else {
        areMoreItems = false;
        if (start === 0) {
          addEmptyListInfo();
        }
      }
    });
}

function addEmptyListInfo() {
  const itemNode = document.createElement("section");
  itemNode.className = "empty-list";
  itemNode.innerText = "Your list is empty";
  document.querySelector(".main-items").append(itemNode);
}

function addItem(item) {
  const itemNode = document.createElement("section");
  itemNode.className = "todo-item";
  itemNode.innerHTML = `<p hidden class="id">${item.id}</p>
    <div name="delete-button" value="${item.id}" class="x-wrapper">
      <i class="far fa-times-circle delete-icon"></i>
    </div>
    <h2 name="name" class="todo-item-name">${item.name}</h2>
    <label for="details">Details:</label>
    <p class="details" name="details">${item.details}</p>
    <p class="date">Deadline: ${item.date}</p>`;
  document.querySelector(".main-items").append(itemNode);
}

function addScrollDownListener() {
  window.addEventListener("scroll", () => {
    if (areMoreItems && isScrolledToBottom()) {
      const scroll = window.onscroll;
      window.onscroll = "none";
      load(QUANTITY_TO_ADD_ON_SCROLL);
      setTimeout(() => {
        window.onscroll = scroll;
      }, 1000);
    }
  });
}

function addDeleteItemListener() {
  document.querySelector(".main").addEventListener("click", function (event) {
    if (event.target.matches(".delete-icon")) {
      const itemElement = event.target.closest("section");
      const itemId = itemElement.querySelector(".id").innerHTML;
      itemsIdsToBeRemoved.push(itemId);

      itemElement.style.animationPlayState = "running";
      // itemElement.addEventList;

      document.querySelector(".confirm-delete-button").disabled = false;
    }
  });
}

function addConfirmDeleteButtonListener() {
  const confirmButton = document.querySelector(".confirm-delete-button");
  confirmButton.addEventListener("click", () => {
    confirmButton.value = itemsIdsToBeRemoved.join();
  });
}

function isScrolledToBottom() {
  return window.innerHeight + window.scrollY >= document.body.offsetHeight;
}
