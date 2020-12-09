
// Start with first item
let counter = 0;

// Load 6 items at a time
const QUANTITY_START = 6; 
const QUANTITY_TO_ADD_ON_SCROLL = 3; 

let isListEmpty = true;
let removed = [];
let areMoreItems = true;

const HIDE_ANIMATION_DURATION_OPACITY = 1500

document.addEventListener('DOMContentLoaded', () => {

  // SETTING LISTENERS:
  window.onscroll = () => {
    if (areMoreItems && isScrolledToBottom()){
      const scroll = window.onscroll;
      window.onscroll = "none";
      load(QUANTITY_TO_ADD_ON_SCROLL);
      setTimeout(() => {
        window.onscroll = scroll;
      }, 1000);
    } 
  }

  deleteItemListener();
  confirmDeleteButtonListener();
  // END OF SETTING LISTENERS

  load(QUANTITY_START);
})

function confirmDeleteButtonListener() {
  const confirm_button = document.querySelector(".confirm-delete-button");
  confirm_button.addEventListener("click", () => {
    confirm_button.value = removed.join();
  })
}

function deleteItemListener() {
  document.querySelector(".main").addEventListener("click", function(event) {
    if(event.target.nodeName === "I") {

      const itemElement = event.target.parentElement.parentElement;
      const item_id = itemElement.querySelector('.id').innerHTML;
      removed.push(item_id);

      itemElement.style.animationPlayState = 'running';
      // itemElement.addEventList;

      document.querySelector(".confirm-delete-button").disabled = false;
    }
  });
}

function isScrolledToBottom() {
  return window.innerHeight + window.scrollY >= document.body.offsetHeight
}

function load(quantity) {

  const start = counter;
  const end = start + quantity - 1;
  counter = end + 1;

  fetch(`itemslist?start=${start}&end=${end}`)
  .then(response => response.json())
  .then(data => {
    if (data.itemslist.length > 0) {
      isListEmpty = false;
      data.itemslist.forEach(addItem);
    } else {
      areMoreItems = false;
      if (isListEmpty) {
        addEmptyListInfo();
      }
    }
  });
}

function addEmptyListInfo() {
  const item = document.createElement('section');
  item.className = "empty-list";
  item.innerText = "Your list is empty";
  document.querySelector('.main-items').append(item)
}

function addItem(item) {
  const itemNode = document.createElement('section');
  itemNode.className = "todo-item";
  itemNode.innerHTML =     
    `<p hidden class="id">${item.id}</p>
    <div name="delete-button" value="${item.id}" class="x-wrapper">
      <i class="far fa-times-circle"></i>
    </div>
    <h2 name="name" class="todo-item-name">${item.name}</h2>
    <label for="details">Details:</label>
    <p class="details" name="details">${item.details}</p>
    <p class="date">Deadline: ${item.date}</p>`;
  document.querySelector('.main-items').append(itemNode);
};
