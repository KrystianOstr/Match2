const gameArea = document.querySelector(".game-area");
const buttonStart = document.querySelector(".start");
const buttonRestart = document.querySelector(".restart");
const timerElement = document.querySelector(".timer");
const scoreElement = document.querySelector(".score");
const movesElement = document.querySelector(".moves");

const cardsArray = [
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
];
const flippedCardsArray = [];
let completedCardsArray = [];

let timerCounter = 0;
let scoreCounter = 0;
let movesCounter = 0;

let timerInterval = null;

function flipACard(card) {
  card.classList.add("flipped");

  flippedCardsArray.push(card);
  movesCounter += 1;
  movesElement.textContent = movesCounter;
  console.log(flippedCardsArray[0].id);
  if (flippedCardsArray.length === 2) {
    if (flippedCardsArray[0].id === flippedCardsArray[1].id) {
      scoreCounter += 25;
      scoreElement.textContent = scoreCounter;
      completedCardsArray = [...completedCardsArray, ...flippedCardsArray];
      flippedCardsArray.length = 0;
    } else {
      flippedCardsArray.forEach((card) =>
        setTimeout(() => card.classList.remove("flipped"), 700)
      );
      flippedCardsArray.length = 0;
    }
    completedCardsArray.length === 10 ? endGame() : false;
  }
}

function createCard() {
  const suffledArray = cardsArray.sort(() => 0.5 - Math.random());
  for (let i = 0; i < 10; i++) {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    const arrayItem = suffledArray.pop();
    cardElement.id = arrayItem.id;

    const cardInner = document.createElement("div");
    cardInner.classList.add("card-inner");

    const cardFront = document.createElement("div");
    cardFront.classList.add("card-front");
    cardFront.textContent = "?";

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

function startGame() {
  timerInterval = setInterval(() => {
    timerCounter += 1;
    timerElement.textContent = timerCounter;
    scoreCounter -= 1;
    scoreElement.textContent = scoreCounter;
  }, 1000);

  buttonStart.disabled = true;
}

function endGame() {
  clearInterval(timerInterval);
  alert(`Your results: 
  Score: ${scoreCounter}
  Moves: ${movesCounter}
  Time: ${timerCounter}
  `);
  restartGame();
}

function restartGame() {
  document.location.reload();
}

createCard();

buttonStart.addEventListener("click", startGame);
buttonRestart.addEventListener("click", restartGame);
