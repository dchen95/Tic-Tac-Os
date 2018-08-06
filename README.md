# Tic-Tac-Os
*Play Tic-Tac-Toe against random strangers on the Internet!!*
Deployed link:  https://dchen95.github.io/Tic-Tac-Os/

## Purpose

We wanted to make an interative web app and also challenege ourselves on our very first web app. 
We decided that a Tic-Tac-Toe game will be our very first app because of the complexity of being able to 
track each user's move, being able to determine the winning combination and it is also fun!!

### Technology Used

* HTML
* CSS 
* Javascript
* JQuery
* Firebase

### Functionality

  The front end contains the grid of the Tic-Tac-Toe Board built using HTML and CSS. The backend is built using JS, JQuery, and Firebase. The App is built to only allow two players to play at any time and any more then that are considered as 'spectators' this is possible through firebase where it tracks the number of user is on the app at any time. 

  The first user on the app is consider player 'X' and the second user is player 'O'. These players are technically objects in the firebase database and they have their own unique ids i.e "markers: X". When a player makes a move, that move is sent to firebase and then firebase will update the 'live' gameboard (which is an object in the firebase database) where the other player can see where the other player made a move. 

  Other features include reset functionality, if a player leaves, the game stops and everyone needs to refresh to start a new game. Currently, there is no "winning/tie/losing logic" implemented yet, it would be place in the future", and there is only one "game room" but we are planning to do much more in the future, please check the Future Enhancement section.

### Authors

* David @
* Kamaran @
* Raven @

### Future Enhancement 
- [ ] Implement Win, Tie and Lose Logic to the Game. 
- [ ] Add Ability to create different game rooms. 
- [ ] Add Chatbot function for players and spectators.
- [ ] Fix issue where a player can overwrite another player's mark. 

