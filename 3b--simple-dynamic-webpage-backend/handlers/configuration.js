'use strict';

const randomPicker = require('../common/lib/randomPicker');

let featureFlags = {
    title: true,
    navbar: true,
}

module.exports.getStyle = async (event, context) => {

    let styleA = {
        background: "tema4",
        navbarColor: "tema1"
    };

    let styleB = {
        background: "tema2",
        navbarColor: "tema3"
    };

    return {
        statusCode: 200,
        body: JSON.stringify(randomPicker.pickOne(styleA, styleB)),
    };
}


module.exports.getContent = async (event, context) => {

    let dataA = {
        title: "Foobar Soccer Table",
        navbar: ["Home", "Prenotazioni", "Prenota una partita", "Mappa", "Il tuo profilo"]
    }

    let dataB = {
        title: "Welcome to Foobar Soccer Table",
        navbar: ["Home", "Prenota una partita", "Raggiungici", "About us", "Registrati"]
    }

    return {
        statusCode: 200,
        body: JSON.stringify(randomPicker.pickOne(dataA, dataB)),
    };
}

module.exports.getFeatureFlags = async (event, context) => {
    return {
        statusCode: 200,
        body: JSON.stringify(featureFlags),
    };
}
