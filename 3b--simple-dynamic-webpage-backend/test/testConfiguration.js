const chai = require('chai');
const assert = chai.assert;
const configurationHandler = require('../handlers/configuration');


describe('configuration-handler', function () {
  
  describe('getStyle() function', function () {
    let event = {
      foo: 'bar'
    };

    it('should return an object only with element \'statusCode\' and \'body\'', async function () {
      const response = await configurationHandler.getStyle(event, {});
      assert.property(response, 'statusCode', 'statusCode not present');
      assert.property(response, 'body', 'body not present');
      assert.equal(Object.keys(response).length == 2, true, 'Too much element in the returned object');
    });

    it('should return a body with \'background\' and \'navbarColor\'', async function () {
      const response = await configurationHandler.getStyle(event, {});
      let body = JSON.parse(response.body);
      assert.property(body, 'background', 'background not present');
      assert.property(body, 'navbarColor', 'navbarColor not present');
    });
  });

  describe('getContent() function', function () {
    let event = {
      foo: 'bar'
    };

    it('should return an object only with element \'statusCode\' and \'body\'', async function () {
      const response = await configurationHandler.getContent(event, {});
      assert.property(response, 'statusCode', 'statusCode not present');
      assert.property(response, 'body', 'body not present');
      assert.equal(Object.keys(response).length == 2, true, 'Too much element in the returned object');
    });
    
    it('should return a body with \'title\' and \'navbar\'', async function () {
      const response = await configurationHandler.getContent(event, {});
      let body = JSON.parse(response.body);
      assert.property(body, 'title', 'title not present');
      assert.property(body, 'navbar', 'navbar not present');
    });
  });

  describe('getFeatureFlags() function', function () {
    let event = {
      foo: 'bar'
    };

    it('should return an object only with element \'statusCode\' and \'body\'', async function () {
      const response = await configurationHandler.getContent(event, {});
      assert.property(response, 'statusCode', 'statusCode not present');
      assert.property(response, 'body', 'body not present');
      assert.equal(Object.keys(response).length == 2, true, 'Too much element in the returned object');
    });
    
    it('should return a body with \'title\' and \'navbar\'', async function () {
      const response = await configurationHandler.getContent(event, {});
      let body = JSON.parse(response.body);
      assert.property(body, 'title', 'title not present');
      assert.property(body, 'navbar', 'navbar not present');
    });
  });
});

