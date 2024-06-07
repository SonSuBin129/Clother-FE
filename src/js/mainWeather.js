function updateWeatherInfo() {
  //현재 지역 업데이트
  document.querySelector("#location-name").textContent =
    localStorage.getItem("location");

  // 현재 시간 업데이트
  document.querySelector("#current-time").textContent =
    localStorage.getItem("currentTime");

  // 현재 온도 업데이트
  document.querySelector("#current-temp").textContent =
    localStorage.getItem("temperature") + "°C";

  // 현재 날씨 아이콘 업데이트
  const currentSky = localStorage.getItem("currentSky");
  document.querySelector("#current-icon").src = getSkyIcon(currentSky);

  // 오전 날씨 업데이트
  const morningSky = localStorage.getItem("morningSky");
  document.querySelector("#morning-icon").src = getSkyIcon(morningSky);

  const morningPop = localStorage.getItem("morningPop");
  document.querySelector(
    "#morning-precipitation"
  ).textContent = `${morningPop}%`;

  // 오후 날씨 업데이트
  const afternoonSky = localStorage.getItem("afternoonSky");
  document.querySelector("#afternoon-icon").src = getSkyIcon(afternoonSky);

  const afternoonPop = localStorage.getItem("afternoonPop");
  document.querySelector(
    "#afternoon-precipitation"
  ).textContent = `${afternoonPop}%`;

  // 온도 범위 업데이트
  const tmn = localStorage.getItem("tmn");
  const tmx = localStorage.getItem("tmx");
  document.querySelector(
    "#temperature-range"
  ).innerHTML = `${tmn}°/ <span style="color:red">${tmx}°</span>`;

  // 시간대별 날씨 업데이트
  const hourlyForecastContainer = document.querySelector("#hourly-forecast");
  hourlyForecastContainer.innerHTML = ""; // 기존 내용을 지움

  for (let i = 0; i < 24; i++) {
    const tmp = localStorage.getItem("hourlytmp" + i);
    const sky = localStorage.getItem("hourlysky" + i);
    const hour = localStorage.getItem("hours");
    const hourly = ("0" + (hour + i)).slice(-2);
    const forecastDiv = document.createElement("div");
    forecastDiv.classList.add("hourly-forecast-item");
    forecastDiv.innerHTML = `
      <div>${hourly}시</div>
      <img src="${getSkyIcon(sky)}" alt="${hour}시 날씨">
      <div>${tmp}°C</div>
    `;
    hourlyForecastContainer.appendChild(forecastDiv);
  }
}

function getSkyIcon(sky) {
  switch (sky) {
    case 1:
      return "./src/img/clear.svg";
    case 3:
      return "./src/img/cloudy.svg";
    case 4:
      return "./src/img/cloudy.svg";
    default:
      return "./src/img/clear.svg";
  }
}

function loadScript(src) {
  const script = document.createElement("script");
  script.src = src;
  script.async = true;
  document.head.appendChild(script);
}

function formSubmitHandler() {
  const searchForm = document.querySelector(".search-container");

  searchForm.addEventListener("submit", async function (event) {
    event.preventDefault(); // 폼 제출 기본 동작 방지

    const locationInput = document.getElementById("location-input").value;
    if (!locationInput) {
      alert("지역명을 입력해주세요.");
      return;
    }

    const API_KEY = "AIzaSyBiQlmQrR2mnHOv-W_6TJbPmg0NTrtlKSI";
    const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      locationInput
    )}&key=${API_KEY}&language=ko`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data.status === "OK" && data.results.length > 0) {
        const result = data.results[0];
        const latitude = result.geometry.location.lat;
        const longitude = result.geometry.location.lng;

        // 위도와 경도 로컬 스토리지에 저장
        localStorage.setItem("latitude", latitude);
        localStorage.setItem("longitude", longitude);

        console.log(`위도: ${latitude}, 경도: ${longitude}`);

        //화면 새로고침
        location.reload(true);

        // 이후 추가 작업 수행 가능
      } else {
        console.error("Geocoding 결과를 찾을 수 없습니다.");
        alert("Geocoding 결과를 찾을 수 없습니다.");
      }
    } catch (error) {
      console.error("Geocoding API 호출 중 오류 발생:", error);
      alert("Geocoding API 호출 중 오류가 발생했습니다.");
    }
  });
}

updateWeatherInfo();
formSubmitHandler();
