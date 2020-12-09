

if (document.title === "Login" && "firstVisit" in localStorage) {
  deleteLoader();
} else if (document.title === "Login") {
  localStorage.firstVisit = false;
  addClassLoadedToBody();
} else {
  addClassLoadedToBody();
}

function deleteLoader() {
  document.querySelector("#loader-wrapper").remove();
}

function addClassLoadedToBody(){
  document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
      document.body.className = "loaded";
    }, 1000);
  })
}






