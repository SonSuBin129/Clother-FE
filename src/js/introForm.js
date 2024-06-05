// 위치 정보를 가져왔는지 여부를 나타내는 플래그
let locationRetrieved = false;

function onGeoOk(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  localStorage.setItem("latitude", lat);
  localStorage.setItem("longitude", lon);
  locationRetrieved = true; // 위치 정보를 성공적으로 가져왔음
}

function onGeoError() {
  alert("Can't find you.");
  locationRetrieved = false; // 위치 정보를 가져오지 못함
}

function getDate() {
  //백에 넘겨줄 날짜 20240601 이런식으로 보내주기
  const date = new Date();

  // 년, 월, 일 가져오기
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");

  // "YYYYMMDD" 형식으로 변환
  const formattedDate = `${year}${month}${day}`;

  // 다음 날짜 계산하기
  const nextDateObj = new Date(date);
  nextDateObj.setDate(date.getDate() + 1);
  const nextYear = nextDateObj.getFullYear();
  const nextMonth = (nextDateObj.getMonth() + 1).toString().padStart(2, "0");
  const nextDay = nextDateObj.getDate().toString().padStart(2, "0");

  const nextFormattedDate = `${nextYear}${nextMonth}${nextDay}`;

  // format 오늘날짜(todayDate), 내일날짜(nextDate), 서버에 보낼 날짜(date) 로컬 스토리지에 저장
  // 서버에 보낼 default는 현재 date로 설정
  localStorage.setItem("date", formattedDate);
  localStorage.setItem("todayDate", formattedDate);
  localStorage.setItem("nextDate", nextFormattedDate);
}

document.addEventListener("DOMContentLoaded", function () {
  const genderCheckboxes = document.querySelectorAll(
    '#gender input[type="checkbox"]'
  );
  const styleCheckboxes = document.querySelectorAll(
    '#style input[type="checkbox"]'
  );
  const nameInput = document.querySelector("#nameInput");
  const readyButton = document.querySelector("#readyButton");

  // Geolocation API 사용
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
  } else {
    alert("Geolocation을 지원하지 않는 브라우저입니다.");
    locationRetrieved = false; // Geolocation을 지원하지 않음
  }

  getDate();

  // 성별 checkboxes: 한개만 선택 가능하게 함.
  genderCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
      if (this.checked) {
        genderCheckboxes.forEach((otherCheckbox) => {
          if (otherCheckbox !== this) {
            otherCheckbox.checked = false;
          }
        });
      }
    });
  });

  // 스타일 checkboxes: 최대 3개만 선택하게 함.
  styleCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
      const checkedCheckboxes = Array.from(styleCheckboxes).filter(
        (cb) => cb.checked
      );
      if (checkedCheckboxes.length > 3) {
        // 3개를 넘어가서 선택하는 경우 에러 처리
        this.checked = false;
        alert("최대 3개의 스타일만 선택할 수 있습니다.");
      }
    });
  });

  readyButton.addEventListener("click", function () {
    // 위치 정보를 가져왔는지 확인
    if (!locationRetrieved) {
      alert("위치 정보를 가져오지 못했습니다. 조금만 기다려주세요.");
      return;
    }

    // 성별 받아오기
    let selectedGender = null;
    genderCheckboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        selectedGender = checkbox.value;
      }
    });

    //성별 선택 안 했을때 알림창
    if (selectedGender === null) {
      alert("성별을 선택해야 합니다.");
      return;
    }

    // 사용자가 만약 이름을 입력하지 않았다면, "사용자"로 입력
    let name = nameInput.value.trim();
    if (name === "") {
      name = "사용자";
    }

    // 선택한 스타일 확인
    const selectedStyles = Array.from(styleCheckboxes)
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) => checkbox.value);

    // style 최소 한개 이상 선택했는지 확인
    if (selectedStyles.length === 0) {
      alert("최소 하나의 스타일을 선택해야 합니다.");
      return;
    }

    // Save data to localStorage
    localStorage.setItem("gender", selectedGender);
    localStorage.setItem("name", name);
    localStorage.setItem("concept", JSON.stringify(selectedStyles));

    // 메인 페이지로 이동
    window.location.href = "main.html";
  });
});
