const symbols = ['🍎', '🍌', '🍇', '🍉', '🍓', '🍍', '🥝', '🍒', '🍑', '🥥','🥑','🍆','🍄','🫐','🌽'];
 const deck = [...symbols,...symbols];

let gameBoard = document.getElementById('game-board');
let matchedDisplay = document.getElementById('matched-count');
let wrongDisplay = document.getElementById('wrong-count');
let timerDisplay = document.getElementById('timer');
let resetButton = document.getElementById('reset');

let flippedCards = [];
let matchedCount = 0;
let wrongCount = 0;
let timer = 0;
let interval;

function startTimer() {
  timer = 0;
  clearInterval(interval);
  interval = setInterval(() => {
    timer++;
    timerDisplay.textContent = `Time: ${timer}s`;
  }, 1000);
}

function createCards() {
  gameBoard.innerHTML = "";
  matchedCount = 0;
  wrongCount = 0;
  flippedCards = [];

  matchedDisplay.textContent = "Matched Pairs: 0";
  wrongDisplay.textContent = "Wrong Attempts: 0";
  timerDisplay.textContent = "Time: 0s";

  const shuffledDeck = [...deck].sort(() => Math.random() - 0.5);

  shuffledDeck.forEach(symbol => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.symbol = symbol;
    card.innerHTML = `
      <div class="front"></div>
      <div class="back">${symbol}</div>
    `;
    gameBoard.appendChild(card);

    card.addEventListener('click', () => {
      if (card.classList.contains('flip') || flippedCards.length === 2) return;

      card.classList.add('flip');
      flippedCards.push(card);

      if (flippedCards.length === 2) {
        const [first, second] = flippedCards;
        const match = first.dataset.symbol === second.dataset.symbol;

        setTimeout(() => {
          if (match) {
            matchedCount++;
            matchedDisplay.textContent = `Matched Pairs: ${matchedCount}`;

            if (matchedCount === deck.length / 2) {
              clearInterval(interval);
              alert(`🎉 You won in ${timer}s with ${wrongCount} wrong attempts!`);
            }
          } else {
            first.classList.remove('flip');
            second.classList.remove('flip');
            wrongCount++;
            wrongDisplay.textContent = `Wrong Attempts: ${wrongCount}`;
          }

          flippedCards = [];
        }, 800);
      }
    });
  });
}

resetButton.addEventListener('click', () => {
  createCards();
  startTimer();
});

createCards();
startTimer();


