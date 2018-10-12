'use strict';

module.exports.view = ` 
<html>
    <head>
        <title>Serverless Webpage Example</title>
        <style>
            body {
                text-align: center;
                margin: 0;
            }
            ul {
                display: flex;
                flex-direction: row;
                list-style: none;
                padding: 0;
                justify-content: center;
                margin: 0 auto;
            }
            ul li {
                margin-left: 50px;
                margin-right: 50px;
                margin-top: 15px;
                margin-bottom: 15px;
            }
            .tema1 {
                background: lightgreen;
            }
            .tema2 {
                background: lightblue;
            }
            .tema3 {
                background: lightslategrey;
            }
            .tema4 {
                background: white;
            }
        </style>
    </head>
    <body class={{bodyClass}}>
        <h1>Serverless rocks!</h1>
        {{#if featureflags.title}}
            <h2>{{title}}</h2>
        {{/if}}

        {{#if featureflags.navbar}}
            <div class={{containerClass}}>
                <ul>
                    {{#each navBarElements}}
                        <li>{{this}}</li>
                    {{/each}} 
                </ul>
            </div>
        {{/if}}

        <ul>
            {{#each matches}}
                <li> {{#each this.players}}
                        {{this}}
                    {{/each}}
                {{this.timestamp}}</li>
            {{/each}} 
        </ul>
    </body>
</html>
`;


