const chai = require('chai');
const assert = chai.assert;
const anotherHandler = require('../another-handler');


describe('another-handler', function () {
  describe('myexample() function with empty input', function () {

    let event = {
      foo: 'bar'
    };

    it('should return an object only with element \'statusCode\' and \'body\'', async function () {
      const response = await anotherHandler.myexample(event, {});
      assert.property(response, 'statusCode', 'statusCode not present');
      assert.property(response, 'body', 'body not present');
      assert.equal(Object.keys(response).length == 2, true, 'Too much element in the returned object');

      let body = JSON.parse(response.body);
      assert.property(body, 'message', 'Default message \'Hi there!\' is not returned correctly');
    });
  });

  describe('myexample() function with query string parameters', function () {

    let event = {};
    before(() => {
      event = {
        foo: 'bar',
        queryStringParameters: {
          page: 'Homepage',
          lang: 'en'
        }
      };
    });

    it('should return the same query string parameters in the response', async function () {
      const response = await anotherHandler.myexample(event, {});
      const body = JSON.parse(response.body);
      assert.property(body, 'queryStringParameters', 'queryStringParameters is not present');
      assert.equal(body.queryStringParameters.page, event.queryStringParameters.page);
      assert.equal(body.queryStringParameters.lang, event.queryStringParameters.lang);
    });
  });

  describe('myexample() function with path parameters', function () {

    let event = {};
    before(() => {
      event = {
        foo: 'bar',
        pathParameters: {
          mypath1: 'fuzz',
          mypath2: 'buzz'
        }
      };
    });

    it('should return the same query path parameters in the response', async function () {
      const response = await anotherHandler.myexample(event, {});
      const body = JSON.parse(response.body);
      assert.property(body, 'pathParameters', 'pathParameters is not present');
      assert.equal(body.pathParameters.mypath1, event.pathParameters.mypath1);
      assert.equal(body.pathParameters.mypath2, event.pathParameters.mypath2);
    });
  });


  describe('appendExtension() function with correct input', function () {

    let event = {
      body: '[\"index\", \"foobar\"]',
      pathParameters: {
        extension: 'html'
      }
    };

    it('should return an array with the extension', async function () {
      const response = await anotherHandler.appendExtension(event, {});
      assert.equal(response.statusCode, 200);
      const body = JSON.parse(response.body);
      const myArray = JSON.parse(event.body);
      assert.isArray(body);
      assert.equal(body.length, 2);
      assert.equal(body[0], myArray[0] + '\.' + event.pathParameters.extension);
      assert.equal(body[1], myArray[1] + '\.' + event.pathParameters.extension);
    });
  });

  describe('appendExtension() function with incorrect input (too long array)', function () {

    let event = {
      body: '[\"too\", \"much\", \"long\", \"array\", \"please\", \"stop\", \"adding\", \"element\", \"into\", \"me\", \"bye\"]',
      pathParameters: {
        extension: 'js'
      }
    };

    it('should return a \'Bad request\' status code', async function () {
      const response = await anotherHandler.appendExtension(event, {});
      assert.equal(response.statusCode, 400);
      assert.equal(Object.keys(response).length, 1);
    });
  });

  describe('appendExtension() function with incorrect input (bad format body)', function () {

    let event = {
      body: 'this is not an array',
      pathParameters: {
        extension: 'py'
      }
    };

    it('should return a \'Bad request\' status code', async function () {
      const response = await anotherHandler.appendExtension(event, {});
      assert.equal(response.statusCode, 400);
      assert.equal(Object.keys(response).length, 1);
    });
  });

  describe('appendExtension() function with incorrect input (too long extension)', function () {

    let event = {
      body: '[\"index\", \"foobar\"]',
      pathParameters: {
        extension: 'thisistoolongsorry'
      }
    };

    it('should return a \'Bad request\' status code', async function () {
      const response = await anotherHandler.appendExtension(event, {});
      assert.equal(response.statusCode, 400);
      assert.equal(Object.keys(response).length, 1);
    });
  });
});