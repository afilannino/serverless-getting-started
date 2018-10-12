const chai = require('chai');
const assert = chai.assert;
const retrieveDataHandler = require('../handlers/retrieveData');

describe('retrieveData-handler', function () {

  describe('getData() function', function () {
    let event = {
      foo: 'bar'
    };

    it('should return an object only with element \'statusCode\' and \'body\'', async function () {
      const response = await retrieveDataHandler.getData(event, {});
      assert.property(response, 'statusCode', 'statusCode not present');
      assert.property(response, 'body', 'body not present');
      assert.equal(Object.keys(response).length == 2, true, 'Too much element in the returned object');
    });

    it('should return a body with an array of \'match\'', async function () {
      const response = await retrieveDataHandler.getData(event, {});
      let body = JSON.parse(response.body);
      assert.isArray(body);
      body.forEach(element => {
        assert.property(element, 'players', 'players not present');
        assert.isArray(element.players);
        assert.property(element, 'timestamp', 'timestamp not present');
      });
    });
  });

});