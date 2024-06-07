const style = `
html, body {
    padding: 0;
    margin: 0;
    width: 100%;
    height: 100%;
}

body {
    background-image: linear-gradient(to bottom, #1e1e1e, #2e2e2e);
    background-size: 100%, 40%, 50%, 20%, cover;
    background-repeat: no-repeat;
    animation: animater 20s 4s ease-out infinite alternate;
    min-height: 100vh;
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
    for (let i = 1; i <= 208; i++) { // 비 개수 조정
        const dropLeft = randRange(0, 1600);
        const dropTop = randRange(-1500, 160);

        const drop = document.createElement('div');
        drop.className = 'rain-drop';
        drop.style.left = `${dropLeft}px`;
        drop.style.top = `${dropTop}px`;
        document.body.appendChild(drop);
    }
};

const randRange = (minNum, maxNum) => {
    return (Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum);
};

const createRainfall = () => {
    const styleTag = document.createElement('style');
    styleTag.innerHTML = style;
    document.head.appendChild(styleTag);
    createRain();
};

createRainfall();

