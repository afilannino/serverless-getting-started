'use strict';

// Return an element, A or B, in a randomic mode
module.exports.pickOne = (elementA, elementB) =>{

    let result = elementA;
    if (Math.round(Math.random()) == 0) {
        result = elementB;
    }

    return result;
}
