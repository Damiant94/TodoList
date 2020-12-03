
// document.querySelector(".main-items").addEventListener("click", function(e) {
//   if(e.target && e.target.nodeName === "I") {
//     e.target.parentElement.parentElement.style.display = "none";
//    }
// })



// Start with first item
let counter = 1;

// Load posts 3 items at a time
const quantity = 3;

// When DOM loads, render the first 3 items
document.addEventListener('DOMContentLoaded', load);
var empty = true;

// If scrolled to bottom, load the next 3 items
window.onscroll = () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      load();
  }
};

// Load next set of items
function load() {
  delete_item_listener();

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
    <div class="x-wrapper">
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
  document.querySelector(".main-items").addEventListener("click", function(e) {
    if(e.target && e.target.nodeName === "I") {
      const itemElement = e.target.parentElement.parentElement;

      const item_id = itemElement.querySelector('.id').innerHTML;

      itemElement.style.animationPlayState = 'running';
      itemElement.addEventList;

      setTimeout(() => {
        itemElement.innerHTML = '';
      }, 1500);

      setTimeout(() => {
        itemElement.remove();
      }, 2000)



      // e.target.parentElement.parentElement.style.display = "none";
    }
  });
}
