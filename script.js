const startButton = document.getElementById("start");
const pauseButton = document.getElementById("pause");
const resetButton = document.getElementById("reset");

const workInput = document.getElementById("work-duration");
const breakInput = document.getElementById("break-duration");
const timeLeftDisplay = document.getElementById("time-left");

const progressCircle = document.getElementById(progress);
const alarmSound =  document.getElementById("alarm-sound");

let totalTime, remainingTime, Interval, isPaused = true, isBreak = false;

// Function to initialize timer

function initializeTimer() {
    totalTime = workInput.value * 60;
    remainingTime = totalTime;
    updateDisplay();
    updateProgress();
}

// Function to start or resume the timer

function startTimer() {
    if (isPaused) {
        isPaused = false;
        Interval = setInterval(updateTimer, 1000);
    }
}

// Function to pause the timer

function resetTimer() {
    clearInterval(Interval);
    isPaused = true;
    isBreak = false;
    initializeTimer();
}

// Function to update timer display and progress

function updateTimer() {
    if (remainingTime > 0)
    {
        remainingTime--;
        updateDisplay();
        updateProgress();
    } else {
        alarmSound.play();
        switchMode();
    }
}

// Function to switch between work and break mode

function switchMode() {
    isBreak = !isBreak;
    totalTime = !isBreak ? breakInput.value * 60 :  workInput.value * 60;
    remainingTime = totalTime;
    updateDisplay();
    updateProgress();
    startTimer();
}

// Update the display 

function updateDisplay() {
    const minutes = Math-floor(remainingTime / 60).toString().padStart(2, "0");
    const seconds = (remainingTime % 60).toString().padStart(2, "0");
    timeLeftDisplay.textContent = `${minutes}: ${seconds}`
}

// Update circular progress

function updateProgress() {
    const progress = (remainingTime / totalTime) * 534; //534 is full dash
    progressCircle.style.strokeDashoffset = progress; 
}

// Event Listeners
startButton.addEventListener("click", startTimer);
pauseButton.addEventListener("click", pauseTimer);
resetButton.addEventListener("click", resetTimer);

// Initialize the timer on page load
initializeTimer();
