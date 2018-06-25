/*
 * Create a list that holds all of your cards
 */
const cardList = document.querySelectorAll(".card");

// Create a selector for the deck (parent element containing all cards)
const deck = document.querySelector(".deck");

// Transforms the cardList object from a NodeList to an Array
const cardsArray = Array.prototype.slice.call(cardList);

// Create a list of open cards
let openedCards = [];

// Create a selector for the Moves object
let playerMoves = 0;

// Create a variable to set the status of the clock on / off with a boolean
let clockOff = true;

// Create a variable to store time and set at zero
let time = 0;

let clockId;

// gameRestart() needs to be run every time user clicks the restart icon
const restartButton = document.querySelector(".restart");
restartButton.addEventListener("click", function () {
    console.log("restart clicked!");
});

// function gameRestart() {
//     for (card of cardsArray) {
//         if (
//             card.classList.contains("match") ||
//             card.classList.contains("open") ||
//             card.classList.contains("show")
//         ) {
//             card.className = "card";
//         }
//     }
//     shuffleDeck();
// }

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

function shuffleDeck() {
    const shuffledCards = shuffle(cardsArray);
    shuffledCards.forEach(function(card) {
        deck.appendChild(card);
    });
}
shuffleDeck()

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

// Set up an event listener on the card objects to toggle the classes
// open and show each time any card is clicked.

deck.addEventListener("click", event => {
    const card = event.target;
    if (isClickValid(card)) {
        if (clockOff) {
            startClock();
            clockOff = false;
        }
        toggleCardClass(card);
        addOpenedCard(card);
        if(openedCards.length === 2) {
            checkForMatch();
            addMove();
            checkScore();
        }
    }
    
});

function isClickValid(card) {
    return (
        card.classList.contains("card") &&
        !card.classList.contains("match") &&
        openedCards.length < 2 &&
        !openedCards.includes(card)
    );
}

function toggleCardClass(card) {
    card.classList.toggle("open");
    card.classList.toggle("show");
}

// When a card is clicked, add the card to a *list* of "open" cards
// (put this functionality in another function that you call
// from this one)
function addOpenedCard(card) {
    openedCards.push(card);
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
}

function saveMatch () {
    openedCards.forEach(function(matchedCard) {
        matchedCard.classList.add("match");
    });
    openedCards = [];
    console.log("Match!");
}

function missMatch () {
    setTimeout(() => {
        toggleCardClass(openedCards[0]);
        toggleCardClass(openedCards[1]);
        openedCards = [];
    }, 1000);
    console.log("Not a match!");
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

// Modal tests
time = 150;
displayTime(); // 2:30
playerMoves = 16;
checkScore(); // 2 stars

writeModalStats(); // Write stats to modal
applyModal(); // Open modal

document.querySelector(".modal__cancel").addEventListener("click", function() {
    applyModal();
});

document.querySelector(".modal__replay").addEventListener("click", function() {
    console.log("replay");
});



/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */