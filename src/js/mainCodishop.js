const LoadingExplain = document.querySelector("#LoadingExplain");
const codiImgGroup = document.querySelector("#codiImgGroup");

codiImgGroup.style.display = "none";
LoadingExplain.style.display = "flex";

export async function loadCodishopContent() {
  const gender = localStorage.getItem("gender");
  const concept = JSON.parse(localStorage.getItem("concept"));
  const temperature = localStorage.getItem("temperature");

  if (!gender || !concept || !temperature) {
    console.error("필수 정보가 없습니다.");
    return;
  }

  const conceptParams = concept.map((c) => `concept=${c}`).join("&");
  const apiUrl = `http://ec2-43-202-60-140.ap-northeast-2.compute.amazonaws.com:8080/clother/codishop?gender=${gender}&${conceptParams}&temperature=${temperature}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`Codishop API 호출 실패: ${response.statusText}`);
    }
    const codishopData = await response.json();

    updateCodishopContent(codishopData);
    codiImgGroup.style.display = "flex";
    LoadingExplain.style.display = "none";
  } catch (error) {
    console.error("Codishop API 호출 중 오류 발생:", error);
  }
}

function updateCodishopContent(data) {
  const codiImgElements = document.querySelectorAll(".codiImg");

  codiImgElements.forEach((element, index) => {
    const item = data[index + 1];
    if (item) {
      const img = element.querySelector("img");
      const link = element.querySelector("a");

      if (img) img.src = item.imageLink;
      if (link) link.href = item.musinsaPage;
    }
  });
}
