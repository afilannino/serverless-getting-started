'use strict';

const handlebars = require('handlebars');
const homeView = require('../view/homeView');
const axios = require('axios');

module.exports.home = async (event, context) => {

  let data = await getData(event);

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
    body: html
  };

}

async function getData(event) {
  let urlStyle = '/config/style';
  let urlContent = '/config/content';
  let urlFeatures = '/config/featureflags';
  let urlData = '/data';
  let url;

  if (process.env.IS_OFFLINE) {
    url = 'http://localhost:4001';
  } else {
    url = 'PUT HERE YOUR API URL';
  }

  urlStyle = url + urlStyle;
  urlContent = url + urlContent;
  urlFeatures = url + urlFeatures;
  urlData = url + urlData;

  function retrieveStyle() {
    return axios.get(urlStyle);
  }
   
  function retrieveContent() {
    return axios.get(urlContent);
  }

  function retrieveFeature() {
    return axios.get(urlFeatures);
  }

  function retrieveMatches() {
    return axios.get(urlData);
  }
   
  const retrieveData = async () => {
    return axios.all([
      retrieveStyle(), 
      retrieveContent(), 
      retrieveFeature(), 
      retrieveMatches(),
    ])
  };

  let responseArray = await retrieveData();

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
