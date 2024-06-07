function getHours() {
  //시간대 구하기
  const date = new Date();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const currentTime = `${hours}:${minutes}`;

  //현재 시간대 로컬 스토리지에 저장
  localStorage.setItem("NowHours", hours);
  localStorage.setItem("currentTime", currentTime);
}

getHours();
setInterval(getHours, 10 * 60 * 1000);
