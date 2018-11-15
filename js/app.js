// Get parent element, deck and store into global variable reference
const deck = document.querySelector('.deck');

// call function to shuffle cards each time page is loaded. NOTE, global variable, deck must be declared first
shuffleCards();

// Create global, mutable array for storing up to two cards for checking
let openCards = [];

// Create mutable variable for storing player move count
let playerMoveCount = 0;

// Create mutable variable for storing number of stars in global namespace
let starCount = 0;

// Initialize mutable variables for working with the timer functionality
let timerSeconds = 0;
let timerMinutes = 0;
let timer;
let timerActive = false;

// Set mutable counter variable for storing matches in global namespace
let matchCount = 0;

// Create event listener to restart the game, when the restart button is clicked
document.querySelector('.restart').addEventListener('click', resetGame);

// Declare variables for getting and working with interactive modal elements
// from document
const closeIcon = document.querySelector('#close');

const cancelButton = document.querySelector('.cancel-btn');

const replayButton = document.querySelector('.replay-btn');

// Event listener delegated to parent, listening for clicks on all children
deck.addEventListener('click', function(e) {
    // card variable initialized in scope references the target property of the click event
    const card = e.target;
    // First validate context of click event before running additional functionality
    if (clickCheck(card)) {
        startTimer();
        toggleClass(card);
        openCards.push(card);
        if (openCards.length === 2) {
            checkForMatch();
            countMove();
            checkMovesCount();
        }
    }
});

// Function checking and limiting the click event to set of unmatched, unique cards:
function clickCheck(card) {
    return (
        // Confirm the length of cards array is less than 2
        openCards.length < 2 &&
        // Confirm target of click event does not already exist in the array
        !openCards.includes(card) &&
        // Confirm the click occured on element having a class of 'card'
        card.classList.contains('card') &&
        // Confirm the click did not occur on card already having class of match (discount this move)
        !card.classList.contains('match')
    );
}

// Toggle open and show class on card to reveal uncovered side
function toggleClass(card) {
    card.classList.toggle('open');
    card.classList.toggle('show');
}

function checkForMatch() {
    // check for match
    if (openCards[0].firstElementChild.className == 
        openCards[1].firstElementChild.className) {
            saveMatch();
            countMatches();
    } else {
            misMatch();
        }
}

function saveMatch() {
    openCards[0].classList.toggle('match');
    openCards[1].classList.toggle('match');
    openCards = [];
    matchCount++;
}

function countMatches() {
    // Set winning condition number
    const winCount = 8;
    // If number matched cards equals winning condition, run functions to end the game
    if(matchCount === winCount) {
        setTimeout(function() {
            updateModal();
            stopTimer();
            showModal();
            starCount = 0;
            matchCount = 0;
        }, 1000);
    }
}

function misMatch() {
    setTimeout(function () {
        for (card of openCards) {
            card.classList.toggle('open');
            card.classList.toggle('show');
        }
        openCards = [];
    }, 1000);
}

// ######## Start Reference to Helper Code ######## //

// Set player's number of moves equal to value of playerMoveCount
function countMove() {
    // Increment move score value after each validated click
    playerMoveCount++;
    // Get player moves element from document
    const playerMoveBoard = document.querySelector('.moves');
    // Update page text using innerHTML
    playerMoveBoard.innerHTML = playerMoveCount;
}
// ######## End Reference for Helper Code ######## //

/* Begin Attribution
    Referenced helper code for updating the page's score counter at
    https://stackoverflow.com/questions/15280851/javascript-increment-value-inside-html
    on June 29, 2018
End Attribution */

function checkMovesCount() {
    // set terms for removing star penalty
    if (playerMoveCount === 16 || playerMoveCount === 24) {
        hideStar();
    }
}

function hideStar() {
    // get the star elements from the document object
    const starsSelect = document.querySelectorAll('.stars li');
    // hide star from page
    for (star of starsSelect) {
        // if element in starsSelect collection, does not have its display class set to none, set it to none
        if (star.style.display !== 'none') {
            star.style.display = 'none';
            // Add break to avoid removing more than single star at a time.
            break;
        }
    }
}

// ######## Start Reference to Helper Code ######## //

function updateTimer() {
    timerSeconds++;

    if (timerSeconds < 10) {
        timerSeconds = `0${timerSeconds}`
    }

    if (timerSeconds >= 60) {
        timerMinutes++;
        timerSeconds = '00';
    }

    const pageTimer = document.querySelector('.timer')
    
    pageTimer.innerHTML = timerMinutes + ':' + timerSeconds;
}

function startTimer() {
    if (timerActive == false) {
        timer = setInterval(updateTimer, 1000);
        timerActive = true;
    }
}

function stopTimer() {
    clearInterval(timer);
    timerSeconds = 0;
    timerMinutes = 0;
    timerActive = false;
}

// ######## End Reference for Helper Code ######## //

// ######## Begin Attribution ######## //
// Referenced helper code for updating the timer, and
// starting and stopping the timer from Udacity Student Leader,
// Chris N's post on the Slack Channel for this project (fend_proj_2).
// The full post can be found at this link: 
// https://gwgnanodegrees.slack.com/files/UA8PXHUR3/FB0Q3CSMB/Getting_the_Memory_Game_timer_to_work
// and was accessed on June 30, 2018.

// ######## End Attribution ######## //

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

function shuffleCards() {
    // Get children of deck, cards and store into variable reference
    const cards = document.querySelectorAll('.card');
   
    // Array created from NodeList
    const cardsArray = Array.from(cards);
   
    // Pass the cardsArray object as parameter to shuffle function and assign to new variable
    const shuffledCards = shuffle(cardsArray);
   
    // Deliver each card object to the parent 'deck' global in the new shuffled order
    shuffledCards.forEach(function(card) {
       // Card objects are successively updated into DOM parent node object
       deck.appendChild(card);
   });
}

function resetCards() {
    const cards = document.querySelectorAll('.card');
    for (card of cards) {
        if (card.classList.contains('show') ||
            card.classList.contains('show') ||
            card.classList.contains('match')
        ) {
            card.className = 'card';
        }
    }
}

function resetMoveCount() {
    playerMoveCount = 0;
    // Get player moves element from document
    const playerMoveBoard = document.querySelector('.moves');
    // Update page text using innerHTML
    playerMoveBoard.innerHTML = playerMoveCount;
}

function resetTimer() {
    stopTimer();
    const pageTimer = document.querySelector('.timer');
    pageTimer.innerHTML = timerMinutes + ':' + `0${timerSeconds}`;
}

function resetStars() {
    // get the star elements from the document object
    const starsSelect = document.querySelectorAll('.stars li');
    // reveal all hidden stars
    for (star of starsSelect) {
        // if element in starsSelect collection, does not have its display class set to none, set it to none
        if (star.style.display == 'none') {
            star.style.display = 'inline-block';
        }
    }
    // reset count of stars in starCount variable
    starCount = 0;
}

function getStarCount() {
    const starsSelect = document.querySelectorAll('.stars li');
    for (star of starsSelect) {
        if(star.style.display !== 'none') {
            starCount++;
        }
    }
    return starCount;
}

function updateModal() {
    // get time-stat from modal
    const pageTimeStat = document.querySelector('.time-stat');
    // write time-stat to modal
    pageTimeStat.innerHTML = 'Time: ' + timerMinutes + ':' + timerSeconds;

    // get moves-stat from modal
    const pageMovesStat = document.querySelector('.moves-stat');
    // write moves-stat to modal
    pageMovesStat.innerHTML = 'Moves: ' + `${playerMoveCount}`

    // get star-stat from modal
    const pageStarStat = document.querySelector('.star-stat');
    // call getStarCount to get starCount value
    getStarCount();
    // write star-stat to modal
    pageStarStat.innerHTML = 'Stars: ' + `${starCount}`
}

function showModal() {
    const overlay = document.querySelector('.overlay');
    overlay.classList.toggle('hide');
}

closeIcon.addEventListener('click', function() {
    showModal();
});

cancelButton.addEventListener('click', function() {
    showModal();
});

replayButton.addEventListener('click', function() {
    showModal();
    resetGame();
});

function resetGame() {
    resetTimer();
    resetStars();
    shuffleCards();
    resetMoveCount();
    resetCards();
    matchCount = 0;
    openCards = [];
}