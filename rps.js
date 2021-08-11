let playerSelection;
let computerSelection;
let playerScore = 0;
let computerScore = 0;

function getComputerPlay() {
    let computerPlay = (Math.floor(Math.random() * 10)) % 3;

    if (computerPlay === 0) {
        return 'rock';
    }
    else if (computerPlay === 1) {
        return 'paper';
    }
    return 'scissors';
}

function getHumanPlay() {
    let humanPlay = prompt("Please enter one of rock, paper or scissors to play");
    let humanPlaySelection = humanPlay.toLowerCase();

    return humanPlaySelection;
}

function displaySelection (playerSelection, computerSelection) {
    return `Player: ${playerSelection}\nComputer: ${computerSelection}`;
}

function displayRoundWinner(player, computer) {
    let winningState;

    if (player === 'rock' && computer === 'scissors') {
        winningState = 'You win! Rock crushes scissors';
    }
    else if (player === 'rock' && computer === 'paper') {
        winningState = 'You lose! Paper wraps rock';
    }
    else if (player === 'paper' && computer == 'scissors')
    {
        winningState = 'You lose! Scissors cuts paper';
    }
    else if (player === 'paper' && computer === 'rock') {
        winningState = 'You win! Paper wraps rock';
    }
    else if (player === 'scissors' && computer === 'paper') {
        winningState = 'You win! Scissors cuts paper';
    }
    else if (player === 'scissors' && computer === 'rock') {
        winningState = 'You lose! Rock crushes scissors';
    }
    else {
        winningState = 'It\'s a tie!';
    }
    return winningState;
}

function getPlayerScore(winner) {
    if (winner.indexOf('You win!') !== -1) {
        return ++playerScore;
    }
    return playerScore += 0;
}

function getComputerScore(winner) {
    if (winner.indexOf('You lose!') !== -1) {
        return ++computerScore;
    }
    return computerScore += 0;
}

function displayScore(playerScore, computerScore) {
    return `PlayerScore: ${playerScore} ComputerScore: ${computerScore}`;
}

// Plays one round of game
function playRound() {
    playerSelection = getHumanPlay();
    computerSelection = getComputerPlay();
    let roundWinner = displayRoundWinner(playerSelection, computerSelection);
    playerScore = getPlayerScore(roundWinner);
    computerScore = getComputerScore(roundWinner);
    let selection = displaySelection(playerSelection, computerSelection);
    let scoreBoard = displayScore(playerScore, computerScore);

    return `${selection}\n${roundWinner}\n${scoreBoard}`;
}

// Plays 5 rounds of game or break when one player gets to 3
function playGame() {
    for (let i = 0; i < 5; i++) {
        console.log(playRound());
        if (playerScore === 3 || computerScore === 3) {
            break;
        }
    }

    console.log(`Final Score - Player: ${playerScore} Computer: ${computerScore}`);
    
    if (playerScore > computerScore) {
        console.log('Congratulations! You won the game!');
    }
    else if (playerScore < computerScore) {
        console.log('Sorry, you lost. Better luck next time!');
    }
    else {
        console.log('The game ends in a tie!');
    }
}


