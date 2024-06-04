settingSayUser();
loadCodimapContent();

function settingSayUser() {
  const sayUserElement = document.querySelector("#sayUser");
  const nameTag = sayUserElement.querySelector("#name");
  const mentTag = sayUserElement.querySelector("#ment");

  const weatherBanner = localStorage.getItem("weatherBanner");
  const userName = localStorage.getItem("name");

  nameTag.textContent = `${userName}님,`;
  mentTag.textContent = weatherBanner;
}

async function loadCodimapContent() {
  const gender = localStorage.getItem("gender");
  const concept = JSON.parse(localStorage.getItem("concept"));
  const temperature = localStorage.getItem("temperature");

  if (!gender || !concept || !temperature) {
    console.error("필수 정보가 없습니다.");
    return;
  }

  const conceptParams = concept.map((c) => `concept=${c}`).join("&");
  const apiUrl = `http://ec2-43-202-60-140.ap-northeast-2.compute.amazonaws.com:8080/clother/codimap?gender=${gender}&${conceptParams}&temperature=${temperature}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`Codimap API 호출 실패: ${response.statusText}`);
    }
    const codimapData = await response.json();

    updateCodimapContent(codimapData);
    addSliderEvent();
  } catch (error) {
    console.error("codimapData API 호출 중 오류 발생:", error);
  }
}

function updateCodimapContent(data) {
  const codimapSlider = document.querySelector(".codimapSlider");
  codimapSlider.innerHTML = ""; // 기존의 내용 삭제

  const child = ["hot", "normal", "cold"];

  for (const key in data) {
    if (Object.hasOwnProperty.call(data, key)) {
      const item = data[key];
      const codiGroup = document.createElement("div");
      codiGroup.classList.add("codiGroup");

      for (const temp of child) {
        const imgSrc = item[temp];
        const codiItem = document.createElement("div");
        codiItem.classList.add("codiItem");
        codiItem.id = temp;

        const imgDiv = document.createElement("div");
        imgDiv.classList.add("img");

        if (imgSrc) {
          const img = document.createElement("img");
          img.src = imgSrc;
          imgDiv.appendChild(img);
        }

        codiItem.appendChild(imgDiv);

        if (temp === "hot" || temp === "cold") {
          const buttonDiv = document.createElement("div");
          buttonDiv.classList.add("Button");
          buttonDiv.id = temp;

          const emojiDiv = document.createElement("div");
          emojiDiv.textContent = temp === "hot" ? "🥵" : "🥶";
          const textDiv = document.createElement("div");
          textDiv.textContent =
            temp === "hot" ? "더위를 많이타요" : "추위를 많이타요";

          buttonDiv.appendChild(emojiDiv);
          buttonDiv.appendChild(textDiv);

          codiItem.appendChild(buttonDiv);
        }

        codiGroup.appendChild(codiItem);
      }
      codimapSlider.appendChild(codiGroup);
    }
  }
}

function addSliderEvent() {
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
    const offset = currentIndex * sliderShow.offsetWidth;
    codimapSlider.style.transform = `translateX(-${offset}px)`;
  }
}
