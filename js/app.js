// Create a selector for the deck (parent element containing all cards)
const deck = document.querySelector(".deck");

// Create a list of open cards
let openedCards = [];

// Create a selector for the Moves object
let playerMoves = 0;

// Create a variable to set the status of the clock on / off with a boolean
let clockOff = true;

// Create a variable to store time and set at zero
let time = 0;

// Create global variable to assist with starting page clock
let clockId;

// Create global to set starting count of matched cards
let matched = 0;

// gameRestart() needs to be run every time user clicks the restart icon
const restartButton = document.querySelector(".restart");
restartButton.addEventListener("click", gameRestart);

function gameRestart() {
    resetClockAndTime();
    resetMoves();
    resetStars();
    shuffleDeck();
}

function resetClockAndTime() {
    stopClock();
    clockOff = true;
    time = 0;
    displayTime();
}

function resetMoves() {
    playerMoves = 0;
    document.querySelector(".moves").innerHTML = playerMoves;
}

function resetStars() {
    stars = 0;
    const starList = document.querySelectorAll(".stars li");
    for (star of starList) {
        star.style.display = "inline-block";
    }
}

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

function shuffleDeck() {
    const cardsToShuffle = Array.from(document.querySelectorAll(".deck li"));
    const shuffledCards = shuffle(cardsToShuffle);
    for (card of shuffledCards) {
        deck.appendChild(card);
        card.classList.value = "card";
    }
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function gameOver() {
    stopClock();
    writeModalStats();
    applyModal();
    matched = 0;
}

function replayGame() {
    gameRestart();
    applyModal();
}

// Set up an event listener on the card objects to toggle the classes
// open and show each time any card is clicked.

deck.addEventListener("click", event => {
    const clickTarget = event.target;
    if (isClickValid(clickTarget)) {
        if (clockOff) {
            startClock();
            clockOff = false;
        }
        toggleCardClass(clickTarget);
        addOpenedCard(clickTarget);
        if(openedCards.length === 2) {
            checkForMatch();
            addMove();
            checkScore();
        }
    }
    
});

function isClickValid(clickTarget) {
    return (
        clickTarget.classList.contains("card") &&
        !clickTarget.classList.contains("match") &&
        openedCards.length < 2 &&
        !openedCards.includes(clickTarget)
    );
}

function toggleCardClass(card) {
    card.classList.toggle("open");
    card.classList.toggle("show");
}

// When a card is clicked, add the card to a *list* of "open" cards
// (put this functionality in another function that you call
// from this one)
function addOpenedCard(clickTarget) {
    openedCards.push(clickTarget);
}

// if the list already has another card, check to see if the two cards match
function checkForMatch() {
    if (
        openedCards[0].firstElementChild.className ===
        openedCards[1].firstElementChild.className
    ) {
        // if the cards do match, lock the cards in the open position
        // (put this functionality in another function that you call 
        // from this one)
        saveMatch();
    }
    else {
        // if the cards do not match, remove the cards from the list
        //  and hide the card's symbol 
        // (put this functionality in another function that you call from this one)
        missMatch();
    }
    const TOTAL_PAIRS = 8;
    if (matched === TOTAL_PAIRS) {
        gameOver();
    }
}

function saveMatch () {
    openedCards[0].classList.toggle("match");
    openedCards[1].classList.toggle("match");
    openedCards = [];
    matched++;
}

function missMatch () {
    setTimeout(() => {
        toggleCardClass(openedCards[0]);
        toggleCardClass(openedCards[1]);
        openedCards = [];
    }, 1000);
}

function addMove() {
    playerMoves++;
    const movesText = document.querySelector(".moves");
    movesText.innerHTML = playerMoves;
}

function checkScore() {
    if (playerMoves === 16 || playerMoves === 24) {
        hideStar();
    }
}

function hideStar() {
    const stars = document.querySelectorAll(".stars li");
    for (star of stars) {
        if (star.style.display !== "none") {
            star.style.display = "none";
            break;
        }
    }
}

function getStars() {
    const stars = document.querySelectorAll(".stars li");
    starCount = 0;
    for (star of stars) {
        if (star.style.display !== "none") {
            starCount++;
        }
    }
    return starCount;
}

function startClock() {
    clockId = setInterval(() => {
        time++;
        displayTime();
    }, 1000);
}

function displayTime() {
    const clock = document.querySelector(".clock");
    // Create variables for storing minute and second values of the game clock
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    if (seconds < 10) {
        clock.innerHTML = `${minutes}:0${seconds}` ;
    } else {
        clock.innerHTML = `${minutes}:${seconds}` ;
    }
}

function stopClock() {
    clearInterval(clockId);
}

function applyModal() {
    const modal = document.querySelector(".modal__background");
    modal.classList.toggle("hide");
}

function writeModalStats() {
    const timeStat = document.querySelector(".modal__time");
    const clockTime = document.querySelector(".clock").innerHTML;
    const moveStat = document.querySelector(".modal__moves");
    const starStat = document.querySelector(".modal__stars");
    const stars = getStars();

    timeStat.innerHTML = `Time = ${clockTime}` ;
    moveStat.innerHTML = `Moves = ${playerMoves}` ;
    starStat.innerHTML = `Stars = ${stars}` ;
}

document.querySelector(".modal__cancel").addEventListener("click", function() {
    applyModal();
});

document.querySelector(".modal__close").addEventListener("click", function() {
    applyModal();
});

document.querySelector(".modal__replay").addEventListener("click", function() {
    replayGame();
});

// ======== Attribution ========
// This project was completed while referencing each
// post from Matthew Cranford's Blog series:
// "Memory Game Walkthrough" which begins at this URL:
// https://matthewcranford.com/memory-game-walkthrough-part-1-setup/
// Efforts were made in completing each stage of the project to
// preserve originality between my project and the walkthrough
// ===== End Attribution =======