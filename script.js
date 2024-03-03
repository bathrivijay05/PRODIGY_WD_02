const stopwatchTicker = document.getElementById("stopwatch");
const lapList = document.getElementById("lap-table-main");
const resetButton = document.getElementById("resetButton");
const startButton = document.getElementById("startStopButton");
const lapButton = document.getElementById("lapButton");
const infoText = document.getElementById("info");

var timerRunning = false;
var timerPaused = false;
var timerTime = 0;
var timer = null;
var timerFlags = [];

function repTime(ms) {
    const d = new Date(Date.UTC(0, 0, 0, 0, 0, 0, ms));
    return `${String(d.getUTCMinutes()).padStart(2, "0")}:${String(
        d.getUTCSeconds()
    ).padStart(2, "0")}.${String(d.getUTCMilliseconds() / 10).padStart(2, "0")}`;
}

function startTimer() {
    timer = setInterval(function() {
        stopwatchTicker.textContent = repTime(timerTime);
        timerTime += 10;
    }, 10);
}

function pauseTimer() {
    timerPaused = true;
    clearInterval(timer);
    timer = null;
}

function resumeTimer() {
    timerPaused = false;
    startTimer();
}

function setFlag() {
    let flagAt = timerTime;

    var newRow = document.createElement("tr");

    var cell1 = document.createElement("td");
    cell1.textContent = String(timerFlags.length).padStart(2, "0");
    newRow.appendChild(cell1);

    var cell2 = document.createElement("td");
    cell2.textContent = repTime(flagAt);
    newRow.appendChild(cell2);

    var cell3 = document.createElement("td");
    cell3.textContent = "+" + repTime(flagAt - timerFlags.at(-1));
    newRow.appendChild(cell3);

    infoText.style.display = "none";
    lapList.insertBefore(newRow, lapList.children[0]);

    timerFlags.push(flagAt);
}

startButton.addEventListener("click", () => {
    if (timerRunning) {
        if (timerPaused) {
            resumeTimer();
            startButton.textContent = "Stop";
        } else {
            pauseTimer();
            startButton.textContent = "Start";
        }
    } else {
        timerRunning = true;
        timerTime = 0;
        timerFlags.push(0);
        startButton.textContent = "Stop";
        startTimer();
    }
});

lapButton.addEventListener("click", () => {
    if (timerRunning) {
        setFlag();
    }
});

resetButton.addEventListener("click", () => {
    timerPaused = false;
    if (timerRunning) {
        timerRunning = false;
        clearInterval(timer);
    }
    timerTime = 0;
    timerFlags = [];
    startButton.textContent = "Start";
    infoText.style.display = "block";
    var rows = lapList.getElementsByTagName("tr");
    console.log(rows)
    for (var i = rows.length - 1; i >= 0; i--) {
        var row = rows[i];
        row.parentNode.removeChild(row);
    }
    stopwatchTicker.textContent = repTime(0);
});