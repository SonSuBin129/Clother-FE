function updateWeatherInfo() {

  // 현재 시간 업데이트
  document.querySelector("#current-time").textContent = 
  localStorage.getItem("NowHours") + ":00";

  // 현재 온도 업데이트
  document.querySelector("#current-temp").textContent =
  localStorage.getItem("temperature")  + "°C";

  // 현재 날씨 아이콘 업데이트
  const currentSky = localStorage.getItem("currentSky");
  document.querySelector("#current-icon").src = getSkyIcon(currentSky);

  // 오전 날씨 업데이트
  const morningSky = localStorage.getItem("morningSky");
  document.querySelector("#morning-icon").src = getSkyIcon(morningSky);
    
  const morningPop = localStorage.getItem("morningPop");
  document.querySelector("#morning-precipitation").textContent = `${morningPop}%`;

  // 오후 날씨 업데이트
  const afternoonSky = localStorage.getItem("afternoonSky");
  document.querySelector("#afternoon-icon").src = getSkyIcon(afternoonSky);
    
  const afternoonPop = localStorage.getItem("afternoonPop");
  document.querySelector("#afternoon-precipitation").textContent = `${afternoonPop}%`;

  // 온도 범위 업데이트
  const tmn = localStorage.getItem("tmn");
  const tmx = localStorage.getItem("tmx");
  document.querySelector("#temperature-range").innerHTML = `${tmn}°/ <span style="color:red">${tmx}°</span>`;

  // 시간대별 날씨 업데이트
  const hourlyForecastContainer = document.querySelector("#hourly-forecast");
  hourlyForecastContainer.innerHTML = ''; // 기존 내용을 지움

  for (let i = 0; i < 24; i++) {
    const tmp = localStorage.getItem("hourlytmp" + i);
    const sky = localStorage.getItem("hourlysky" + i);
    const hour = localStorage.getItem("hours");
    const hourly = ('0' + ((hour+i))).slice(-2);
    const forecastDiv = document.createElement('div');
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
      return './src/img/clear.svg';
    case 3:
      return './src/img/cloudy.svg';
    case 4:
      return './src/img/cloudy.svg';
    default:
      return './src/img/clear.svg';
  }
}


function loadScript(src) {
  const script = document.createElement('script');
  script.src = src;
  script.async = true;
  document.head.appendChild(script);
}


updateWeatherInfo();
