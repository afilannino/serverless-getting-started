'use strict';

module.exports.pickOne = (elementA, elementB) =>{
    if (Math.round(Math.random()) == 0) {
        return elementA;
    } else {
        return elementB;
    }
}
