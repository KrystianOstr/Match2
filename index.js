const gameArea = document.querySelector(".game-area");
const buttonStart = document.querySelector(".start");
const buttonRestart = document.querySelector(".restart");
const timerElement = document.querySelector(".timer");
const scoreElement = document.querySelector(".score");
const movesElement = document.querySelector(".moves");
const innerContainer = document.querySelector(".inner-container");
const difficultyButtons = document.querySelectorAll(
  ".difficulty-container .button"
);

let cardsArray = [
  { id: 1, symbol: "./images/indianaDog.png" },
  { id: 1, symbol: "./images/indianaDog.png" },
  { id: 2, symbol: "./images/cosmoDog.png" },
  { id: 2, symbol: "./images/cosmoDog.png" },
  { id: 3, symbol: "./images/policeDog.png" },
  { id: 3, symbol: "./images/policeDog.png" },
  { id: 4, symbol: "./images/snowyDog.png" },
  { id: 4, symbol: "./images/snowyDog.png" },
  { id: 5, symbol: "./images/firemanDog.png" },
  { id: 5, symbol: "./images/firemanDog.png" },
  { id: 6, symbol: "./images/indianaDog.png" },
  { id: 6, symbol: "./images/indianaDog.png" },
  { id: 7, symbol: "./images/cosmoDog.png" },
  { id: 7, symbol: "./images/cosmoDog.png" },
  { id: 8, symbol: "./images/policeDog.png" },
  { id: 8, symbol: "./images/policeDog.png" },
  { id: 9, symbol: "./images/snowyDog.png" },
  { id: 9, symbol: "./images/snowyDog.png" },
  { id: 10, symbol: "./images/firemanDog.png" },
  { id: 10, symbol: "./images/firemanDog.png" },
  { id: 11, symbol: "./images/indianaDog.png" },
  { id: 11, symbol: "./images/indianaDog.png" },
  { id: 12, symbol: "./images/cosmoDog.png" },
  { id: 12, symbol: "./images/cosmoDog.png" },
  { id: 13, symbol: "./images/policeDog.png" },
  { id: 13, symbol: "./images/policeDog.png" },
  { id: 14, symbol: "./images/snowyDog.png" },
  { id: 14, symbol: "./images/snowyDog.png" },
  { id: 15, symbol: "./images/firemanDog.png" },
  { id: 15, symbol: "./images/firemanDog.png" },
  { id: 16, symbol: "./images/indianaDog.png" },
  { id: 16, symbol: "./images/indianaDog.png" },
  { id: 17, symbol: "./images/cosmoDog.png" },
  { id: 17, symbol: "./images/cosmoDog.png" },
  { id: 18, symbol: "./images/policeDog.png" },
  { id: 18, symbol: "./images/policeDog.png" },
  { id: 19, symbol: "./images/snowyDog.png" },
  { id: 19, symbol: "./images/snowyDog.png" },
  { id: 20, symbol: "./images/firemanDog.png" },
  { id: 20, symbol: "./images/firemanDog.png" },
];
const flippedCardsArray = [];
let completedCardsArray = [];

let timerCounter = 0;
let scoreCounter = 0;
let movesCounter = 0;

let timerInterval = null;

function checkDifficulty(buttonId) {
  if (buttonId === "easy") cardsArray = cardsArray.slice(0, 2);
  if (buttonId === "medium") cardsArray = cardsArray.slice(0, 16);
  if (buttonId === "hard") cardsArray = cardsArray.slice(0, 22);
}

function flipACard(card) {
  card.classList.add("flipped");

  flippedCardsArray.push(card);
  const firstCard = flippedCardsArray[0];
  const secondCard = flippedCardsArray[1];
  movesCounter += 1;
  movesElement.textContent = movesCounter;

  if (flippedCardsArray.length === 2) {
    if (firstCard.dataset.id === secondCard.dataset.id) {
      scoreCounter += 25;
      scoreElement.textContent = scoreCounter;
      completedCardsArray.push(...flippedCardsArray);
      flippedCardsArray.length = 0;
    } else {
      setTimeout(() => {
        flippedCardsArray.forEach((card) => card.classList.remove("flipped"));
        flippedCardsArray.length = 0;
      }, 700);
    }
    if (completedCardsArray.length === cardsArray.length) {
      endGame();
    }
  }
}

function createCard() {
  const suffledArray = [...cardsArray].sort(() => 0.5 - Math.random());

  for (let i = 0; i < suffledArray.length; i++) {
    const arrayItem = suffledArray[i];

    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    cardElement.dataset.id = arrayItem.id;

    const cardInner = document.createElement("div");
    cardInner.classList.add("card-inner");

    const cardFront = document.createElement("div");
    cardFront.classList.add("card-front");

    const cardBack = document.createElement("div");
    cardBack.classList.add("card-back");
    cardBack.style.backgroundImage = `url(${arrayItem.symbol})`;

    cardElement.addEventListener("click", () => flipACard(cardElement));

    cardInner.appendChild(cardFront);
    cardInner.appendChild(cardBack);
    cardElement.appendChild(cardInner);
    gameArea.appendChild(cardElement);
  }
}

function startGame(butonId) {
  document.querySelector(".difficulty-container").classList.add("hidden");
  innerContainer.classList.remove("hidden");

  checkDifficulty(butonId);

  timerInterval = setInterval(() => {
    timerCounter += 1;
    timerElement.textContent = timerCounter;
    scoreCounter -= 1;
    scoreElement.textContent = scoreCounter;
  }, 1000);

  createCard();
}

function endGame() {
  clearInterval(timerInterval);
  innerContainer.classList.add("hidden");
  const resultsContainer = document.querySelector(".results");
  document.querySelector(".result-box").classList.remove("hidden");
  resultsContainer.innerHTML = `
    <div class="title">Your Results:</div>
    <div class="item">Score: ${scoreCounter}</div>
    <div class="item">Moves: ${movesCounter}</div>
    <div class="item">Time: ${timerCounter}</div>

  `;
  setTimeout(() => {
    restartGame();
  }, 5000);
}

function restartGame() {
  document.location.reload();
}

buttonRestart.addEventListener("click", restartGame);

difficultyButtons.forEach((button) => {
  const buttonId = button.id;
  button.addEventListener("click", () => startGame(buttonId));
});
