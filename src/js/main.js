document.addEventListener("DOMContentLoaded", async function () {
  // 위치와 날짜 정보 가져오기
  const latitude = localStorage.getItem("latitude");
  const longitude = localStorage.getItem("longitude");
  const date = localStorage.getItem("date");

  if (!latitude || !longitude || !date) {
    alert("위치나 날짜 정보를 가져오지 못했습니다.");
    return;
  }

  // API 호출
  // 1. 멘트 가져오기
  // 2. 현재 시간대에 맞는 temperature 가져오기. (이것도 setInterval로 시간대에 맞는 temperature로 세팅해야겠다.)

  try {
    // const response = await fetch(
    //   `http://ec2-43-202-60-140.ap-northeast-2.compute.amazonaws.com:8080/weather?latitude=${latitude}&longitude=${longitude}&date=${date}`
    // );
    // if (!response.ok) {
    //   throw new Error(`API 호출 실패: ${response.statusText}`);
    // }
    // const weatherData = response.json();
    // console.log("Weather data:", weatherData);

    console.log("lat", latitude, "longitude", longitude);
    const temperature = 20;
    localStorage.setItem("temperature", temperature);
    console.log("temperature", localStorage.getItem("temperature"));

    const ment = "오늘 날씨가 어쩌구 저쩌구";
    localStorage.setItem("ment", ment);
    console.log("ment", localStorage.getItem("ment"));

    // weatherData를 사용하여 페이지 초기화
    // 예를 들어, 날씨 정보를 화면에 표시하기
    // const weatherElement = document.getElementById("weather");
    // weatherElement.textContent = `Temperature: ${weatherData.temperature}, Condition: ${weatherData.condition}`;

    // 나머지 페이지 로드
    loadElements();
  } catch (error) {
    console.error("API 호출 중 오류 발생:", error);
    alert("API 호출 중 오류가 발생했습니다.");
  }
});

function loadElements() {
  // HTML 요소를 비동기적으로 로드
  $(function () {
    $("#navbar").load("Nav.html");
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
