const parent = document.querySelector(".frame");
const cards = document.querySelectorAll(".cards_container");

document.addEventListener("DOMContentLoaded", () => {
  shuffleElements();
  cards.forEach((card) => card.addEventListener("click", flipCard));
});

// Function to handle card flipping
let isFlipped = false;
let firstCard, secondCard;
// Prevents further card flipping during certain conditions(like when two cards are being compared).
let lockBoard = false;

function flipCard() {
  if (lockBoard) return;
  // Prevent clicking the same card twice
  if (this === firstCard) return;

  this.classList.add("flip");

  if (!isFlipped) {
    // First card flip
    isFlipped = true;
    firstCard = this;
    return;
  }

  // Second card flip
  secondCard = this;
  checkForMatch();
}

function checkForMatch() {
  let isMatch =
    firstCard.querySelector(".cards_back i").className ===
    secondCard.querySelector(".cards_back i").className;

  if (isMatch) {
    // Cards match, do something (e.g., keep them flipped)
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);

    // Add a class to indicate matched cards
    firstCard.classList.add("matched");
    secondCard.classList.add("matched");

    // Reset the firstCard and secondCard variables
    resetBoard();
  } else {
    // Cards don't match, flip them back after a delay
    lockBoard = true;
    setTimeout(() => {
      firstCard.classList.remove("flip");
      secondCard.classList.remove("flip");
      resetBoard();
    }, 500); // Adjust delay (in milliseconds) as needed
  }
}

function resetBoard() {
  [isFlipped, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}
// function to shuffle the cards
function shuffleElements() {
  const elementsArray = Array.from(cards);

  for (let i = elementsArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [elementsArray[i], elementsArray[j]] = [elementsArray[j], elementsArray[i]];
  }

  // Clear existing content
  parent.innerHTML = "";
  // // Reattach shuffled elements
  elementsArray.forEach((element) => {
    parent.appendChild(element);
  });
}
