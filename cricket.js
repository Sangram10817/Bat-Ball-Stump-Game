// Get elements
const userMoveEl = document.getElementById("user-move");
const computerMoveEl = document.getElementById("computer-move");
const resultEl = document.getElementById("result");
const userScoreEl = document.getElementById("user-score");
const computerScoreEl = document.getElementById("computer-score");
const tieScoreEl = document.getElementById("Tie-score");
const winSound = document.getElementById("win-sound");
const loseSound = document.getElementById("lose-sound");
const drawSound = document.getElementById("draw-sound");

// Load previous score from localStorage
let score = JSON.parse(localStorage.getItem("score")) || { user: 0, computer: 0, tie: 0 };
userScoreEl.textContent = score.user;
computerScoreEl.textContent = score.computer;
tieScoreEl.textContent = Number(score.tie);


// Generate computer choice
function generateComputerChoice() {
  const choices = ["Bat", "Ball", "Stump"];
  return choices[Math.floor(Math.random() * choices.length)];
}

// Get game result
function getResult(userChoice, computerChoice) {
  if (userChoice === computerChoice) {
    score.tie++;
    localStorage.setItem("score", JSON.stringify(score));
    tieScoreEl.textContent = score.tie;
    drawSound.play();
    return "🤝 It's a Draw!";
  }
  if (
    (userChoice === "Bat" && computerChoice === "Ball") ||
    (userChoice === "Ball" && computerChoice === "Stump") ||
    (userChoice === "Stump" && computerChoice === "Bat")
  ) {
    score.user++;
    localStorage.setItem("score", JSON.stringify(score));
    userScoreEl.textContent = score.user;
    winSound.play();
    celebrate();
    return "🎉 You Win!";
  }
  else {
    score.computer++;
    localStorage.setItem("score", JSON.stringify(score));
    computerScoreEl.textContent = score.computer;
    loseSound.play();
    return "😢 You Lose!";
  }
}

// Show result
function showResult(userChoice, computerChoice, resultMsg) {
  userMoveEl.textContent = `You chose: ${userChoice}`;
  computerMoveEl.textContent = `Computer chose: ${computerChoice}`;
  resultEl.textContent = resultMsg;
}

// Confetti celebration
function celebrate() {
  const duration = 1 * 1000;
  const end = Date.now() + duration;

  (function frame() {
    confetti({
      particleCount: 5,
      startVelocity: 30,
      spread: 360,
      origin: { x: Math.random(), y: Math.random() - 0.2 }
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}

// Reset score
function resetScore() {
  score = { user: 0, computer: 0, tie: 0 };
  localStorage.setItem("score", JSON.stringify(score));
  userScoreEl.textContent = "0";
  computerScoreEl.textContent = "0";
  tieScoreEl.textContent = "0";
  resultEl.textContent = "Game Reset! Start Playing 🎮";
}

// Toggle dark/light mode
function toggleTheme() {
  document.body.classList.toggle("dark-mode");
  localStorage.setItem("theme", document.body.classList.contains("dark-mode"));
}

// Load saved theme
if (localStorage.getItem("theme") === "true") {
  document.body.classList.add("dark-mode");
}
