const sideNav = document.getElementById("side-nav-container");
const menuButton = document.getElementById("menu-button");
const content = document.querySelector("content");
const menuItems = document.querySelector("#side-nav>ul");
let mediaQuery = window.matchMedia("(min-width: 768px)");

function openSideNav() {
  //   sideNav.style.display = "flex";
  sideNav.style.minWidth = "250px";
  sideNav.style.maxWidth = "250px";
  menuItems.style.display = "block";
}

function closeSideNav() {
  //   sideNav.style.display = "none";
  sideNav.style.minWidth = "0px";
  sideNav.style.maxWidth = "0px";
  content.style.marginLeft = "20px";
  menuItems.style.display = "none";
}

menuButton.addEventListener("click", function (e) {
  if (sideNav.style.minWidth == "0px") {
    openSideNav();
  } else {
    closeSideNav();
  }
});

if (mediaQuery.matches) {
  sideNav.style.minWidth = "250px";
  sideNav.style.maxWidth = "250px";
  menuItems.style.display = "block";
} else {
  sideNav.style.minWidth = "0px";
  sideNav.style.maxWidth = "0px";
  content.style.marginLeft = "20px";
  menuItems.style.display = "none";
}
