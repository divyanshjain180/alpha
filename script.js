// --- GET HTML ELEMENTS ---
const instructionText = document.getElementById('instruction-text');
const guessInput = document.getElementById('guess-input');
const guessButton = document.getElementById('guess-button');
const messageText = document.getElementById('message-text');
const attemptsLeftSpan = document.getElementById('attempts-left');
const roundsWonSpan = document.getElementById('rounds-won');
const totalScoreSpan = document.getElementById('total-score');
const playAgainButton = document.getElementById('play-again-button');

// --- GAME VARIABLES ---
const minRange = 1;
const maxRange = 100;
const maxAttempts = 10;

let totalScore = 0;
let roundsWon = 0;
let numberToGuess = 0;
let attempts = 0;
let gameActive = true;

// --- FUNCTIONS ---

// Function to start a new round
function startNewRound() {
    // Generate a new random number
    numberToGuess = Math.floor(Math.random() * (maxRange - minRange + 1)) + minRange;
    attempts = 0;
    gameActive = true;

    // Reset the UI
    instructionText.textContent = `I'm thinking of a number between ${minRange} and ${maxRange}.`;
    messageText.textContent = "Good luck!";
    messageText.style.color = '#333';
    guessInput.value = "";
    guessInput.disabled = false;
    guessButton.disabled = false;
    attemptsLeftSpan.textContent = maxAttempts;
    playAgainButton.classList.add('hidden');
}

// Function to handle the user's guess
function checkGuess() {
    if (!gameActive) return;

    const userGuess = parseInt(guessInput.value);

    // Validate input
    if (isNaN(userGuess) || userGuess < minRange || userGuess > maxRange) {
        messageText.textContent = `Please enter a number between ${minRange} and ${maxRange}.`;
        messageText.style.color = 'orange';
        return;
    }

    attempts++;
    
    if (userGuess < numberToGuess) {
        messageText.textContent = "Too low! Try a higher number.";
        messageText.style.color = 'blue';
    } else if (userGuess > numberToGuess) {
        messageText.textContent = "Too high! Try a lower number.";
        messageText.style.color = 'red';
    } else {
        // Correct guess
        messageText.textContent = `Congratulations! You guessed it in ${attempts} attempts.`;
        messageText.style.color = 'green';
        roundsWon++;
        totalScore += (maxAttempts - attempts + 1);
        endRound();
    }

    attemptsLeftSpan.textContent = maxAttempts - attempts;

    // Check for loss condition
    if (attempts >= maxAttempts && gameActive) {
        messageText.textContent = `You're out of attempts! The number was ${numberToGuess}.`;
        messageText.style.color = 'red';
        endRound();
    }
}

// Function to end the current round
function endRound() {
    gameActive = false;
    guessInput.disabled = true;
    guessButton.disabled = true;
    roundsWonSpan.textContent = roundsWon;
    totalScoreSpan.textContent = totalScore;
    playAgainButton.classList.remove('hidden');
}


// --- EVENT LISTENERS ---

// When the 'Guess' button is clicked
guessButton.addEventListener('click', checkGuess);

// Allow pressing 'Enter' to guess
guessInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        checkGuess();
    }
});

// When the 'Play Again' button is clicked
playAgainButton.addEventListener('click', startNewRound);


// --- INITIALIZE GAME ---
startNewRound();
