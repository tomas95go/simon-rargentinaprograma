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
  sequence: 1,
};

const player = {
  name: '',
  color_sequence: [],
  sequence: 1,
};

let canContinue = true;

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
  for (let i = 0; i < playerSequence.length; i++) {
    if (playerSequence[i] !== gameSequence[i]) {
      canContinue = false;
    }
  }

  return canContinue;
}

function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function generateRandomColor(colors, randomNumber) {
  return colors[randomNumber];
}
