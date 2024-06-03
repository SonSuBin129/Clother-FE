document.addEventListener("DOMContentLoaded", async function () {
  // 날씨 API 호출
  // 1. 멘트 가져오기
  updateWeather();

  // 날씨 업데이트 주기 설정 (예: 10분마다)
  setInterval(updateWeather, 10 * 60 * 1000); // 10분마다 업데이트
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

    const weatherData = await response.json();

    // 현재 시간 기반으로 데이터 가져오기(tmp 가져오기)

    // 1. 시간대 구하기
    const hours = new Date().getHours().toString().padStart(2, "0");

    const timeIndex = Number(hours);
    const temperature = weatherData[timeIndex].tmp;
    localStorage.setItem("temperature", temperature);

    const ment = "오늘 날씨가 어쩌구 저쩌구";
    localStorage.setItem("ment", ment);
    console.log("ment", localStorage.getItem("ment"));

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
    $("#navbar").load("Nav.html");
  });

  $(function () {
    $("#weather").load("Weather.html");
  });

  $(function () {
    $("#codimap").load("Codimap.html");
  });

  $(function () {
    $("#codishop").load("Codishop.html");
  });

  $(function () {
    $("#footer").load("Footer.html");
  });
}
