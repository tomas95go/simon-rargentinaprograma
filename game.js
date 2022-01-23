const $startButton = document.getElementById('start-game');
$startButton.addEventListener('click', start, false);

const $greenButton = document.getElementById('green-button');
$greenButton.addEventListener('click', recordPlayerActions, false);

const $redButton = document.getElementById('red-button');
$redButton.addEventListener('click', recordPlayerActions, false);

const $blueButton = document.getElementById('blue-button');
$blueButton.addEventListener('click', recordPlayerActions, false);

const $yellowButton = document.getElementById('yellow-button');
$yellowButton.addEventListener('click', recordPlayerActions, false);

const game = {
  colors: ['green', 'red', 'blue', 'yellow'],
  color_sequence: [],
};

const player = {
  name: '',
  color_sequence: [],
  sequence: 1,
};

let canContinue = true;

function gameOver() {
  reset(game.color_sequence);
  reset(player.color_sequence);
  player.sequence = 1;
  canContinue = true;
  return canContinue;
}

function nextRound() {
  player.sequence += 1;
  reset(player.color_sequence);
  if (canContinue) {
    generateRandomColorSequence(game.color_sequence, game.colors);
  }
}

function start() {
  return generateRandomColorSequence(game.color_sequence, game.colors);
}

function recordPlayerActions(event) {
  const playerInput = capturePlayerInput(event);
  player.color_sequence.push(playerInput);
  canContinue = evaluatePayerSequence(
    player.color_sequence,
    game.color_sequence,
    canContinue
  );
}

function generateRandomColorSequence(colorSequence, colors) {
  const max = colors.length;
  const randomNumber = generateRandomNumber(0, max);
  const randomColor = generateRandomColor(colors, randomNumber);
  colorSequence.push(randomColor);
  return colorSequence.length;
}

function capturePlayerInput(event) {
  return event.target.value;
}

function evaluatePayerSequence(playerSequence, gameSequence, canContinue) {
  let correctAttempts = 0;
  for (let i = 0; i < playerSequence.length; i++) {
    if (playerSequence[i] !== gameSequence[i]) {
      canContinue = false;
    } else {
      correctAttempts += 1;
    }
  }

  if (canContinue && correctAttempts === gameSequence.length) {
    nextRound();
  }

  if (!canContinue) {
    canContinue = gameOver();
  }

  return canContinue;
}

function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function generateRandomColor(colors, randomNumber) {
  return colors[randomNumber];
}

function reset(sequence) {
  sequence.length = 0;
  return sequence.length;
}
