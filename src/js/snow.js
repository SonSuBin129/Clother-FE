document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById('snowflakes-container');
    const style = `
        html, body {
            padding: 0;
            margin: 0;
            height: 100%;
            width: 100%;
            position: relative;
            overflow: hidden;
            background: linear-gradient(#123, #111);
        }
        .snowflake {
            --size: 1vw;
            width: var(--size);
            height: var(--size);
            background: white;
            border-radius: 50%;
            position: absolute;
            top: -5vh;
        }
        @keyframes snowfall {
            0% {
                transform: translateY(-5vh);
            }
            100% {
                transform: translateY(110vh);
            }
        }
    `;

    const randRange = (minNum, maxNum) => {
        return (Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum);
    };

    for (let i = 1; i <= 140; i++) { //눈 개수 조정
        const snowflake = document.createElement('div');
        snowflake.classList.add('snowflake');
        container.appendChild(snowflake);

        const size = randRange(3, 10) / 10; //눈 사이즈 조정
        const leftIni = randRange(-90, 100); 
        const animationDuration = randRange(60, 150) / 10; // 눈 내리는 속도

        snowflake.style.width = `${size}vw`;
        snowflake.style.height = `${size}vw`;
        snowflake.style.left = `${leftIni}vw`;
        snowflake.style.animation = `snowfall ${animationDuration}s linear infinite`;
        snowflake.style.animationDelay = `-${randRange(0, animationDuration)}s`;
    }

    const styleTag = document.createElement('style');
    styleTag.innerHTML = style;
    document.head.appendChild(styleTag);
});
