// Initialize Firebase
var config = {
    apiKey: "AIzaSyDZ8r0uAB4Q5c20UE3na58N4nGTs4YLrqA",
    authDomain: "grasselli-project.firebaseapp.com",
    databaseURL: "https://grasselli-project.firebaseio.com",
    projectId: "grasselli-project",
    storageBucket: "grasselli-project.appspot.com",
    messagingSenderId: "340641414189"
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

var winners = []; // stores winning combinations
var player1Selections = [];
var player2Selections = [];
var currentPlayer = 1;
var player1score = 0;
var player2score = 0;
var numberMoves = 0; // tracks total number clicks in game; calculations begin after 5 clicks

// Accept players' names input
player1Name = $('#player1-name').text().trim();
player2Name = $('#player2-name').text().trim();



//==================================================


function markBox(clickedId) {
    console.log("Button clicked # " + clickedId);
    console.log("currentPlayer: " + currentPlayer);

    numberMoves++;

    console.log("currentPlayer:  " + currentPlayer);
    
    
    if (currentPlayer == 0) {
        // var test = parseInt(clickedId);
        // console.log("test:  " + test);
        
        console.log('clickedId = ' + clickedId);
        $('#' + clickedId).text("X"); // flip this box to "X" image
                
        player1Selections.push(clickedId);
        console.log('player1Selections:  ' + player1Selections);
    }
    else {
        player2Selections.push(clickedId);
        console.log('player2Selections:  ' + player1Selections);
    }

    if (numberMoves > 4) { // only start checking after 5 clicks


    }
};





function loadWiningCombos() {
    winningCombos.push([1, 2, 3]);
    winningCombos.push([4, 5, 6]);
    winningCombos.push([7, 8, 9]);
    winningCombos.push([1, 4, 7]);
    winningCombos.push([2, 5, 8]);
    winningCombos.push([3, 6, 9]);
    winningCombos.push([1, 5, 9]);
    winningCombos.push([3, 5, 7]);
};

//============================================================
// original model below vvvv =================================
//============================================================


var winners = new Array();
var player1Selections = new Array();
var player2Selections = new Array();
var timer;
var numberOfPlayers = 2;
var currentPlayer = 0;
var move = 0;
var points1 = 0;    // player 1 points
var points2 = 0;    // player 2 points
var size = 3;

function drawBoard() {
    var Parent = document.getElementById("game");
    var counter = 1;
    
    while (Parent.hasChildNodes()) {
        Parent.removeChild(Parent.firstChild);
    }

    for (s = 0; s < 3; s++) {
        var row = document.createElement("tr");
        
        for (r = 0; r < 3; r++) {
            var col = document.createElement("td");
            col.id = counter;
            col.innerHTML = counter;

            var handler = function(e) {
                if (currentPlayer == 0) {
                    this.innerHTML = "X";
                    player1Selections.push(parseInt(this.id));
                    player1Selections.sort(function(a, b) { return a - b });
                }

                else {
                    this.innerHTML = "O";
                    player2Selections.push(parseInt(this.id));
                    player2Selections.sort(function(a, b) { return a - b });
                }

                move++;
                var isWin = checkWinner();

                if (isWin)
                {
                    if(currentPlayer == 0)
                        points1++;
                    else
                        points2++;

                    document.getElementById("player1").innerHTML = points1;
                    document.getElementById("player2").innerHTML = points2;

                    reset();
                    drawBoard();
                }

                else
                {
                    if (currentPlayer == 0)
                        currentPlayer = 1;
                    else
                        currentPlayer = 0;
                    this.removeEventListener('click', arguments.callee);
                }
            };

            col.addEventListener('click', handler);

            row.appendChild(col);
            counter++;
        }

        Parent.appendChild(row);
    }

    loadAnswers();
}

function reset()
{
    currentPlayer = 0;
    player1Selections = new Array();
    player2Selections = new Array();
}

function loadAnswers()
{
    winners.push([1, 2, 3]);
    winners.push([4, 5, 6]);
    winners.push([7, 8, 9]);
    winners.push([1, 4, 7]);
    winners.push([2, 5, 8]);
    winners.push([3, 6, 9]);
    winners.push([1, 5, 9]);
    winners.push([3, 5, 7]);
}

function checkWinner() {
    // check if current player has a winning hand
    // only stsrt checking when player x has size number of selections
    var win = false;
    var playerSelections = new Array();

    if (currentPlayer == 0)
        playerSelections = player1Selections;
    else
	playerSelections = player2Selections;
    
    if (playerSelections.length >= size) {
        // check if any 'winners' are also in your selections
        
        for (i = 0; i < winners.length; i++) {
            var sets = winners[i];  // winning hand
            var setFound = true;
            
            for (r = 0; r < sets.length; r++) {
                // check if number is in current players hand
                // if not, break, not winner
                var found = false;
                
                // players hand
                for (s = 0; s < playerSelections.length; s++) {
                    if (sets[r] == playerSelections[s]) {
                        found = true;
                        break;
                    }
                }

                // value not found in players hand
                // not a valid set, move on
                if (found == false) {
                    setFound = false;
                    break;
                }
            }

            if (setFound == true) {
                win = true;
                break;
            }
        }
    }

    return win;
} 

// window.onload = drawBoard;
// </script>
// </head>

// <body>
// <div style="text-align:center;margin:0 auto;width:50%;padding-top:20px;">
// <br/>
// <div style="float:left;">
// Player 1

// <div style="font-size:30pt;" id="player1">
// 0
// </div>
// </div>

// <table id="game" style="float:left;margin-left:20px;">
// </table>

// <div style="float:left;margin-left:20px;">
// Player 2
// <div id="player2" style="font-size:30pt;">0</div>
// </div>

// <div class="clear"></div>
// </div>
// </body>
// </html> 