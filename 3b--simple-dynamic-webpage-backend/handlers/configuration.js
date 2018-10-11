'use strict';

const randomPicker = require('../common/lib/randomPicker');

let featureFlags = {
    title: true,
    navbar: true,
    footer: false
}

module.exports.getStyle = async (event, context) => {

    let styleA = {
        background: "light-green",
        navbarColor: "light-blue"
    };

    let styleB = {
        background: "light-grey",
        navbarColor: "light-red"
    };

    return {
        statusCode: 200,
        body: JSON.stringify(randomPicker.pickOne(styleA, styleB)),
    };
}


module.exports.getContent = async (event, context) => {

    let dataA = {
        title: "Sky Soccer Table",
        navbar: ["Home", "Prenotazioni", "Prenota una partita"]
    }

    let dataB = {
        title: "Welcome to Sky Soccer Table",
        navbar: ["Home", "Prenota una partita", "About us"]
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
