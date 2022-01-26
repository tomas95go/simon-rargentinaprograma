//Write tests for initializeGameSettings and initializePlayerSettings

console.assert(
  generateRandomNumber(1, 2) > 0,
  'Generated numbers exceed the min'
);

console.assert(
  generateRandomNumber(1, 2) < 3,
  'Generated numbers exceed the max range'
);

console.assert(
  generateRandomColor(['green', 'red', 'blue', 'yellow'], 2) === 'blue',
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
  evaluatePayerSequence(['red'], ['red'], true) === true,
  `Player sequence doesn't match game sequence`
);

console.assert(
  reset(['green', 'greeb', 'red', 'yellow', 'blue']) === 0,
  `Sequence didn't reset correctly`
);
