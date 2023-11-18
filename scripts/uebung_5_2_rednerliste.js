


function addRedner(name) {
    if(name === "") return
    stopAllTimer()
    const redContainer = document.getElementById("rednerContainer");
    const newRedner = document.createElement("li");

    const nameDiv = document.createElement("div")
    nameDiv.textContent = name;

    const timerDiv = document.createElement("div")
    timerDiv.setAttribute("class", "timer")
    timerDiv.textContent = "00:00:00";

    const starBtn = document.createElement("button");
    starBtn.textContent = "Start!"

    //Timer wird direkt gestartet
    startTimer(starBtn, timerDiv);

    newRedner.appendChild(nameDiv)
    newRedner.appendChild(timerDiv)
    newRedner.appendChild(starBtn)
    redContainer.appendChild(newRedner)
}

function timeStrToInt(timeStr) {
    const [hours, minutes, seconds] = timeStr.split(':').map(Number);
    return hours * 3600 + minutes * 60 + seconds;
}

function intToTimeStr(totalSeconds) {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return [
        formatNumberToTime(hours),
        formatNumberToTime(minutes),
        formatNumberToTime(seconds)
    ].join(':');
}

// macht aus 5 -> 05
function formatNumberToTime(num) {
    return num < 10 ? "0" + num : num;
}
function timerIncrement(timer) {
    // current Wert "HH:MM:SS" wird in einen INT umgerechnet und incrementiert
    // Da die Funktion im Sekundentakt aufgrufen wird, wird pro Sekunde inkrementiert
    let curr = timeStrToInt(timer.textContent) + 1;
    timer.textContent = intToTimeStr(curr)
}

function startTimer(button, timer) {
    stopAllTimer(button)
    button.textContent = "Stop!";

    // intervalID damit man genau diese wieder stoppen kann
    button.intervalId = setInterval(function () {
        timerIncrement(timer);
    }, 1000);

    // der Button kriegt jetzt die stop Funktion als onClick event
    button.onclick = function () {
        stopTimer(button, timer);
    };

}

function stopTimer(button, timer) {
    button.textContent = "Start!";

    // damit wird der timer gestoppt
    clearInterval(button.intervalId);

    // der Button kriegt jetzt die Start Funktion als onClick event
    button.onclick = function () {
        startTimer(button, timer);
    };
}

function stopAllTimer(ignore) {
    let liList = document.getElementsByTagName("li")

    for (const li of liList) {
        // ignoriert der button der nicht gestoppt, also gestartet werden soll
        if (li === ignore) continue
        const timer = li.querySelector(".timer")
        const btn = li.querySelector("button")
        stopTimer(btn, timer)

    }
}
