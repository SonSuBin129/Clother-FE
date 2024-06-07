document.addEventListener("DOMContentLoaded", function () {
    const backgroundColor = "#6a7b80"; // 원하는 배경색으로 변경
    const gradientColor = "#bfc7c9"; // 원하는 그라데이션 색으로 변경

    const style = `
        body, html {
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
        }
        
        body {
            background-image: url('http://www.pngmart.com/files/1/Clouds-PNG-Pic.png'), 
                              url('https://myphuket-holiday.com/wp-content/uploads/revslider/homepage/cloud.png'), 
                              url('http://pngimg.com/uploads/cloud/cloud_PNG7.png'), 
                              url('https://myphuket-holiday.com/wp-content/uploads/revslider/homepage/cloud.png'), 
                              linear-gradient(to bottom, ${backgroundColor}, ${gradientColor});
            background-size: 100%, 40%, 50%, 20%, cover;
            background-repeat: no-repeat;
            background-position: -300px 10%, -200px 70%, 200px 40%, 400px 80%, 100%;
            animation: animater 20s 4s ease-out infinite alternate;
            min-height: 100vh;
        }

        @keyframes animater {
            to {
                background-position: 200px 10%, 500px 70%, 600px 40%, 800px 80%, 100%;
                background-size: 100%, 40%, 50%, 20%, cover;
            }
        }
    `;

    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = style;
    document.head.appendChild(styleSheet);
});


