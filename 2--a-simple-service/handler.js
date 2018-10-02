'use strict';

module.exports.hello = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Your function in \'hello\' service executed successfully!',
      input: event,
    }),
  };
}
