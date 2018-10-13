const chai = require('chai');
const assert = chai.assert;
const homeController = require('../../controller/homeController');

describe('homeController-handler', function () {

  describe('home() function', function () {
    let event = {
      foo: 'bar'
    };

    it('should return an object only with element \'statusCode\', \'header\' and \'body\'', async function () {
      const response = await homeController.home(event, {});
      assert.property(response, 'statusCode', 'statusCode not present');
      assert.property(response, 'headers', 'headers not present');
      assert.property(response, 'body', 'body not present');
      assert.equal(Object.keys(response).length == 3, true, 'Too much element in the returned object');
    });

  });

});