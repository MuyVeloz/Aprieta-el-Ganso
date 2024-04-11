// Selecting elements from the HTML
const startButton = document.getElementById("startButton");
const scoreDisplay = document.getElementById("scoreDisplay");
const timeDisplay = document.getElementById("timerDisplay");
const holes = document.querySelectorAll(".hole");
const sound = document.getElementById("sound");
const endSound = document.getElementById("endSound");
let score = 0;
let time = 10;
let isPlaying = false;
let countdown;

// Function to generate a random time interval
function randomTime(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to display images in holes
function displayImage() {
  // Clear any active images
  holes.forEach(hole => hole.classList.remove("active"));

  // Select a random hole
  const randomHole = holes[Math.floor(Math.random() * holes.length)];

  // Display the images in the selected hole
  randomHole.classList.add("active");

  // Set a random time for the image to ve displayed
  const time = randomTime(500, 1500);

  // After the set time, hide the image
  setTimeout(() => {
    randomHole.classList.remove("active");

    // Continue the game loop if still playing
    if (isPlaying) {
      displayImage();
    }
  }, time);
}

// Function to start the game
function startGame() {
  score = 0;
  time = 10;
  isPlaying = true;
  startButton.disabled = true;
  startButton.textContent = "Playing...";

  // Display the initial score and time
  scoreDisplay.textContent = `Puntaje: ${score}`;
  timeDisplay.textContent = `Tiempo Restante: ${time}`;

  // Start the countdown timer
  countdown = setInterval(() => {
    time--;
    timeDisplay.textContent = `Tiempo Restante: ${time}`;

    // End the game when time is up
    if (time === 0) {
      clearInterval(countdown);
      isPlaying = false;
      startButton.disabled = false;
      startButton.textContent = "Empezar a jugar";
      timeDisplay.textContent = getMessage();
      endSound.play();
    }
  }, 1000);

  // Start displaying images
  displayImage();
}

// Event listener for the start button
startButton.addEventListener("click", startGame);

// Event listener for clicking on images
holes.forEach(hole => {
  hole.addEventListener("click", () => {
    if (hole.classList.contains("active")) {
        hole.classList.remove("active");
        score++;
        scoreDisplay.textContent = `Score: ${score}`;

        sound.currentTime = 0;
        sound.play();
        // Add a red border to the click image
        const image = hole.querySelector("img");
        image.classList.add("clicked");

        // Remove the red border after a short delay
        setTimeout(() => {
          image.classList.remove("clicked");
      }, 300);
    }
  });
});

// Function to get a fun message based on the score
function getMessage() {
  if (score === 0) {
    return "Deja de pajearte y juega";
  } else if (score < 3) {
    return "El esfuerzo vale la pena!";
  } else if (score < 6) {
    return "Aprieta mas papu!";
  } else {
    return "Eres el mas capo!";
  }
}
