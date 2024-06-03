function check() {
  const codiExplain = document.querySelector("#codiExplain").textContent;
  console.log(codiExplain);
  const gender = localStorage.getItem("gender");
  const concept = JSON.parse(localStorage.getItem("concept"));
  const temperature = localStorage.getItem("temperature");
  console.log("dhodhodhod");
}

check();
