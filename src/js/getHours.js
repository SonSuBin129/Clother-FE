function getHours() {
  //시간대 구하기
  const date = new Date();
  const hours = date.getHours().toString().padStart(2, "0");

  const formatHours = `${hours}00`;

  //현재 시간대 로컬 스토리지에 저장
  localStorage.setItem("NowHours", formatHours);
}

//10분 기준으로 계속 현재 시간대 업데이트하게 수정
setInterval(getHours, 10 * 60 * 1000);
