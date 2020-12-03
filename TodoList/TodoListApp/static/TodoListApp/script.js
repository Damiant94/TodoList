
// document.querySelector(".x-wrapper").addEventListener(
//   "click", () => {
//     this.parent.style.display = "none";
//     console.log("cos")
//   }
// )

// Start with first post
let counter = 1;

// Load posts 20 at a time
const quantity = 3;

// When DOM loads, render the first 20 posts
document.addEventListener('DOMContentLoaded', load);
var empty = true;

// If scrolled to bottom, load the next 20 posts
window.onscroll = () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      load();
  }
};

// Load next set of posts
function load() {

  // Set start and end post numbers, and update counter

  const start = counter;
  const end = start + quantity - 1;
  counter = end + 1;

  // Get new posts and add posts
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

// Add a new post with given contents to DOM
function add_message_empty() {
  const item = document.createElement('section');
  item.className = "empty-list";
  document.querySelector('.main-items').innerHTML = "Your list is empty";
}

function add_item(content) {

  // Create new post
  const item = document.createElement('section');
  item.className = "todo-item";
  item.innerHTML =     
    `<div class="x-wrapper">
      <i class="far fa-times-circle"></i>
    </div>
    <h2 name="name" class="todo-item-name">${content.name}</h2>
    <label for="details">Details:</label>
    <p class="details" name="details">${content.details}</p>
    <p class="date">${content.date}</p>`;

  // Add post to DOM
  document.querySelector('.main-items').append(item);
};