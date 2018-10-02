'use strict';

module.exports.myexample = async (event, context) => {

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Hi there!',
      pathParameters: event.pathParameters,
      queryStringParameters: event.queryStringParameters
    }),
  };
};
