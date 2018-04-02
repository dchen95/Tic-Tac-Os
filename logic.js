// Initialize Firebase
  var config = {
    apiKey: "AIzaSyCFsMk-UOJWmYptPKgD46tV6ONa-AtrEBA",
    authDomain: "tic-tac-os.firebaseapp.com",
    databaseURL: "https://tic-tac-os.firebaseio.com",
    projectId: "tic-tac-os",
    storageBucket: "tic-tac-os.appspot.com",
    messagingSenderId: "622288172534"
  };
  firebase.initializeApp(config);

var database = firebase.database();

// Branches to store each player's actions
var player1 = database.ref("/player1");
var player2 = database.ref("/player2");

// Variables for players' names
var player1Name;
var player2Name;

// ==========================================

var winningCombos = []; // stores winning combinations
var currentState = ["-", "-", "-", "-", "-", "-", "-", "-", "-"];
var currentPlayer = 1;
var player1score = 0;
var player2score = 0;
var numberMoves = 0; // tracks total number clicks in game; calculations begin after 5 clicks
var gameOver = 0;

// Accept players' names input
// player1Name = $('#player1-name').text().trim();
// player2Name = $('#player2-name').text().trim();

loadWinningCombos();
console.log(winningCombos);


//==================================================


function playGame(clickedId) {
    console.log("Button clicked # " + clickedId);
    console.log("currentPlayer: " + currentPlayer);

    numberMoves++;

    console.log("currentPlayer:  " + currentPlayer);
    
    // mark "X" for Player 1
    if (currentPlayer == 1) {
        
        console.log('clickedId = ' + clickedId); // display number of box clicked
        $('#' + clickedId).text("X"); // flip this box to "X" image
                
        currentState.splice(clickedId, 1, "X");  // save play in array position [clickedID]
        console.log('currentState:  ' + currentState);

        currentPlayer = 2;
    }
    else {
        // mark "O" for Player 2
        $('#' + clickedId).text("O");
        currentState.splice(clickedId, 1, "O"); // save play in array position [clickedID]
        console.log('currentState:  ' + currentState);
        currentPlayer = 1;
    }

    if (numberMoves > 4) { // only start checking after 5 clicks
        for (var i = 0; i < winningCombos.length; i++) {
                var a = winningCombos[i][0];
                var b = winningCombos[i][1];
                var c = winningCombos[i][2];
                console.log("var a = " + a);
                console.log("var b = " + b);
                console.log("var c = " + c);
                console.log("currentState[a]" + currentState[a]);
                console.log("currentState[b]" + currentState[b]);
                console.log("currentState[c]" + currentState[c]);
                

                if ((currentState[a] == "X") &&
                    (currentState[b] == "X") &&
                    (currentState[c] == "X"))
                    {
                    $('#subtitle').text("Player 1 wins");
                    gameOver = 1;
                    break;
                }
                else if 
                    ((currentState[a] == "O") &&
                    (currentState[b] == "O") &&
                    (currentState[c] == "O"))
                    {
                    $('#subtitle').text("Player 2 wins");
                    gameOver = 1;
                    break;
                }

            }

        numberMoves++;
        if ((numberMoves = 9) && (gameOver == 0)) {
            $('#subtitle').text("It's a tie!");
        };
    }

}
function loadWinningCombos() {
    winningCombos.push([0, 1, 2]);
    winningCombos.push([3, 4, 5]);
    winningCombos.push([6, 7, 8]);
    winningCombos.push([0, 3, 6]);
    winningCombos.push([1, 4, 7]);
    winningCombos.push([2, 5, 8]);
    winningCombos.push([0, 4, 8]);
    winningCombos.push([2, 4, 6]);
};

