# Memory Game Project

## Introduction
As the second project in Udacity's Front-End Nanodegree program, the commits made on this repo will demonstrate my abilities with using HTML, CSS, and JavaScript to build a fully-functioning web-based game.

The below game description and project specification are based on Udacity's own guidlines for completing the project.

## How The Game Works

The game board is made up of 16 cards appearing as a grid.  Each of the cards will feature one of eight different symbols (likely a CSS icon) and cards are meant to be matched according to the symbols.  The game begins with all cards presented symbol-side face down.  The gameplay turn rules are just like the classic game where you pick one card from the board to reveal its symbol and then try to find its match from the other cards remaining unmatched on the grid.

Each turn:
- The player flips one card over to reveal its underlying symbol.
- The player then turns over a second card, trying to find the corresponding card with the same symbol.
- If the cards match, both cards stay flipped over.
- If the cards do not match, both cards are flipped face down.

The game ends once all cards have been correctly matched.

<br>

## Project Specification

#### Game Behavior

##### Memory Game Logic

The game randomly shuffles the cards. A user wins once all cards have successfully been matched.


##### Congratulations Popup

When a user wins the game, a modal appears to congratulate the player and ask if they want to play again. It should also tell the user how much time it took to win the game, and what the star rating was.


##### Restart Button

A restart button allows the player to reset the game board, the timer, and the star rating.


##### Star Rating

The game displays a star rating (from 1 to at least 3) that reflects the player's performance. At the beginning of a game, it should display at least 3 stars. After some number of moves, it should change to a lower star rating. After a few more moves, it should change to a even lower star rating (down to 1).

The number of moves needed to change the rating is up to you, but it should happen at *some* point.


##### Timer

When the player starts a game, a displayed timer should also start. Once the player wins the game, the timer stops.


##### Move Counter

Game displays the current number of moves a user has made.

<hr>
<br>

#### Interface Design

##### Styling

Application uses CSS to style components for the game.


##### Usability

All application components are usable across modern desktop, tablet, and phone browsers.

<hr>
<br>

#### Documentation

##### README

A `README` file is included detailing the game and all dependencies.


##### Comments

Comments are present and effectively explain longer code procedure when necessary.


##### Code Quality

Code is formatted with consistent, logical, and easy-to-read formatting as described in the [Udacity JavaScript Style Guide](http://udacity.github.io/frontend-nanodegree-styleguide/javascript.html).


## Attribution

This project was completed while referencing each post from Matthew Cranford's Blog series: "Memory Game Walkthrough" which begins at [this URL](https://matthewcranford.com/memory-game-walkthrough-part-1-setup/). Efforts were made in completing each stage of the project to preserve originality between my project and the walkthrough.
