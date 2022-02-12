describe('The Game', function () {
  it('Should verify if the website is available', function () {
    cy.visit('https://tomas95go.github.io/simon-rargentinaprograma/');
  });

  it('Should verify that base components are present', function () {
    cy.contains('Start game');
    cy.get('.game-btn').should('have.attr', 'disabled');
  });

  it('Should play the game correctly', function () {
    cy.get('#start-game').contains('Start game').click();

    cy.get('#start-game').contains('Computers turn!');

    cy.get('.game-btn').filter('.light').as('clickedBtn');

    cy.get('.game-btn').should('not.have.attr', 'disabled');

    cy.get('#start-game').contains('Your turn!');

    cy.get('@clickedBtn').click();

    cy.get('#start-game').contains('Computers turn!');

    cy.get('.game-btn').should('not.have.attr', 'disabled');
  });

  it('Should be game over', function () {
    cy.reload();

    cy.get('#start-game').contains('Start game').click();

    cy.get('#start-game').contains('Computers turn!');

    cy.get('.game-btn').filter('.light').as('clickedBtn');

    cy.get('.game-btn').should('not.have.attr', 'disabled');

    cy.get('#start-game').contains('Your turn!');

    cy.get('@clickedBtn').then((btn) => {
      cy.get('.game-btn').not(btn).first().click();
    });

    cy.get('#start-game').contains('Game Over');

    cy.get('#start-game').contains('Start game');
  });
});
