
// Start with first item
let counter = 0;

// Load posts 3 items at a time
var quantity = 3;

// When DOM loads, render the first 3 items
document.addEventListener('DOMContentLoaded', load(quantity));
var empty = true;
var removed = [];
delete_item_listener();


// If scrolled to bottom, load the next 3 items
window.onscroll = () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
    load(quantity);
  }
};

// Load next set of items
function load(quantity) {

  // Set start and end item numbers, and update counter
  const start = counter;
  const end = start + quantity - 1;
  counter = end + 1;

  // Get new items and add items
  fetch(`itemslist?start=${start}&end=${end}`)
  .then(response => response.json())
  .then(data => {
    if (data.itemslist.length > 0) {
      empty = false;
      data.itemslist.forEach(add_item);
    } else {
      if (empty) {
        add_message_empty();
      }
    }
  })
};

// Add a new item with given contents to DOM
function add_message_empty() {
  const item = document.createElement('section');
  item.className = "empty-list";
  document.querySelector('.main-items').innerHTML = "Your list is empty";
}

function add_item(content) {

  // Create new item
  const item = document.createElement('section');
  item.className = "todo-item";
  item.innerHTML =     
    `<p hidden class="id">${content.id}</p>
    <div name="delete-button" value="${content.id}" class="x-wrapper">
      <i class="far fa-times-circle"></i>
    </div>
    <h2 name="name" class="todo-item-name">${content.name}</h2>
    <label for="details">Details:</label>
    <p class="details" name="details">${content.details}</p>
    <p class="date">${content.date}</p>`;

  // Add item to DOM
  document.querySelector('.main-items').append(item);
};

function delete_item_listener() {
  document.querySelector(".main").addEventListener("click", function(e) {
    if(e.target && e.target.nodeName === "I") {
      const itemElement = e.target.parentElement.parentElement;

      const item_id = itemElement.querySelector('.id').innerHTML;
      removed.push(item_id);

      itemElement.style.animationPlayState = 'running';
      itemElement.addEventList;

      for (item of document.querySelectorAll(".x-wrapper")) {
        item.style.pointerEvents = 'none';
      }

      setTimeout(() => {
        let todoitemsLen = document.querySelector(".main-items").querySelectorAll(".todo-item").length
        if (todoitemsLen === 3) {
          load(1);
        };
      }, 0);

      setTimeout(() => {
        itemElement.innerHTML = '';
        document.querySelector(".confirm-delete-button").disabled = false;
      }, 1500);

      setTimeout(() => {
        itemElement.remove();
      }, 2000);

      setTimeout(() => {
        for (item of document.querySelectorAll(".x-wrapper")) {
          item.style.pointerEvents = 'auto';
        }
      }, 2000);
    }
    

    let confirm_button = document.querySelector(".confirm-delete-button")
    if (removed.length > 0){
      confirm_button.value = removed.join();
    }
  });
}
