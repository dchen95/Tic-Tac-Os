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
var game = database.ref("/game_stats");

// Branches to store each player's actions
var player1 = database.ref("/player1");
var player2 = database.ref("/player2");

player1.set(true)

// Variables for players' names
var player1Name;
var player2Name;

// ==========================================

var winningCombos = []; // stores winning combinations
var currentState = ["-", "-", "-", "-", "-", "-", "-", "-", "-"]; // current state of game board
var currentPlayer = 1; // tracks whose turn it is
var player1score = 0;
var player2score = 0;
var numberMoves = 0; // tracks total number clicks in game; calculations begin after 5 clicks
var gameStop = 0;  // if this variable remains at "0" at game end, the game was a tie
var clickedId; // store current div ID being clicked

// Accept players' names input
player1Name = $('#player1-name').text().trim();
player2Name = $('#player2-name').text().trim();

loadWinningCombos();  // load array of winning combos
console.log("Loaded winningCombos: " + winningCombos);


//==================================================

game.on("value", function(snapshot) {
    console.log(snapshot.val());
    
});

function playGame(clickedId) {
    console.log("clickedId = " + clickedId); // display number of box clicked
    console.log("currentPlayer: " + currentPlayer);

    gameStop = 0;
    numberMoves++;
  
    
    // mark "X" for Player 1
    if (currentPlayer == 1) {
        
        currentState.splice((clickedId-1), 1, "X");  // save play in array position 'clickedId-1'
        console.log('currentState:  ' + currentState);
        
        // $('#' + clickedId).attr('src', 'assets/images/x.png'); // assign "X" image to img-src
        // flipSquare(clickedId);
        
        currentPlayer = 2;
        console.log("currentPlayer switched to: " + currentPlayer);
        
    }
    else {
        // mark "O" for Player 2
        
        currentState.splice((clickedId-1), 1, "O"); // save play in array position 'clickedId-1'
        console.log('currentState:  ' + currentState);
        
        $('#' + clickedId).attr('src', 'assets/images/o.png'); // assign "O" image to img-src
        flipSquare(clickedId);
        
        currentPlayer = 1;
        console.log("currentPlayer switched to: " + currentPlayer);
        
    }
    
    game.set({
        currentStateF: currentState,
        currentPlayerF: currentPlayer,
        player1scoreF: player1score,
        player2scoreF: player2score,
        numberMovesF: numberMoves,
        gameStopF: gameStop,
        clickedIdF: clickedId
    })
    
    
    if (numberMoves > 4) { // only start checking after 5 clicks
        for (var i = 0; i < winningCombos.length; i++) {
            // compare currentState array with all winningCombos nested arrays to test for match
            var a = winningCombos[i][0];
            var b = winningCombos[i][1];
            var c = winningCombos[i][2];
            console.log("var a = " + a);
            console.log("var b = " + b);
            console.log("var c = " + c);
            console.log("currentState[a] = " + currentState[a]);
            console.log("currentState[b] = " + currentState[b]);
            console.log("currentState[c] = " + currentState[c]);

            if ((currentState[a] == "X") &&
                (currentState[b] == "X") &&
                (currentState[c] == "X"))
                {
                $('#subtitle').text("Player 1 wins");
                player1score++;  // add point to Player1
                gameStop = 1;
                numberMoves = 0;  // reset moves counter
                break;
            }
            else if 
            ((currentState[a] == "O") &&
            (currentState[b] == "O") &&
            (currentState[c] == "O"))
            {
                $('#subtitle').text("Player 2 wins");
                player2score++;  // add point to Player2
                gameStop = 1;
                numberMoves = 0; // reset moves counter
                break;
            }
            
            else if ((numberMoves == 9) && (gameStop == 0)) {  // conditions for a tie
                $('#subtitle').text("It's a tie!");
                gameStop = 1;
                numberMoves = 0; // reset moves counter
                break;
            }
        }
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

function flipSquare(clickedId) {
    console.log("clickedId in flipSquare: " + clickedId);
    var currentSquareId = $('#square' + clickedId).attr('id'); // display id of square clicked
    console.log(currentSquareId);
    
    $('#square' + clickedId).flip({
        axis: "y",
        trigger: "click"
    })
};


function resetBoard() {
    for (i=0; i<10; i++) {
        $('#square' + i).attr(src)
    }    
}