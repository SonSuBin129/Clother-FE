const style = `

#mainWeather {
    background-image: linear-gradient(to bottom, #1e1e1e, #2e2e2e);
    background-size: 100%, 40%, 50%, 20%, cover;
    background-repeat: no-repeat;
    animation: animater 20s 4s ease-out infinite alternate;
}

.rain-drop {
    --size: 2px;
    --length: 89px;
    width: var(--size);
    height: var(--length);
    background: linear-gradient(to bottom, rgba(173, 216, 230, 0.8), rgba(173, 216, 230, 0));
    position: absolute;
    top: -100px;
    opacity: 0.6;
    animation: rainfall 0.6s linear infinite;
}

@keyframes rainfall {
    0% {
        transform: translateY(-100px);
    }
    100% {
        transform: translateY(100vh);
    }
}
`;

const createRain = () => {
  const mainWeather = document.getElementById("mainWeather");
  const mainWeatherWidth = mainWeather.offsetWidth;
  const mainWeatherHeight = mainWeather.offsetHeight;

  for (let i = 1; i <= 208; i++) {
    // 비 개수 조정
    const dropLeft = randRange(0, mainWeatherWidth);
    const dropTop = randRange(-mainWeatherHeight, 0);

    const drop = document.createElement("div");
    drop.className = "rain-drop";
    drop.style.left = `${dropLeft}px`;
    drop.style.top = `${dropTop}px`;

    mainWeather.appendChild(drop); // mainWeather 안에 추가
  }
};

const randRange = (minNum, maxNum) => {
  return Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
};

const createRainfall = () => {
  const styleTag = document.createElement("style");
  styleTag.innerHTML = style;
  document.head.appendChild(styleTag);
  createRain();
};

createRainfall();
