const userName = localStorage.getItem("name");
const sayUserElement = document.querySelector("#sayUser");

if (userName && sayUserElement) {
  const ment = localStorage.getItem("ment");
  sayUserElement.textContent = `${userName}! ${ment}`; // 사용자 환영 메시지 설정
}

const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const codimapSlider = document.querySelector(".codimapSlider");
const sliderShow = document.getElementById("sliderShow");

let currentIndex = 0;
const totalCodiGroups = document.querySelectorAll(".codiGroup").length;

prevButton.addEventListener("click", () => {
  currentIndex = Math.max(currentIndex - 1, 0);
  //   currentIndex =
  //     currentIndex - 1 == -1 ? totalCodiGroups - 1 : currentIndex - 1;
  updateSliderPosition();
});

nextButton.addEventListener("click", () => {
  currentIndex = Math.min(currentIndex + 1, totalCodiGroups - 1);
  //currentIndex = (currentIndex + 1) % totalCodiGroups;
  updateSliderPosition();
});

function updateSliderPosition() {
  const offset = -currentIndex * sliderShow.offsetWidth;
  codimapSlider.style.transform = `translateX(${offset}px)`;
}
