const $startButton = document.getElementById('start-game');
$startButton.addEventListener('click', start, false);

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

function gameOver(player, game) {
  reset(game.color_sequence);
  reset(player.color_sequence);
  player.sequence = 1;
  player.can_continue = true;
  return player.can_continue;
}

function nextRound(player, game) {
  player.sequence += 1;
  reset(player.color_sequence);
  if (player.can_continue) {
    generateRandomColorSequence(game.color_sequence, game.colors);
  }

  light(game);

  return player.can_continue;
}

function start() {
  const game = initializeGameSettings();

  const player = initializePlayerSettings();

  const $greenButton = document.getElementById('green-button');
  $greenButton.addEventListener(
    'click',
    function (event) {
      recordPlayerActions(event, player, game);
    },
    false
  );

  const $redButton = document.getElementById('red-button');
  $redButton.addEventListener(
    'click',
    function (event) {
      recordPlayerActions(event, player, game);
    },
    false
  );

  const $blueButton = document.getElementById('blue-button');
  $blueButton.addEventListener(
    'click',
    function (event) {
      recordPlayerActions(event, player, game);
    },
    false
  );

  const $yellowButton = document.getElementById('yellow-button');
  $yellowButton.addEventListener(
    'click',
    function (event) {
      recordPlayerActions(event, player, game);
    },
    false
  );

  generateRandomColorSequence(game.color_sequence, game.colors);

  light(game);

  return game.color_sequence.length;
}

function recordPlayerActions(event, player, game) {
  const playerInput = capturePlayerInput(event);
  player.color_sequence.push(playerInput);
  player.can_continue = evaluatePayerSequence(player, game);
  if (!player.can_continue) {
    player.can_continue = gameOver(player, game);
  }
  return player.can_continue;
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

function evaluatePayerSequence(player, game) {
  let correctAttempts = 0;
  for (let i = 0; i < player.color_sequence.length; i++) {
    if (player.color_sequence[i] !== game.color_sequence[i]) {
      player.can_continue = false;
    } else {
      correctAttempts += 1;
    }
  }

  if (player.can_continue && correctAttempts === game.color_sequence.length) {
    player.can_continue = nextRound(player, game);
  }

  return player.can_continue;
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

function light(game) {
  let delay = 0;
  for (let i = 0; i < game.color_sequence.length; i++) {
    delay += 1;
    const $button = document.getElementById(`${game.color_sequence[i]}-button`);
    setTimeout(function () {
      $button.classList.add('light');
    }, 1000 * delay);
    setTimeout(function () {
      $button.classList.remove('light');
    }, 1250 * delay);
  }
  return true;
}
