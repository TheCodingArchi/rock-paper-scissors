let playerScore = 0;
let computerScore = 0;
let winner = '';
let computerSelection = '';
let playerSelection = '';

const playerSelections = document.querySelectorAll('.player-selection');
const computerSelections = document.querySelectorAll('.computer-selection');

playerSelections.forEach(playRound);
playerSelections.forEach(removeAnimation);
computerSelections.forEach(removeAnimation);

function playRound(e) {
    e.addEventListener('click', () => {
        playerSelection = e.id;
        const CHOICES = Array.from(computerSelections);
        let randomNumber = Math.floor(Math.random() * 3);
        computerSelection = CHOICES[randomNumber].id;
        displayRoundWinner(playerSelection, computerSelection);
        animateSelection(e);
        animateSelection(CHOICES[randomNumber]);
    });
}

function animateSelection(selection) {
    if (winner === 'tie') {
        return selection.classList.add('selected', 'tie-black', 'tie-black:hover');
    }
    else if (winner === selection.id) {
       return selection.classList.add('selected', 'win-green', 'win-green:hover');
    }
    else if (winner !== selection.id) {
        return selection.classList.add('selected', 'lose-red', 'lose-red:hover');
    }
}

function removeAnimation(e) {
    e.addEventListener('transitionend', (e) => {
        if (e.propertyName !== 'transform') {
            return;
        }
        e.target.classList.remove('selected', 'win-green', 'lose-red', 'tie-black');
    });
}
/* function displaySelection (playerSelection, computerSelection) {
    return `Player: ${playerSelection}\nComputer: ${computerSelection}`;
} */

function displayRoundWinner(player, computer) {
    let winningState;

    if (player === 'rock' && computer === 'scissors') {
        winningState = 'You win! Rock crushes scissors';
        playerScore++;
        winner = player;
    }
    else if (player === 'rock' && computer === 'paper') {
        winningState = 'You lose! Paper wraps rock';
        computerScore++;
        winner = computer;
    }
    else if (player === 'paper' && computer == 'scissors')
    {
        winningState = 'You lose! Scissors cuts paper';
        computerScore++;
        winner = computer;
    }
    else if (player === 'paper' && computer === 'rock') {
        winningState = 'You win! Paper wraps rock';
        playerScore++;
        winner = player;
    }
    else if (player === 'scissors' && computer === 'paper') {
        winningState = 'You win! Scissors cuts paper';
        playerScore++;
        winner = player;
    }
    else if (player === 'scissors' && computer === 'rock') {
        winningState = 'You lose! Rock crushes scissors';
        computerScore++;
        winner = computer;
    }
    else {
        winningState = 'It\'s a tie!';
        playerScore += 0;
        computerScore += 0;
        winner = 'tie';
    }

    return winningState;
}

/* function addWinnerStyles(selection) {
    let playerSelection = getHumanPlay(e);
    let computerSelection = getComputerPlay(e);
    let winner = displayRoundWinner(playerSelection, computerSelection);
    if (winner.indexOf('You win!') !== -1) {
        return selection.classList.add('win-green');
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
    let playerSelection = getHumanPlay();
    let computerSelection = getComputerPlay();
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
 */