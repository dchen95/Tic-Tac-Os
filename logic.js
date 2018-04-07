// Initialize Firebase
var config = {
    apiKey: "AIzaSyBV3739k-US0QZdIjKtTvHUBaz6eKVtnLg",
    authDomain: "osss-ad20b.firebaseapp.com",
    databaseURL: "https://osss-ad20b.firebaseio.com",
    projectId: "osss-ad20b",
    storageBucket: "osss-ad20b.appspot.com",
    messagingSenderId: "199300245401"
};
firebase.initializeApp(config);


var database = firebase.database();
var game = database.ref("/game_stats");

// Contains Move Histories
var moves = database.ref("/moves");
var players = database.ref("/players");
var connectionsRef = database.ref("/connections");
var connectedRef = database.ref("/viewer");
var endthis = database.ref("/end");

var playerMarker = '';
var myMove = false
// var 

//Checks the connection 
connectionsRef.once('value', (snap) => {
    var connectedRef = database.ref("/viewer");
    if (!snap.val()) {
        playerMarker = 'X'
        myMove = true;
        var con = connectionsRef.push(true);
        con.onDisconnect().remove();
        $('#aniX').attr('src', 'assets/images/p1_on.png');
        alert('You are Player X')
    } else {
        var connectionsList = Object.keys(snap.val()).map(key => snap.val()[key])

        if (connectionsList.length === 1) {
            var con = connectionsRef.push(true);
            con.onDisconnect().remove();
            playerMarker = 'O'
            $('#aniO').attr('src', 'assets/images/p2_on.png');
            alert('You are Player O')
        } else if (connectionsList.length >= 2) {
            var view = connectedRef.push(true);
            view.onDisconnect().remove();
            alert('the game is full, but you can watch!');
        }
        console.log(connectionsList.length);
    }

})

connectedRef.on('value', (snap) => {
    if (!snap.val()) {
        return;
    }
    else {
        $("#connected-viewers").text(snap.numChildren());
    }
})



connectionsRef.on('child_removed', () => {
    database.ref().set({})
    $('#subtitle').text("The other player has left game, you cannot play anymore. Please refresh");
})


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

endthis.on('value', (snap) => {
    for (var i = 0 ; i<=9 ; i++){
        $('#' + i).attr('src', 'assets/images/blank.png');
    }
})


players.on('child_removed', (childSnap) => {
    console.log('adsfds')
});


var winningCombos = []; // stores winning combinations
var currentState = ["-", "-", "-", "-", "-", "-", "-", "-", "-"]; // current state of game board
var currentPlayer = 1; // tracks whose turn it is -- set to zero when stopped
var player1score = 00;
var player2score = 00;
var numberMoves = 0; // tracks total number clicks in game; calculations begin after 5 clicks
var gameStop = 0;  // if this variable remains at "0" at game end, the game was a tie
var clickedId; // store current div ID being clicked


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
    var clickedIdF = snapshot.val().clickedIdF;
    var currentPlayerF = snapshot.val().currentPlayerF
    var numberMoveF = snapshot.val().numberMovesF;

    console.log("CurrentCLickID:" + clickedIdF);
    console.log("CurrentPlayer:" + currentPlayerF);

}, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
});


function playGame(clickedId) {

    console.log(playerMarker)

    if (myMove) {
        moves.push({ position: clickedId, marker: playerMarker })
    }
};

$(document).ready(function(){
    $("#reset-button").on('click',function() {
        endthis.set('1');
        console.log("reset button has been clicked!");
    });
    });




// detect changes in Firebase and update screen accordingly