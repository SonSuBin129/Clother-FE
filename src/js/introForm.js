document.addEventListener("DOMContentLoaded", function () {
  const genderCheckboxes = document.querySelectorAll(
    '#gender input[type="checkbox"]'
  );
  const styleCheckboxes = document.querySelectorAll(
    '#style input[type="checkbox"]'
  );

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
    // 성별 받아오기
    let selectedGender = null;
    genderCheckboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        selectedGender = checkbox.value;
      }
    });

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
    localStorage.setItem("style", JSON.stringify(selectedStyles));

    // 메인 페이지로 이동
    window.location.href = "main.html";
  });
});
