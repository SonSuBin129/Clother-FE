document.addEventListener("DOMContentLoaded", async function () {
  // 이전 NowHours 값 저장
  let previousNowHours = Number(localStorage.getItem("NowHours"));


  // 날씨 API 호출
  // 1. 멘트 가져오기
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

async function updateWeather() {
  // 위치와 날짜 정보 가져오기
  const latitude = localStorage.getItem("latitude");
  const longitude = localStorage.getItem("longitude");
  const date = localStorage.getItem("date");

  if (!latitude || !longitude || !date) {
    alert("위치나 날짜 정보를 가져오지 못했습니다.");
    return;
  }

  try {
    const response = await fetch(
      `http://ec2-43-202-60-140.ap-northeast-2.compute.amazonaws.com:8080/weather?latitude=${latitude}&&longitude=${longitude}&date=${date}`
    );
    if (!response.ok) {
      throw new Error(`API 호출 실패: ${response.statusText}`);
    }

    const responseData = await response.json();
    const weatherBanner = responseData.weatherBanner;
    const weatherData = responseData.weatherData;

    // 날씨 배너
    localStorage.setItem("weatherBanner", weatherBanner);
    // 날씨 데이터는 해당 날짜의 24시간 데이터를 가져옴.
    localStorage.setItem("weatherData", weatherData);

    // 현재 시간 기반으로 데이터 가져오기(tmp 가져오기)
    const timeIndex = Number(localStorage.getItem("NowHours"));
    const temperature = weatherData[timeIndex].tmp;
    localStorage.setItem("temperature", temperature);
    
    // 현재 날씨 아이콘 업데이트
    const currentsky = weatherData[timeIndex].sky;
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
      localStorage.setItem("hourlytmp"+index, item.tmp);
      localStorage.setItem("hourlysky"+index, item.sky);
    });

    // 온도 범위 업데이트
    const temperatures = weatherData.map(item => item.tmp);
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
