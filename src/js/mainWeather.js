function test() {
  document.querySelector("#temperature").textContent =
    localStorage.getItem("temperature");
}

test();
