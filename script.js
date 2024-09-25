const options = {
    pisang: "Buah warna kuning dan panjang",
    gedung: "Tempatnya tinggi biasa ada di kota-kota",
    edsered: "Penyanyi luar negeri yang susah menelan",
    kungflu: "Nama penyakit paling populer di China",
    kolplay: "Sayur yang bisa nyanyi",
    apelpagi: "Buah yang paling rajin",
    ayukeriting: "Penyanyi yang rambutnya nggak lurus",
    toamat: "Buah apa yang sering jadi tanda film selesai",
    ikanpause: "Ikan apa yang suka berhenti",
    spatula: "Sepatu yang bisa di pakai masak",
    kutukan: "Kutu yang paling mengerikan",
    gawrong: "hewan yang ga pernah salah",
    semute: "hewan apa yang paling hening",
};

// Initial References
const message = document.getElementById("message");
const hintRef = document.querySelector(".hint-ref");
const controls = document.querySelector(".controls-container");
const startBtn = document.getElementById("start");
const letterContainer = document.getElementById("letter-container");
const userInpSection = document.getElementById("user-input-section");
const resultText = document.getElementById("result");
const word = document.getElementById("word");
const timerDisplay = document.getElementById("timer");
const words = Object.keys(options);
let randomWord = "";
let randomHint = "";
let winCount = 0;
let lossCount = 5; // Set initial chances
let timerInterval; // to store the interval for the timer
let countdown; // to store the timeout function

// Generate random value
const generateRandomValue = (array) => Math.floor(Math.random() * array.length);

// Block all the buttons
const blocker = () => {
    let lettersButtons = document.querySelectorAll(".letters");
    stopGame();
    clearInterval(timerInterval); // Stop the timer when the game stops
    clearTimeout(countdown); // Clear the timeout when the game stops
};

// Start Game
startBtn.addEventListener("click", () => {
    controls.classList.add("hide");
    init();
});

// Stop Game
const stopGame = () => {
    controls.classList.remove("hide");
};

// Timer function
const startTimer = () => {
    let timeLeft = 30; // 30 seconds countdown
    timerDisplay.innerText = `Time Left: ${timeLeft} seconds`;

    timerInterval = setInterval(() => {
        timeLeft--;
        timerDisplay.innerText = `Time Left: ${timeLeft} seconds`;
        if (timeLeft === 0) {
            clearInterval(timerInterval); // Stop the timer
        }
    }, 1000);

    countdown = setTimeout(() => {
        resultText.innerHTML = "Time's up! Game Over";
        word.innerHTML = `The word was: <span>${randomWord}</span>`;
        startBtn.innerText = "Restart"; // Change button text to "Restart" when time is up
        blocker();
    }, 30000); // 30 seconds
};

// Generate Word function
const generateWord = () => {
    letterContainer.classList.remove("hide");
    userInpSection.innerText = "";
    randomWord = words[generateRandomValue(words)];
    randomHint = options[randomWord];
    
    hintRef.innerHTML = `<div id="wordHint">
    <span>Hint:</span> ${randomHint}</div>`;
    
    let displayItem = "";
    randomWord.split("").forEach(value => {
        displayItem += '<span class="inputSpace">_ </span>';
    });

    // Display each element as span
    userInpSection.innerHTML = displayItem;
    userInpSection.innerHTML += `<div id='chanceCount'>Chances Left: ${lossCount}</div>`;
};

// Initial Function
const init = () => {
    winCount = 0;
    lossCount = 5; // Reset lossCount at the start of the game
    randomWord = "";
    word.innerText = "";
    randomHint = "";
    message.innerText = "";
    userInpSection.innerHTML = "";
    letterContainer.classList.add("hide");
    letterContainer.innerHTML = "";
    clearInterval(timerInterval); // Clear any previous timer
    clearTimeout(countdown); // Clear any previous countdown
    generateWord();
    startTimer(); // Start the 30 seconds timer

    // for creating letter buttons
    for (let i = 65; i < 91; i++) {
        let button = document.createElement("button");
        button.classList.add("letters");

        // Number to (A-Z)
        button.innerText = String.fromCharCode(i);

        // Character buttons
        button.addEventListener("click", () => {
            message.innerText = 'Correct Letter';
            message.style.color = "#008000";
            let charArray = randomWord.toLocaleUpperCase().split("");
            let inputSpace = document.getElementsByClassName("inputSpace"); // Correct class name

            //If array contains clicked value replace the matched dash with letter
            if (charArray.includes(button.innerText)) {
                charArray.forEach((char, index) => {
                    if (char === button.innerText) {
                        button.classList.add("correct");
                        inputSpace[index].innerText = char; // Correctly display letter in the span
                        winCount += 1;
                        if (winCount == charArray.length) {
                            resultText.innerHTML = "You Won";
                            startBtn.innerText = "Next Level"; // Change button to "Next Level" on win
                            blocker();
                        }
                    }
                });
            } else {
                //lose count
                button.classList.add("incorrect");
                lossCount--; // Decrease lossCount correctly
                document.getElementById("chanceCount").innerText = `Chances Left: ${lossCount}`;
                message.innerText = `Incorrect Letter`;
                message.style.color = "#ff0000";
                if (lossCount == 0) {
                    word.innerHTML = `The word was: <span>${randomWord}</span>`;
                    resultText.innerHTML = "Game Over";
                    startBtn.innerText = "Restart"; // Change button to "Restart" on game over
                    blocker();
                }
            }

            // disable clicked
            button.disabled = true;
        });

        // Append generated buttons to the letters container
        letterContainer.appendChild(button);
    }
};

window.onload = () => {
    init();
};
