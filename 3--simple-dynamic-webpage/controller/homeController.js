'use strict';

const handlebars = require('handlebars');
const homeView = require('../view/homeView');
const axios = require('axios');

const Player = require('../model/player');
const Match = require('../model/match');

module.exports.home = async (event, context) => {

  let html = '';

  try {
    // Data retrieved by 3b-service
    let data = await getData(event);
    // HTML template
    let view = homeView.view;
    // HTML ready
    html = getHTML(data, view);
  }
  catch(error) {
    console.log('Cannot generate html' + error);
  }

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
  let matchList = getMatchList(responseArray[3].data);

  let result = {
    title: responseArray[1].data.title || {},
    containerClass: responseArray[0].data.navbarColor || {},
    bodyClass: responseArray[0].data.background || {},
    navBarElements: responseArray[1].data.navbar || {},
    featureflags: responseArray[2].data || {},
    match: matchList || {}, 
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

// return an array of match in matchList
function getMatchList(matchList) {

  let singleMatchList = [];
  let numberOfMatch = matchList.length;

  for (let i = 0; i < numberOfMatch; i++) {
    
    let currentMatch = matchList[i];
    let playerList = getPlayerList(currentMatch);
    let time = currentMatch.timestamp;
    
    singleMatchList.push(new Match(playerList,time));
  }
  //POST = matchList contains an array of match

  return singleMatchList;
}

// return an array Player in currentMatch
function getPlayerList(currentMatch) {

  const numberOfPlayer = 4;
  let playerList = [];

  for (let j = 0; j < numberOfPlayer; j++) {
    let giocatore = currentMatch.players[j];
    playerList.push(new Player(giocatore));
    //console.log(player.getName());
  }
  // POST = playerList contains 4 player of match currentMatch

  return playerList;
}