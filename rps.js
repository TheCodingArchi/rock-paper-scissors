let playerScore = 0;
let computerScore = 0;
let playerSelection = '';
let computerSelection = '';
let winner = '';
let winningState = '';
let roundNumber = 0;

const WINNINGPOINTS = 5;
const playerSelections = Array.from(document.querySelectorAll('.player-selection'));
const computerSelections = document.querySelectorAll('.computer-selection');
const humanScore = document.querySelector('.player-score');
const aiScore = document.querySelector('.computer-score');

playerSelections.forEach(playGame);
playerSelections.forEach(removeAnimation);
computerSelections.forEach(removeAnimation);

function playGame(element) {
    element.addEventListener('click', () => {
        const CHOICES = Array.from(computerSelections);
        let randomNumber = Math.floor(Math.random() * 3);

        playerSelection = element.id;
        computerSelection = CHOICES[randomNumber].id;

        getRoundWinner(playerSelection, computerSelection);
        humanScore.textContent = `${playerScore}`;
        aiScore.textContent = `${computerScore}`;
        animateSelection(element);
        animateSelection(CHOICES[randomNumber]);

        roundNumber++;

        displayRoundResults(element, CHOICES[randomNumber]);

        if (playerScore === WINNINGPOINTS || computerScore === WINNINGPOINTS) {
            disableSelection(playerSelections);
            setTimeout(displayGameWinner, 1200);
        }
    });
    restartGame();
}

function getRoundWinner(player, computer) {
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
}

function animateSelection(selection) {
    if (winner === 'tie') {
        return selection.classList.add('selected', 'tie-black', 'tie-black:hover');
    }
    else if (winner === selection.id) {
       return selection.classList.add('selected', 'win-green', 'win-green:hover');
    }
    return selection.classList.add('selected', 'lose-red', 'lose-red:hover');
}

function removeAnimation(e) {
    e.addEventListener('transitionend', (e) => {
        if (e.propertyName !== 'transform') {
            return;
        }
        e.target.classList.remove('selected', 'win-green', 'lose-red', 'tie-black');
    });
}

function displayRoundResults(player, computer) {
    const resultTableBody = document.querySelector('tbody');

    const tableRow = document.createElement('tr');
    const round = document.createElement('td');
    const human = document.createElement('td');
    const ai = document.createElement('td');
    const roundWinner = document.createElement('td');

    round.textContent = `${roundNumber}`;
    human.innerHTML = `<i class="far fa-hand-${player.id} fa-2x"></>`;
    ai.innerHTML = `<i class="far fa-hand-${computer.id} fa-2x"></>`;
    roundWinner.textContent = `${winningState}`;

    if (winner === 'tie') {
        human.style.color = '#001219';
        ai.style.color = '#001219';
    }
    else if (winner === player.id) {
       human.style.color = '#48ad8b';
       ai.style.color = '#AE2012';
    }
    else {
        ai.style.color = '#48ad8b';
        human.style.color = '#AE2012';
    }

    tableRow.appendChild(round);
    tableRow.appendChild(human);
    tableRow.appendChild(ai);
    tableRow.appendChild(roundWinner);

    resultTableBody.insertAdjacentElement('afterbegin', tableRow);
}

function disableSelection(selections) {
    selections.forEach((selection) => {
        selection.disabled = true;
        selection.classList.add('disable-click', 'disable-click:hover');
    });
}

function enableSelection(selections) {
    selections.forEach((selection) => {
        selection.disabled = false;
        selection.classList.remove('disable-click', 'disable-click:hover');
    });
}

function displayGameWinner() {
    const popupBox = document.querySelector('.popup-box');
    let popupMsg = document.querySelector('.popup-box p');
    popupBox.style.display = 'initial';

    if (playerScore > computerScore) {
        popupMsg.textContent = `Great Job! You won the game ${playerScore} - ${computerScore}, congratulations!`;
        popupBox.classList.add('popup-box-win');    
    }
    else {
        popupMsg.textContent = `Sorry! You lost the game ${playerScore} - ${computerScore}. Better luck next time.`;
        popupBox.classList.add('popup-box-lose');
    }    
}

function resetTable() {
    const rows = document.querySelectorAll('tbody > tr');
    rows.forEach((row) => {
        row.parentNode.removeChild(row);
    });
}

function restartGame() {
    const popupBox = document.querySelector('.popup-box');
    const popupBoxBtn = document.querySelector('.popup-box button');
    popupBoxBtn.addEventListener('click', () => {
        playerScore = 0;
        computerScore = 0;
        humanScore.textContent = 0;
        aiScore.textContent = 0;
        roundNumber = 0;
        resetTable();
        popupBox.style.display = 'none';
        popupBox.classList.remove('popup-box-win', 'popup-box-lose');
        enableSelection(playerSelections);
    });
}