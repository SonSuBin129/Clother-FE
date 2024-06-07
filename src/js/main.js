document.addEventListener("DOMContentLoaded", async function () {
  // 이전 NowHours 값 저장
  let previousNowHours = Number(localStorage.getItem("NowHours"));

  //위치 가져오기
  getAddress();

  // 날씨 API 호출
  updateWeather();

  setInterval(checkNowHoursAndUpdate, 60 * 1000); // 1분마다 확인

  async function checkNowHoursAndUpdate() {
    const currentNowHours = Number(localStorage.getItem("NowHours"));
    if (currentNowHours !== previousNowHours) {
      // NowHours가 변경된 경우에만 업데이트
      updateWeather();
      previousNowHours = currentNowHours; // 이전 NowHours 업데이트
    }
  }
});

//위치(위도, 경도) -> 주소 가져오기
async function getAddress() {
  const latitude = localStorage.getItem("latitude");
  const longitude = localStorage.getItem("longitude");

  const API_KEY = "AIzaSyBiQlmQrR2mnHOv-W_6TJbPmg0NTrtlKSI";

  const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${API_KEY}&language=ko`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    const result = data.results[0];

    const location = result.formatted_address;

    //위치정보 저장
    localStorage.setItem("location", location);
  } catch (error) {
    console.log(error);
  }
}

async function updateWeather() {
  // 위치와 날짜 정보 가져오기
  const latitude = localStorage.getItem("latitude");
  const longitude = localStorage.getItem("longitude");
  const date = localStorage.getItem("date");
  const nextDate = localStorage.getItem("nextDate");

  if (!latitude || !longitude || !date || !nextDate) {
    alert("위치나 날짜 정보를 가져오지 못했습니다.");
    return;
  }

  try {
    const apiUrl = `http://ec2-43-202-60-140.ap-northeast-2.compute.amazonaws.com:8080/weather?latitude=${latitude}&longitude=${longitude}&date=${date}`;
    console.log(apiUrl);
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`API 호출 실패: ${response.statusText}`);
    }

    const responseData = await response.json();
    const weatherBanner = responseData.weatherBanner;
    const weatherData = responseData.weatherData;

    const nextapiUrl = `http://ec2-43-202-60-140.ap-northeast-2.compute.amazonaws.com:8080/weather?latitude=${latitude}&longitude=${longitude}&date=${nextDate}`;
    console.log(nextapiUrl);
    const nextResponse = await fetch(nextapiUrl);

    if (!nextResponse.ok) {
      throw new Error(`다음 날 API 호출 실패: ${nextResponse.statusText}`);
    }

    const nextresponseData = await nextResponse.json();
    const nextweatherBanner = nextresponseData.weatherBanner;
    const nextweatherData = nextresponseData.weatherData;

    // 날씨 배너
    localStorage.setItem("weatherBanner", weatherBanner);
    localStorage.setItem("nextweatherBanner", nextweatherBanner);

    // 날씨 데이터는 해당 날짜의 24시간 데이터를 가져옴.
    localStorage.setItem("weatherData", JSON.stringify(weatherData));
    localStorage.setItem("nextweatherData", JSON.stringify(nextweatherData));

    // 현재 시간 기반으로 데이터 가져오기(tmp 가져오기)
    const timeIndex = Number(localStorage.getItem("NowHours"));
    const temperature = weatherData[timeIndex].tmp;
    localStorage.setItem("temperature", temperature);

    // 현재 날씨 아이콘 업데이트
    const currentsky = weatherData[timeIndex].sky;
    if (timeIndex >= 0 && timeIndex <= 6 || timeIndex >= 18 && timeIndex <= 23) {
      currentsky = 2;
    }
    localStorage.setItem("currentSky", currentsky);

    // 오전 날씨 업데이트
    const morningSky = weatherData[9].sky;
    localStorage.setItem("morningSky", morningSky);

    const morningPop = weatherData[9].pop;
    localStorage.setItem("morningPop", morningPop);

    // 오후 날씨 업데이트
    const afternoonSky = weatherData[15].sky;
    localStorage.setItem("afternoonSky", afternoonSky);

    const afternoonPop = weatherData[15].pop;
    localStorage.setItem("afternoonPop", afternoonPop);

    // 시간대별 날씨 업데이트
    weatherData.forEach((item, index) => {
      const skyValue = (index >= 0 && index <= 6) || (index >= 18 && index <= 23) ? 2 : item.sky;
      localStorage.setItem("hourlytmp" + index, item.tmp);
      localStorage.setItem("hourlysky" + index, skyValue);
    });
    
    nextweatherData.forEach((item, index) => {
      const hourIndex = index + 24;
      const skyValue = (hourIndex >= 24 && hourIndex <= 30) || (hourIndex >= 42 && hourIndex <= 47) ? 2 : item.sky;
      localStorage.setItem("hourlytmp" + hourIndex, item.tmp);
      localStorage.setItem("hourlysky" + hourIndex, skyValue);
    });
    

    // 온도 범위 업데이트
    const temperatures = weatherData.map((item) => item.tmp);
    const tmx = Math.max(...temperatures);
    const tmn = Math.min(...temperatures);
    localStorage.setItem("tmx", tmx);
    localStorage.setItem("tmn", tmn);

    // HTML 요소 로드
    loadElements();
  } catch (error) {
    console.error("API 호출 중 오류 발생:", error);
    alert("API 호출 중 오류가 발생했습니다.");
  }
}


function loadElements() {
  // HTML 요소를 비동기적으로 로드
  $(function () {
    $("#weather").load("Weather.html");
  });

  $(function () {
    $("#codimap").load("Codimap.html");
  });

  $(function () {
    $("#codishop").load("Codishop.html");
  });
}
