const chai = require('chai');
const assert = chai.assert;
const handler = require('../handler');


describe('handler', function () {
    describe('hello() function with empty input', function () {

        let event = {
            foo: "bar"
        };

        it('should return an object only with element \'statusCode\' and \'body\'', async function () {
            const response = await handler.hello(event, {});
            assert.property(response, 'statusCode', '\'statusCode\' not present');
            assert.property(response, 'body', '\'body\' not present');
            assert.equal(Object.keys(response).length, 2, '\'Too much element in the returned object\'');
            
            let body = JSON.parse(response.body);
            assert.property(body, 'input', 'Trigger event is not returned correctly');
            assert.deepEqual(body.input, event);
        });
    });

});