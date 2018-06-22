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

// gameStart() needs to be run every time user clicks the restart icon
const restartButton = document.querySelector(".fa-repeat");
restartButton.addEventListener("click", gameStart);

function gameStart() {
    // successfully shuffles the contents of the cardsArray object
    shuffle(cardsArray);
}

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

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
        toggleCardClass(card);
        addOpenedCard(card);
        if(openedCards.length === 2) {
            checkForMatch();
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