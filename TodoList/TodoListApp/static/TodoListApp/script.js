
// Start with first item
let counter = 0;

// Load 3 items at a time
const QUANTITY_TO_ADD_ON_SCROLL = 3;

var isListEmpty;
var removed = [];
var areMoreItems = true;
var enabledActions = true;

const HIDE_ANIMATION_DURATION_OPACITY = 1500
const HIDE_ANIMATION_DURATION_ALL = 2000;

document.addEventListener('DOMContentLoaded', () => {

  setTimeout(() => { 
    window.scroll(0, 0)

    // SETTING LISTENERS:
    deleteItemListener()

    window.onresize = () => {
      const resizeWindow = window.onresize
      window.onresize = "none"
      if (areMoreItems && enabledActions && checkIfIsFreeHeight()) {
        const quantity = getQuantityOfItemsToAdd()
        load(quantity);
      }
      setTimeout(() => {
        window.onresize = resizeWindow
      }, 3000);
    }
    
    window.onscroll = () => {
      if (areMoreItems && enabledActions && isScrolledToBottom()) load(QUANTITY_TO_ADD_ON_SCROLL);
      else if (checkIfIsFreeHeight()) {
        const scroll = window.onscroll;
        window.onscroll = "none";
        load(getQuantityOfItemsToAdd())
        setTimeout(() => {
          window.onscroll = scroll
        }, 3000);
      } 
    };

    confirmDeleteButtonListener()
    // END OF SETTING LISTENERS

    load(QUANTITY_TO_ADD_ON_SCROLL)
    setTimeout(() => {
      if (checkIfIsFreeHeight()){
        load(getQuantityOfItemsToAdd())
      }
    }, 2000);
  }, 100);
})

function confirmDeleteButtonListener() {
  const confirm_button = document.querySelector(".confirm-delete-button")
  confirm_button.addEventListener("click", () => {
    if (removed.length <= 0) console.error("Length of array 'removed' must be greater than 0")
    confirm_button.value = removed.join();
  })
}

function isScrolledToBottom() {
  return window.innerHeight + window.scrollY >= document.body.offsetHeight
}

function parseInt10(string) {
  return parseInt(string, 10);
}

function getComputedStyles(className) {
  const element = document.querySelector(`.${className}`);
  return window.getComputedStyle(element);
}

function getOuterHeight(className) {
  const elementStyles = getComputedStyles(className);
  const elementHeight = parseInt10(elementStyles.height);
  const elementMarginTop = parseInt10(elementStyles.marginTop);
  const elementMarginBottom = parseInt10(elementStyles.marginBottom);
  return elementHeight + elementMarginTop + elementMarginBottom;
}

function getHeightOfOtherElements() {
  const containerStyles = getComputedStyles("container");
  const containerPadding = parseInt10(containerStyles.padding);
  const containerMargin = parseInt10(containerStyles.margin);
  const headerOuterHeight = getOuterHeight("header");
  return 2 * containerPadding + 2 * containerMargin + headerOuterHeight;
}

// function getBodyMinOuterHeight() {
//   const containerStyles = getComputedStyles("container");
//   const containerMinHeight = parseInt(containerStyles.minHeight, 10);
//   return containerMinHeight + 2 * parseInt(containerStyles.margin, 10);
// }

// function hasBodyMinHeight() {
//   return document.body.offsetHeight === getBodyMinOuterHeight();
// }

function getHeightOfAllElements(className) {
  const elements = document.querySelectorAll(`.${className}`);
  const heightOfElement = getOuterHeight(className);
  return elements.length * heightOfElement;
}

function checkIfIsFreeHeight() {
  return window.innerHeight - getHeightOfOtherElements() - getHeightOfAllElements("todo-item") > 0
}

function checkIfIsFreeHeightAfterRemove() {
  return window.innerHeight - getHeightOfOtherElements() - getHeightOfAllElements("todo-item") + getOuterHeight("todo-item") > 0
}

function getFreeHeight() {
  return window.innerHeight - getHeightOfOtherElements() - getHeightOfAllElements("todo-item")
}

function getQuantityOfItemsToAdd() {
  return Math.ceil(getFreeHeight() / getOuterHeight("todo-item"))
}

function getTodoItemQuantity() {
  return document.querySelector(".main-items").childElementCount
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
      areMoreItems = false
      if (isListEmpty) {
        addEmptyListInfo();
      }
    }
  });
}

function addEmptyListInfo() {
  const item = document.createElement('section');
  item.className = "empty-list";
  document.querySelector('.main-items').innerText = "Your list is empty";
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
    <p class="date">${item.date}</p>`;
  document.querySelector('.main-items').append(itemNode);
};

function disableXClick() {
  for (item of document.querySelectorAll(".x-wrapper")) {
    item.style.pointerEvents = 'none';
  }
  enabledActions = false;
}

function enableXClick() {
  for (item of document.querySelectorAll(".x-wrapper")) {
    item.style.pointerEvents = 'auto';
  }
  enabledActions = true;
}

function getItemElement(clickEvent) {
  return clickEvent.target.parentElement.parentElement;
}

function appendIdToDelete(itemElement) {
  const item_id = itemElement.querySelector('.id').innerHTML;
  removed.push(item_id);
}

function deleteItemListener() {
  document.querySelector(".main").addEventListener("click", function(event) {
    if(event.target.nodeName === "I") {

      const itemElement = getItemElement(event)
      appendIdToDelete(itemElement);

      itemElement.style.animationPlayState = 'running';
      // itemElement.addEventList;

      disableXClick()

      if (areMoreItems && checkIfIsFreeHeightAfterRemove()) {
        load(1);
      }

      setTimeout(() => {
        itemElement.innerHTML = '';
        document.querySelector(".confirm-delete-button").disabled = false;
      }, HIDE_ANIMATION_DURATION_OPACITY);

      setTimeout(() => {
        itemElement.remove();
        enableXClick()
      }, HIDE_ANIMATION_DURATION_ALL);
    }
  });
}
