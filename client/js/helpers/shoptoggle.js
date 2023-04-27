// Shop animations

const teamworks_btn = document.getElementById("teamworks_btn");
const languages_btn = document.getElementById("languages_btn");
languages_btn.classList.add("is-active");

const teamworks = document.getElementById("teamworks");
const languages = document.getElementById("languages");

teamworks_btn.addEventListener("click", () => {
  languages_btn.classList.remove("is-active");
  teamworks_btn.classList.add("is-active");
  languages.style.display = "none";
  languages_btn.style.backgroundColor = "var(--third-color)";
  languages_btn.style.width = "35%";
  teamworks_btn.style.width = "65%";
  teamworks.style.display = "block";
  teamworks_btn.style.backgroundColor = "var(--flash-color)";
});

languages_btn.addEventListener("click", () => {
  languages_btn.classList.add("is-active");
  teamworks_btn.classList.remove("is-active");
  teamworks.style.display = "none";
  teamworks_btn.style.backgroundColor = "var(--third-color)";
  teamworks_btn.style.width = "35%";
  languages_btn.style.width = "65%";
  languages.style.display = "block";
  languages_btn.style.backgroundColor = "var(--flash-color)";
});
