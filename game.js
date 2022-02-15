'use strict';

window.onload = function () {
  initializeGame();
};

function initializeGame() {
  lockGameButtons();
  const $startButton = document.getElementById('start-game');
  $startButton.addEventListener('click', () => start(game), false);

  const game = initializeGameSettings();

  const player = initializePlayerSettings();

  document
    .querySelectorAll('.game-btn')
    .forEach((btn) =>
      btn.addEventListener(
        'click',
        (event) => recordPlayerActions(event, player, game),
        false
      )
    );
}

function initializeGameSettings() {
  const game = {
    colors: ['green', 'red', 'blue', 'yellow'],
    color_sequence: [],
  };
  return game;
}

function initializePlayerSettings() {
  const player = {
    name: '',
    color_sequence: [],
    sequence: 1,
    can_continue: true,
  };

  return player;
}

function performGameOver(player, game) {
  lockGameButtons();
  const $startButton = document.getElementById('start-game');
  reset(game.color_sequence);
  reset(player.color_sequence);
  player.sequence = 1;
  player.can_continue = true;
  $startButton.textContent = `Game Over!`;

  setTimeout(function () {
    $startButton.removeAttribute('disabled');
    $startButton.textContent = `Start game`;
  }, 1000);

  return player.color_sequence.length;
}

function advanceRound(player, game) {
  player.sequence += 1;
  reset(player.color_sequence);
  if (player.can_continue) {
    generateRandomColorSequence(game.color_sequence, game.colors);
  }

  illuminateBtn(game);

  return player.sequence;
}

function start(game) {
  const $startButton = document.getElementById('start-game');
  $startButton.setAttribute('disabled', true);

  generateRandomColorSequence(game.color_sequence, game.colors);

  illuminateBtn(game);

  return game.color_sequence.length;
}

function recordPlayerActions(event, player, game) {
  const playerInput = capturePlayerInput(event);
  player.color_sequence.push(playerInput);
  player.can_continue = evaluatePlayerSequence(player, game);
  if (!player.can_continue) {
    performGameOver(player, game);
    player.can_continue = true;
  }
  return player.can_continue;
}

function generateRandomColorSequence(colorSequence, colors) {
  const max = colors.length;
  const randomNumber = getRandomNumber(0, max);
  const randomColor = getRandomColor(colors, randomNumber);
  colorSequence.push(randomColor);
  return colorSequence.length;
}

function capturePlayerInput(event) {
  return event.target.value;
}

function evaluatePlayerSequence(player, game) {
  let correctAttempts = 0;
  for (let i = 0; i < player.color_sequence.length; i++) {
    if (player.color_sequence[i] !== game.color_sequence[i]) {
      player.can_continue = false;
    } else {
      correctAttempts += 1;
    }
  }

  if (player.can_continue && correctAttempts === game.color_sequence.length) {
    advanceRound(player, game);
    player.can_continue = true;
  }

  return player.can_continue;
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function getRandomColor(colors, randomNumber) {
  return colors[randomNumber];
}

function reset(sequence) {
  sequence.length = 0;
  return sequence.length;
}

function illuminateBtn(game) {
  const $startButton = document.getElementById('start-game');
  let delay = 0;

  for (let i = 0; i < game.color_sequence.length; i++) {
    delay += 1;
    $startButton.textContent = `Computers turn!`;
    lockGameButtons();
    const $button = document.getElementById(`${game.color_sequence[i]}-button`);
    setTimeout(function () {
      $button.classList.add('light');
      playAudio(game.color_sequence[i]);
    }, 1000 * delay);
    setTimeout(function () {
      $button.classList.remove('light');
    }, 1100 * delay);

    if (delay === game.color_sequence.length) {
      setTimeout(function () {
        $startButton.textContent = `Your turn!`;
        unlockGameButtons();
      }, 1100 * delay);
    }
  }

  return true;
}

function playAudio(color) {
  let audio;
  switch (color) {
    case 'green':
      audio = new Audio(
        `https://s3.amazonaws.com/freecodecamp/simonSound1.mp3`
      );
      audio.play();
      break;
    case 'red':
      audio = new Audio(
        `https://s3.amazonaws.com/freecodecamp/simonSound2.mp3`
      );
      audio.play();
      break;
    case 'blue':
      audio = new Audio(
        `https://s3.amazonaws.com/freecodecamp/simonSound3.mp3`
      );
      audio.play();
      break;
    default:
      audio = new Audio(
        `https://s3.amazonaws.com/freecodecamp/simonSound4.mp3`
      );
      audio.play();
  }

  return color;
}

function lockGameButtons() {
  document
    .querySelectorAll('.game-btn')
    .forEach((btn) => btn.setAttribute('disabled', true));
}

function unlockGameButtons() {
  document
    .querySelectorAll('.game-btn')
    .forEach((btn) => btn.removeAttribute('disabled'));
}

export default {
  initializeGameSettings,
  initializePlayerSettings,
  getRandomNumber,
  capturePlayerInput,
  getRandomColor,
  reset,
};
