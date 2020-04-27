// Il computer deve generare 16 numeri casuali tra 1 e 100, che saranno le "mine".
// In seguito deve chiedere all'utente di inserire un numero alla volta, sempre compreso tra 1 e 100, che sarà la sua giocata.
// Se il numero è presente nella lista delle mine, la partita termina, altrimenti il gioco continua chiedendo all'utente un altro numero (continua a giocare).
// La partita termina quando il giocatore becca una mina, ossia inserisce un numero "vietato", oppure se raggiunge il numero massimo possibile di numeri consentiti, ossia ha inserito tutti i numeri possibili che non sono mine!
// Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l'utente ha inserito un numero consentito; in altre parole, deve comunicare all'utente quante giocate ha fatto prima di perdere.

// SET UP GAME TABLE ----------------------------

// initializing gameTable
var gameTable = [];


// game difficulty setting:
// EASY: max = 100
// NORMAL: max = 80;
// HARD : max = 50;

// max number of tiles
var max = 0;

while ((max != 100) && (max != 80) && (max != 50)) {
    alert("Please choose a difficulty setting between 0, 1, and 2");
    var difficulty = parseInt(prompt("0 = 100 tiles, 1 = 80 tiles, 2 = 50 tiles"));
    if (difficulty == 0) {
        var max = 100;
    } else if (difficulty == 1) {
        var max = 80;
    } else if (difficulty == 2) {
        var max = 50;
    } else {
        alert("Wrong setting. Please type EASY, NORMAL or HARD.")
    }
}

// min number of tiles
var min = 1;

// filling the game table with numbers between 1 and max
for (var i = 0; i < max; i++) {
    gameTable[i] = i + 1;
}

// shorthand to get gameTable's content
var gameTableJoined = gameTable.join(", ");

// SET UP BOMB LIST -----------------------------

// initializing bombList
var bombList = [];

// max number of bombs
var maxBomb = 16;

// filling the list with 16 different numbers
// while the list isn't full (< 16)
while (bombList.length < maxBomb) {
    // get a random number in range between 1 and max
    var randomBomb = getRandomInRange(1, max);
    // look for any dupes,
    // doesn't push the bomb number if it's already in the list
    if (bombList.includes(randomBomb) == false) {
        bombList.push(randomBomb);
    }
}

// shorthand to get bombList's content
var bombListJoined = insertionSort(bombList).join(", ");

function getRandomInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// insertionSort to list bombList in an ascending order
function insertionSort (a) {
    for (var i = 0; i < a.length; i++) {
        var k = a[i];
        for (var j = i; j > 0 && k < a[j - 1]; j--)
            a[j] = a[j - 1];
        a[j] = k;
    }
    return a;
}

// MAIN GAME ------------------------------------
// valid moves counter
var moves = 0;

// game over status:
// false -> game still be in progress
// true -> game over
var gameOver = false;

// print first gameTable for clarity
console.log(gameTableJoined);

// game loop
while ( (gameOver == false) && (moves < (max - maxBomb) ) ) {
    // get a number from the player
    var playerNum = parseInt(prompt("Please enter a number between " + min + " and " + max + ": "));
    // check if given number is between 1 and 100/80/50
    if ((playerNum < min) || (playerNum > max)) {
        alert("Number out of range, retry.");
    // if the number IS in the gameTable & IS NOT a bomb
    } else if ((gameTable.includes(playerNum)) && (bombList.includes(playerNum) == false)) {
        // replace said number with NULL
        // overwriting the tiles' number is needed because gameTable's length must stay the same throughout the game
        gameTable.splice(playerNum - 1, 1, "NULL");
        // increase valid moves counter
        moves++;
        // print a new gametable
        console.log(gameTable.join(", "));
    // if the number IS NOT in the gameTable, then it's a NULL and it was erased previously
    } else if (gameTable.includes(playerNum) == false) {
        // so pick another one
        alert("Number not found, try another one");
    // if the number IS a bomb
    } else if (bombList.includes(playerNum)) {
        // it's game over
        gameOver = true;
    }
}

// end game message
// if gameOver is still false but the game got here, then the player guessed right for (max - maxBomb) times
if (gameOver == false) {
    // print victory message
    console.log("You win!");
} else {
    // print loss message with bomb's number that killed the player
    console.log("You lose! Tile number " + playerNum + " was a bomb.");
}

// game stats:
// number of right guesses
if (moves == 1) {
    // You guessed right 1 time
    console.log("You guessed right " + moves + " time.");
} else {
    // You guessed right n times
    console.log("You guessed right " + moves + " times.");
}
// full bomb list
console.log("The bomb list was: " + bombListJoined + ".");
