'use strict';

const handlebars = require('handlebars');
const homeView = require('../view/homeView');
const axios = require('axios');


module.exports.home = async (event, context) => {

  // Data retrieved by 3b-service
  let data = await getData(event);

  // HTML template
  let view = homeView.view;

  // HTML ready
  let html = getHTML(data, view);

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'text/html',
    },
    body: html
  };
}

// Retrieve data from 3b service
async function getData(event) {

  let responseArray = await retrieveResponse();
  let result = {
    title: responseArray[1].data.title || {},
    containerClass: responseArray[0].data.navbarColor || {},
    bodyClass: responseArray[0].data.background || {},
    navBarElements: responseArray[1].data.navbar || {},
    matches: responseArray[3].data || {},
    featureflags: responseArray[2].data || {},
  };

  //console.log(result);
  return result;
}

// Retrieve responde array
async function retrieveResponse() {

  let url = getBaseURL();

  // URL for style configuration 
  let urlStyle = url + '/config/style';
  // URL for page contents
  let urlContent = url + '/config/content';
  // URL for feature-flags configuration
  let urlFeatures = url + '/config/featureflags';
  // URL for matches content
  let urlData = url + '/data';

  const retrieveData = async () => {
    //console.log("Start loading configurations");

    return axios.all([
      retrieveConfiguration(urlStyle), 
      retrieveConfiguration(urlContent), 
      retrieveConfiguration(urlFeatures), 
      retrieveConfiguration(urlData),
    ]);
  };

  let responseArray = await retrieveData();
  //console.log("Configurations loaded");
  return responseArray;
}

// Retrieve configuration from URL (return a Promise)
async function retrieveConfiguration(url) {
  let result = axios.get(url);
  return result;
}

// Boilerplate for rendering HTML with Handlebar from data and template
function getHTML(data, view) {
  let template = handlebars.compile(view, {
    strict: true
  });
  return template(data)
}

// Return URL of 3b-service
function getBaseURL () {
  let url = 'PUT HERE YOUR API URL';
  if (process.env.IS_OFFLINE) {
    url = 'http://localhost:4001';
  }
  return url;
}
