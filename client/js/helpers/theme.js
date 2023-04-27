// Theme management : on each of the for buttons, display the right color theme and store it in local storage

const page = document.getElementById("html");
let currentClass = "main-theme";

document.getElementById("oclock-theme").addEventListener("click", () => {
  page.classList.remove(currentClass);
  page.classList.add("oclock-theme");
  currentClass = "oclock-theme";
  localStorage.setItem("theme", currentClass);
});

document.getElementById("light-theme").addEventListener("click", () => {
  page.classList.remove(currentClass);
  page.classList.add("light-theme");
  currentClass = "light-theme";
  localStorage.setItem("theme", currentClass);
});

document.getElementById("dark-theme").addEventListener("click", () => {
  page.classList.remove(currentClass);
  page.classList.add("dark-theme");
  currentClass = "dark-theme";
  localStorage.setItem("theme", currentClass);
});

document.getElementById("main-theme").addEventListener("click", () => {
  page.classList.remove(currentClass);
  page.classList.add("main-theme");
  currentClass = "main-theme";
  localStorage.setItem("theme", currentClass);
});

const themeInit = {
  handleThemeValue() {
    if (localStorage.getItem("theme")) {
      currentClass = localStorage.getItem("theme");
      page.classList.remove("main-theme");
      page.classList.add(currentClass);
    }
  },
};
