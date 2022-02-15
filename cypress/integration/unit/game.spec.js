import {
  getRandomNumber,
  initializeGameSettings,
  initializePlayerSettings,
  capturePlayerInput,
  getRandomColor,
  reset,
} from '../../../game';

describe('Game functions', function () {
  it('Should initialize game properties', function () {
    const game = initializeGameSettings();
    expect(game.colors).to.deep.equal(['green', 'red', 'blue', 'yellow']);
    expect(game.color_sequence).to.be.empty;
  });

  it('Should initialize player properties', function () {
    const game = initializePlayerSettings();
    expect(game.color_sequence).to.be.empty;
    expect(game.sequence).to.be.equal(1);
    expect(game.can_continue).to.be.equal(true);
  });

  it('Should generate a random number between 1 and 4', function () {
    const result = getRandomNumber(1, 4);
    expect(result).to.be.within(1, 4);
  });

  it('Should generate a random color', function () {
    const colors = ['green', 'red', 'blue', 'yellow'];
    const number = 3;
    const color = getRandomColor(colors, number);
    expect(color).to.be.oneOf(colors);
  });

  it('Should capture player input', function () {
    const input = capturePlayerInput({ target: { value: 'red' } });
    expect(input).to.be.equal('red');
  });

  it('Should reset player/game color sequence', function () {
    const color_sequence = ['green', 'blue', 'blue', 'red', 'yellow'];
    const result = reset(color_sequence);
    expect(result).to.be.equal(0);
  });
});
