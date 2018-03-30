
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

var winners = [];
var player1Selections = [];
var player2Selections = [];
var currentPlayer;
var move = 0;
var player1score = 0;    // player 1 points
var player2score = 0;    // player 2 points

// Accept players' names input
player1Name = $('#player1-name').val().trim();
player2Name = $('#player2-name').val().trim();

// Select player to start at random 
currentPlayer = Math.floor((Math.random() * 2) + 1);



// =====================================================

var handler = function(e) {
    if (currentPlayer == 1) {
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
            player1score++;
        else
            points2++;

        document.getElementById("player1").innerHTML = player1score;
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
    
    if (playerSelections.length >= wide) {
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