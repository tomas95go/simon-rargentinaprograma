//Write tests for initializeGameSettings and initializePlayerSettings
console.assert(
  performGameOver(
    {
      name: '',
      color_sequence: ['red'],
      sequence: 1,
      can_continue: true,
    },
    {
      colors: ['green', 'red', 'blue', 'yellow'],
      color_sequence: ['red'],
    }
  ) === 0,
  `Game didn't reset correctly`
);

console.assert(
  advanceRound(
    {
      name: '',
      color_sequence: ['red'],
      sequence: 1,
      can_continue: true,
    },
    {
      colors: ['green', 'red', 'blue', 'yellow'],
      color_sequence: ['red'],
    }
  ) === 2,
  `Game didn't advance to next level`
);

console.assert(
  recordPlayerActions(
    { target: { value: 'blue' } },
    {
      name: '',
      color_sequence: [],
      sequence: 1,
      can_continue: true,
    },
    {
      colors: ['green', 'red', 'blue', 'yellow'],
      color_sequence: ['blue'],
    }
  ) === true,
  `Player actions weren't recorded correctly`
);

console.assert(getRandomNumber(1, 2) > 0, 'Generated numbers exceed the min');

console.assert(
  getRandomNumber(1, 2) < 3,
  'Generated numbers exceed the max range'
);

console.assert(
  getRandomColor(['green', 'red', 'blue', 'yellow'], 2) === 'blue',
  `Generated color doesn't match`
);

console.assert(
  capturePlayerInput({ target: { value: 'red' } }) === 'red',
  `Captured color doesn't match!`
);

console.assert(
  generateRandomColorSequence([], ['green']) === 1,
  `Sequence can't be generated correctly`
);

console.assert(
  evaluatePlayerSequence(
    {
      name: '',
      color_sequence: ['red'],
      sequence: 1,
      can_continue: true,
    },
    {
      colors: ['green', 'red', 'blue', 'yellow'],
      color_sequence: ['red'],
    }
  ) === true,
  `Player sequence doesn't match game sequence`
);

console.assert(
  reset(['green', 'greeb', 'red', 'yellow', 'blue']) === 0,
  `Sequence didn't reset correctly`
);
