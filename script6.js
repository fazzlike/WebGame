let dayBox = document.getElementById("day-box");
let hrBox = document.getElementById("hr-box");
let minBox = document.getElementById("min-box");
let secBox = document.getElementById("sec-box");

// Set the end date (use UTC to be consistent)
let endDate = new Date(Date.UTC(2025, 0, 1, 0, 0, 0)); // January 1, 2025, 00:00:00 UTC
let endTime = endDate.getTime();

function countdown() {
  // Get current time in UTC
  let todayDate = new Date();
  let todayTime = todayDate.getTime();
  
  // Calculate remaining time in milliseconds
  let remainingTime = endTime - todayTime;
  
  // Time constants in milliseconds
  let oneMin = 60 * 1000;
  let oneHr = 60 * oneMin;
  let oneDay = 24 * oneHr;

  // Add leading zeroes function
  let addZeroes = (num) => (num < 10 ? `0${num}` : num);

  // Check if countdown has expired
  if (remainingTime <= 0) {
    clearInterval(i);
    document.querySelector(
      ".countdown"
    ).innerHTML = `<h1>Countdown Has Expired</h1>`;
  } else {
    // Calculate time left in days, hours, minutes, seconds
    let daysLeft = Math.floor(remainingTime / oneDay);
    let hrsLeft = Math.floor((remainingTime % oneDay) / oneHr);
    let minsLeft = Math.floor((remainingTime % oneHr) / oneMin);
    let secsLeft = Math.floor((remainingTime % oneMin) / 1000);

    // Display time with leading zeroes
    dayBox.textContent = addZeroes(daysLeft);
    hrBox.textContent = addZeroes(hrsLeft);
    minBox.textContent = addZeroes(minsLeft);
    secBox.textContent = addZeroes(secsLeft);
  }
}

// Run countdown every second
let i = setInterval(countdown, 1000);
countdown();
