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

// // default로 today 설정
// activateNavItem(todayItem);
const nowDate = localStorage.getItem("date");
if (nowDate === localStorage.getItem("todayDate")) {
  activateNavItem(todayItem);
} else {
  activateNavItem(tomorrowItem);
}

todayItem.addEventListener("click", () => {
  activateNavItem(todayItem);
  // 서버에 보낼 날짜 변경
  const todayDate = localStorage.getItem("todayDate");
  localStorage.setItem("date", todayDate);

  //화면 새로고침
  location.reload(true);
});
tomorrowItem.addEventListener("click", () => {
  activateNavItem(tomorrowItem);
  const nextDate = localStorage.getItem("nextDate");
  localStorage.setItem("date", nextDate);

  //화면 새로고침
  location.reload(true);
});
