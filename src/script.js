let time = new Date();
let root = document.documentElement;

let hoursDegrees = time.getHours() * 30 ;
console.log(time.getHours())
console.log(hoursDegrees);
let minutesDegrees = time.getMinutes() * 6;
let secondsDegrees = time.getSeconds() * 6;

let currentDayOfMonth = document.getElementById("currentDayOfMonth");
let clockTimerSwitcher = document.getElementById("clockTimerSwitcher");
let switchToClock = clockTimerSwitcher.querySelector("#switchToClock");
let switchToTimer = clockTimerSwitcher.querySelector("#switchToTimer");

let timerInterval;
let timer = document.getElementById("timer");
let runTimer = document.getElementById("runTimer");
let pauseTimer = document.getElementById("pauseTimer");
let resetTimer = document.getElementById("resetTimer");
let timerHours = document.getElementById("timerHours");
let timerMinutes = document.getElementById("timerMinutes");	
let timerSeconds = document.getElementById("timerSeconds");
let timerMiliseconds = document.getElementById("timerMiliseconds");
let timerHoursCount = 0;
let timerMinutesCount = 0;
let timerSecondsCount = 0;
let timerMilisecondsCount = 0;

root.style.setProperty(`--rotateHours`, `${hoursDegrees}deg`);
root.style.setProperty(`--rotateminutes`, `${minutesDegrees}deg`);
root.style.setProperty(`--rotateSeconds`, `${secondsDegrees}deg`);
time.getDate() > 9 ? currentDayOfMonth.textContent = time.getDate() : currentDayOfMonth.textContent = `0${time.getDate()}`;

setInterval(function(){
	secondsDegrees += 6;
	root.style.setProperty(`--rotateSeconds`, `${secondsDegrees}deg`);

	if(secondsDegrees % 360 == 0){
		minutesDegrees += 6;
		root.style.setProperty(`--rotateminutes`, `${minutesDegrees}deg`);

		if(minutesDegrees % 360 == 0){
			hoursDegrees += 30;
			root.style.setProperty(`--rotateHours`, `${hoursDegrees}deg`);

			if(hoursDegrees % 24 == 0){
				time.getDate() > 9 ? currentDayOfMonth.textContent = time.getDate() : currentDayOfMonth.textContent = `0${time.getDate()}`;
				console.log("New Day!!!");
			}
		}
	}
}, 1000)


runTimer.onclick = function(){
	timerInterval = setInterval(timerCounter, 100);
}

pauseTimer.onclick = function(){
	clearInterval(timerInterval);
}

resetTimer.onclick = function(){
	clearInterval(timerInterval);

	timerHoursCount = 0;
	timerMinutesCount = 0;
	timerSecondsCount = 0;
	timerMilisecondsCount = 0;

	timerHours.textContent = "00";
	timerMinutes.textContent = "00";
	timerSeconds.textContent = "00";
	timerMiliseconds.textContent = "00";
}

switchToClock.onclick = function(){
	if(this.getAttribute("switched") == true){
		return;
	}

	timer.style.zIndex = "-1";
	this.setAttribute("switched", true);
	this.style.background = "white";
	switchToTimer.setAttribute("switched", false);
	switchToTimer.style.background = "black";

}

switchToTimer.onclick = function(){
	if(this.getAttribute("switched") == true){
		return;
	}

	timer.style.zIndex = "1";
	this.setAttribute("switched", true);
	this.style.background = "white";
	switchToClock.setAttribute("switched", false);
	switchToClock.style.background = "black";

}

function timerCounter(){
	timerMilisecondsCount += 1;
	timerMiliseconds.textContent = timerMilisecondsCount;
	if(timerMilisecondsCount == 9){
		timerMilisecondsCount = 0;
		timerSecondsCount += 1;
		timerSecondsCount < 10 ? timerSeconds.textContent = `0${timerSecondsCount}` : timerSeconds.textContent = timerSecondsCount; 
		
		if(timerSecondsCount == 60){
			timerSecondsCount = 0;
			timerMinutesCount += 1;
			timerSeconds.textContent = "00";
			timerMinutesCount < 10 ? timerMinutes.textContent = `0${timerMinutesCount}` : timerMinutes.textContent = timerMinutesCount; 

			if(timerMinutesCount == 60){
				timerMinutesCount = 0;
				timerHoursCount += 1;
				timerMinutes.textContent = "00";
				timerHoursCount < 10 ? timerHours.textContent = `0${timerHoursCount}` : timerHours.textContent = timerHoursCount; 

			}
		}
	}
}