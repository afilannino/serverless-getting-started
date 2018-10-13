const chai = require('chai');
const assert = chai.assert;
const Player = require('../../model/player');

describe('Player Model', function () {

  describe('getName() function', function () {

    let player = new Player('Mario');

    it('should return the name of player: \'Mario\'', async function () {
      const response = player.getName();
      assert.equal(response == 'Mario', true, 'Incorrect name of player');
    });

    it('should\'t return the name of player not equals: \'Mario\'', async function () {
      const response = player.getName();
      assert.notEqual(response == 'Mario', false, 'Incorrect name of player');
    });

  });

});