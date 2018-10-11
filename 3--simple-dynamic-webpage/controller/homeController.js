'use strict';

const handlebars = require('handlebars');
const request = require('request');
const homeView = require('../view/homeView');

module.exports.home = async (event, context) => {

  //let data = await getData(event);
  let data = {};
  let view = homeView.view;
  let template = handlebars.compile(view, {
    strict: true
  });

  let html = template(data);

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'text/html',
    },
    body: html,
  };

}

async function getData(event) {
  const urlStyle = '/config/style';
  const urlContent = '/config/content';
  const urlFeatures = '/config/featureflags';
  let url, style, content, features;

  if (event.headers.Hosts.indexOf('localhost') > -1) {
    url = 'https://localhost:12345';
  } else {
    url = 'PUT HERE YOUR PRODUCTION API URL'
  }

  urlStyle = url + urlStyle;

  await request({
    method: 'GET',
    uri: urlStyle
  }, function (error, response, body) {
    style = body;
  })

  // do the same for content and featureflags

  // combine data and return them

  return Object.assign({}, style);
}
