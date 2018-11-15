# Memory Game Project: Version Two

## Introduction

As the second project in Udacity's Front-End Nanodegree program, the commits made on this repo will demonstrate my abilities with using HTML, CSS, and JavaScript to build a fully-functioning web-based game.

The below game description and project specification are based on Udacity's own guidelines for completing the project.

## How The Game Works

The game board is made up of 16 cards appearing as a grid. Each of the cards will feature one of eight different symbols (likely a CSS icon) and cards are meant to be matched according to the symbols. The game begins with all cards presented symbol-side face down. The gameplay turn rules are just like the classic game where you pick one card from the board to reveal its symbol and then try to find its match from the other cards remaining unmatched on the grid.

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

The number of moves needed to change the rating is up to you, but it should happen at _some_ point.

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

<hr>
<br>

## Required Dependencies

- [Font Awesome](https://fontawesome.com/) - for incorporating specialized vector icons in the game's cards and UI

- [Google Fonts](https://fonts.google.com/) - for applying open source typographical font styling to the game's text content

## Attribution References

- Helper code for building the modal was referenced on CSS-Tricks
  at https://css-tricks.com/considerations-styling-modal/
  on July 2, 2018

- Helper code for building the modal overlay was referenced from
  Codrops article, CSS Overlay Techniques, by Sara Soueidan
  at https://css-tricks.com/considerations-styling-modal/
  on July 2, 2018

- Helper code for styling buttons of the modal was referenced on CSS-Tricks
  at https://css-tricks.com/overriding-default-button-styles/
  on July 2, 2018

- Helper code for updating the page's score counter was referenced at
  https://stackoverflow.com/questions/15280851/javascript-increment-value-inside-html
  on June 29, 2018

- Referenced helper code for updating the timer, and
  starting and stopping the timer from Udacity Student Leader,
  Chris N's post on the Slack Channel for this project (fend_proj_2).
  The full post can be found at this link:
  https://gwgnanodegrees.slack.com/files/UA8PXHUR3/FB0Q3CSMB/Getting_the_Memory_Game_timer_to_work
  and was accessed on June 30, 2018.

- Original code for _version one_ of this project was built following
  Matthew Cranford's Memory Game Walkthrough which was accessed on June 21, 2018
  from: https://matthewcranford.com/memory-game-walkthrough-part-1-setup/
