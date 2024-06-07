function createSnowfall() {
    const randRange = (minNum, maxNum) => {
        return (Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum);
    };

    for (let i = 1; i <= 140; i++) { // 눈 개수 조정
        const snowflake = document.createElement('div');
        snowflake.classList.add('snowflake');
        document.body.appendChild(snowflake);

        const size = randRange(3, 10) / 10; // 눈 사이즈 조정
        const leftIni = randRange(-90, 100); 
        const animationDuration = randRange(60, 150) / 10; // 눈 내리는 속도

        snowflake.style.width = `${size}vw`;
        snowflake.style.height = `${size}vw`;
        snowflake.style.left = `${leftIni}vw`;
        snowflake.style.animation = `snowfall ${animationDuration}s linear infinite`;
        snowflake.style.animationDelay = `-${randRange(0, animationDuration)}s`;
    }
}

createSnowfall();
