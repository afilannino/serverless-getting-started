'use strict';

const handlebars = require('handlebars');
const homeView = require('../view/homeView');
const axios = require('axios');

// get an HTML with handlebar, giving in input data and template
function getHTML(data, view) {
  
  let template = handlebars.compile(view, {
    strict: true
  });

  return template(data)
}


// Return url of 3b service
function calculateUrl () {

  let url = 'PUT HERE YOUR API URL';
  if (process.env.IS_OFFLINE) {
    url = 'http://localhost:4001';
  }

  return url;
}


// retrieve configuration from URL
async function retrieveConfiguration(url) {
  console.log("Start Loading configuration from: " + url);
  let result = axios.get(url);
  console.log("Configuration from: " + url) + " loaded";;
  return result;
}

// retrieve responde array
async function retrieveResponse() {

  //retrieve style-configuration-type config
  let urlStyle = '/config/style';
  //retrieve content of matches
  let urlContent = '/config/content';
  //retrieve feature-flags configuration
  let urlFeatures = '/config/featureflags';
  //retrieve menu content
  let urlData = '/data';

  let url = calculateUrl();

  urlStyle = url + urlStyle;
  console.log("URL Style: " + urlStyle);
  urlContent = url + urlContent;
  console.log("URL Content: " + urlContent);
  urlFeatures = url + urlFeatures;
  console.log("URL Features: " + urlFeatures);
  urlData = url + urlData;
  console.log("URL Data: " + urlData);

  const retrieveData = async () => {
    console.log("Start loading configurations");

    let dataRetrieved = axios.all([
      retrieveConfiguration(urlStyle), 
      retrieveConfiguration(urlContent), 
      retrieveConfiguration(urlFeatures), 
      retrieveConfiguration(urlData),
    ]);

    return  dataRetrieved;
  };

  let responseArray = await retrieveData();
  console.log("Configurations loaded");

  return responseArray;

}



// retrieve data from 3b service
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



module.exports.home = async (event, context) => {

  // data retrieved by 3b service
  let data = await getData(event);

  // HTML template
  let view = homeView.view;

  // html ready to be printed
  let html = getHTML(data, view);

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'text/html',
    },
    body: html
  };

}
