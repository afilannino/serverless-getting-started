'use strict';

//exported module
module.exports.landingPage = (event, context, callback) => {

/*   let dynamicHtml = '<p>Hey Unknown!</p>';

  // check for GET params and use if available
  if (event.queryStringParameters && event.queryStringParameters.name) {
    dynamicHtml = `<p>Hey ${event.queryStringParameters.name}!</p>`;
  } */

    // an array of colors
    let colors = ['red', 'green', 'blue'];

    // a function to build a list
    let makeTemplate = function (data) {

        let newList = '';
        data.forEach(function(element) {
            newList += `<li>${element}</li>`;
        });

        return newList;
    };

    // build a container template
    let template = `<ul>
                    ${makeTemplate(colors)}
                </ul>`;

    // response
    const response = {
        statusCode: 200,
        headers: {
        'Content-Type': 'text/html',
        },
        body: template,
    };

    // callback is sending HTML back
    callback(null, response);
};
