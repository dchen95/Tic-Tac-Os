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

// var connections = database.ref("/players");
var moves = database.ref("/moves");

var players = database.ref("/players");
var connectionsRef = database.ref("/connections");
var connectedRef = database.ref(".info/connected");

var playerMarker = '';
var myMove = false
// var 

connectionsRef.once('value', (snap) => {
    console.log(snap.val());

    if (!snap.val()) {
        playerMarker = 'X'
        myMove = true;
        var con = connectionsRef.push(true);
        con.onDisconnect().remove();
    } else {
        var connectionsList = Object.keys(snap.val()).map(key => snap.val()[key])

        if (connectionsList.length === 1) {
            var con = connectionsRef.push(true);
            con.onDisconnect().remove();
            playerMarker = 'O'
        } 
    }

    $("#connected-viewers").text(snap.numChildren());
})

connectionsRef.on('child_removed', () => {
    database.ref().set({})
    $('#subtitle').text("The other player has left game");
})

// database.ref().on("value", function (snap) {
//     var playersList = snap.val().players;

//     if (!playersList) {
//         playerMarker = 'X'
        
//         players.push({
//             name: 'player1',
//         })
//     } else {
//         var playersArray = Object.keys(playersList).map(key => playersList[key])

//         if (playersArray.length === 1) {
//             players.push({
//                 name: 'player1',
//             })

//             playerMarker = 'O'
//         } else if (playersArray.length > 1) {
//             alert('the game is full');
//         }
//     }
// });

moves.on('child_added', (childSnap) => {
    myMove = !myMove;
    var move = childSnap.val();

    console.log(move.position)
    if (move.marker === 'X') {
        $('#' + move.position).attr('src', 'assets/images/x.png');
    } else {
        $('#' + move.position).attr('src', 'assets/images/o.png');
    }
});


players.on('child_removed', (childSnap) => {
    console.log('adsfds')
});

// // When first loaded or when the connections list changes...
// connectionsRef.on("value", function (snap) {


    
// });


// Branches to store each player's actions
var player1F = database.ref("/player1");
var player2F = database.ref("/player2");

// Variables for players' names
var player1Name;
var player2Name;

// ==========================================

var winningCombos = []; // stores winning combinations
var currentState = ["-", "-", "-", "-", "-", "-", "-", "-", "-"]; // current state of game board
var currentPlayer = 1; // tracks whose turn it is -- set to zero when stopped
var player1score = 00;
var player2score = 00;
var numberMoves = 0; // tracks total number clicks in game; calculations begin after 5 clicks
var gameStop = 0;  // if this variable remains at "0" at game end, the game was a tie
var clickedId; // store current div ID being clicked

// Accept players' names input
player1Name = $('#player1-name').text().trim();
player2Name = $('#player2-name').text().trim();

loadWinningCombos();  // load array of winning combos
console.log("Loaded winningCombos: " + winningCombos);

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

//==================================================

game.on("value", function (snapshot) {

    if (!snapshot.val()) {
        return;
    }

    // console.log("snapshot.val():  " + snapshot.val());
    // console.log("game.currentPlayerF:  " + game.currentPlayerF);
    var clickedIdF = snapshot.val().clickedIdF;
    var currentPlayerF = snapshot.val().currentPlayerF
    var numberMoveF = snapshot.val().numberMovesF;

    console.log("CurrentCLickID:" + clickedIdF);
    console.log("CurrentPlayer:" + currentPlayerF);

    // if ((currentPlayerF) == 2) {
    //     $('#' + clickedIdF).attr('src', 'assets/images/x.png'); // assign "X" image to img-src
    //     // flipSquare(clickedIdF);
    // }

    // else if ((currentPlayerF) == 1) {
    //     $('#' + clickedIdF).attr('src', 'assets/images/o.png'); // assign "O" image to img-src
    //     // flipSquare(clickedIdF);
    // }

    if (numberMoveF > 4) { // only start checking after 5 clicks
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
                (currentState[c] == "X")) {
                $('#subtitle').text("Player 1 wins");
                player1score++;  // add point to Player1
                gameStop = 1;
                currentPlayer = 0;
                numberMoves = 0;  // resets moves counter
                break;
            }
            else if
            ((currentState[a] == "O") &&
            (currentState[b] == "O") &&
                (currentState[c] == "O")) {
                $('#subtitle').text("Player 2 wins");
                player2score++;  // add point to Player2
                gameStop = 1;
                currentPlayer = 0;
                numberMoves = 0; // resets moves counter
                break;
            }

            else if ((numberMoves == 9) && (gameStop == 0)) {  // conditions for a tie
                $('#subtitle').text("It's a tie!");
                gameStop = 1;
                currentPlayer = 0;
                numberMoves = 0; // resets moves counter
                break;
            }
        }
    }
}, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
});


function playGame(clickedId) {
    console.log("clickedId = " + clickedId); // display number of box clicked
    console.log("currentPlayer: " + currentPlayer);

    gameStop = 0;
    numberMoves++;

    console.log(playerMarker)

    if (myMove) {
        moves.push({position: clickedId, marker: playerMarker})
    }
    

    // update board array (currentState)
    if (currentPlayer == 1) {
        
        currentState.splice((clickedId - 1), 1, "X");  // save play in array position 'clickedId-1'
        console.log('currentState:  ' + currentState);

        // $('#' + clickedId).attr('src', 'assets/images/x.png'); // assign "X" image to img-src
        // flipSquare(clickedId);

        currentPlayer = 2;
        console.log("currentPlayer switched to: " + currentPlayer);


    }
    else {
        currentState.splice((clickedId - 1), 1, "O"); // save play in array position 'clickedId-1'
        console.log('currentState:  ' + currentState);

        // $('#' + clickedId).attr('src', 'assets/images/o.png'); // assign "O" image to img-src
        // flipSquare(clickedId);

        currentPlayer = 1;
        console.log("currentPlayer switched to: " + currentPlayer);

    }

    // write values to Firebase
    game.set({
        currentStateF: currentState,
        currentPlayerF: currentPlayer,
        player1scoreF: player1score,
        player2scoreF: player2score,
        numberMovesF: numberMoves,
        gameStopF: gameStop,
        clickedIdF: clickedId
    });


    // // determine if there's a winner
    // if (numberMoves > 4) { // only start checking after 5 clicks
    //     for (var i = 0; i < winningCombos.length; i++) {
    //         // compare currentState array with all winningCombos nested arrays to test for match
    //         var a = winningCombos[i][0];
    //         var b = winningCombos[i][1];
    //         var c = winningCombos[i][2];
    //         console.log("var a = " + a);
    //         console.log("var b = " + b);
    //         console.log("var c = " + c);
    //         console.log("currentState[a] = " + currentState[a]);
    //         console.log("currentState[b] = " + currentState[b]);
    //         console.log("currentState[c] = " + currentState[c]);

    //         if ((currentState[a] == "X") &&
    //             (currentState[b] == "X") &&
    //             (currentState[c] == "X")) {
    //             $('#subtitle').text("Player 1 wins");
    //             player1score++;  // add point to Player1
    //             gameStop = 1;
    //             currentPlayer = 0;
    //             numberMoves = 0;  // resets moves counter
    //             break;
    //         }
    //         else if
    //         ((currentState[a] == "O") &&
    //         (currentState[b] == "O") &&
    //             (currentState[c] == "O")) {
    //             $('#subtitle').text("Player 2 wins");
    //             player2score++;  // add point to Player2
    //             gameStop = 1;
    //             currentPlayer = 0;
    //             numberMoves = 0; // resets moves counter
    //             break;
    //         }

    //         else if ((numberMoves == 9) && (gameStop == 0)) {  // conditions for a tie
    //             $('#subtitle').text("It's a tie!");
    //             gameStop = 1;
    //             currentPlayer = 0;
    //             numberMoves = 0; // resets moves counter
    //             break;
    //         }
    //     }
    // }
};
// detect changes in Firebase and update screen accordingly



// flip the block to the player's mark
function flipSquare(clickedId) {
    console.log("clickedId in flipSquare: " + clickedId);
    var currentSquareId = $('#square' + clickedId).attr('id'); // display id of square clicked
    console.log(currentSquareId);
    $('#square' + clickedId).flip(true);
    $('#square' + clickedId).flip({
        axis: "y",
        trigger: "manual"
    })
};


// function resetBoard() {
//     for (i=0; i<10; i++) {
//         $('#square' + i).attr(src)
//     }
// }
