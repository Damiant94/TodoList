const leftInfo = {
  node: document.querySelector(".left-info"),
  anotherNode: document.querySelector(".right-info"),
  info: [
    "Create your own tasks!",
    "Scroll down to load more...",
    "Have all tasks saved in database...",
    "Watch loading animation while waiting!",
    "Keep an eye on actual date and time!",
  ],
};

const rightInfo = {
  node: document.querySelector(".right-info"),
  anotherNode: document.querySelector(".left-info"),
  info: [
    "Add, and delete them!",
    "...or click the button!",
    "...with user authentication system!",
    "Watch fade out animation after removing!",
    "Use on PC or Mobile!",
  ],
};


function displayInfo(side) {
  let i = 0;
  setInterval(() => {
    side.node.innerText = side.info[i];
    side.anotherNode.innerText = "";
    ++i;
    if (i > 4) i = 0;
  }, 8000);
}

displayInfo(leftInfo);
setTimeout(() => {
  displayInfo(rightInfo);
}, 4000);

