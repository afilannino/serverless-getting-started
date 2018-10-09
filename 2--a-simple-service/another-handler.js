'use strict';
const _ = require('lodash');

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


module.exports.appendExtension = async (event, context) => {

  if(!Array.isArray(JSON.parse(event.body))) {
    return {
      statusCode: 400
    }
  }

  if(event.pathParameters.extension.length > 5 || JSON.parse(event.body).length > 10) {
    return {
      statusCode: 400
    }
  }

  let resp = _.map(JSON.parse(event.body), (element) => {
    return element + '\.' + event.pathParameters.extension;
  });
  
  return {
    statusCode: 200,
    body:  JSON.stringify(resp)
  };
}
