document.querySelector("#gotoIntro").onclick = function () {
  window.location.replace("index.html");
};

const todayItem = document.querySelector("#today");
const tomorrowItem = document.querySelector("#tomorrow");

function activateNavItem(activeItem) {
  document.querySelectorAll(".NavItem").forEach((item) => {
    item.classList.remove("active");
  });
  activeItem.classList.add("active");
}

// default로 today 설정
activateNavItem(todayItem);

todayItem.addEventListener("click", () => activateNavItem(todayItem));
tomorrowItem.addEventListener("click", () => activateNavItem(tomorrowItem));
