# Getting started with Serverless framework 🚀

[![Serverless Application Framework AWS Lambda API Gateway](https://s3.amazonaws.com/assets.github.serverless/readme-serverless-framework.jpg)](http://serverless.com)

## Requirements 🔧

In order to complete this starting tutorial, the following requirements must be satisfied:

- **NodeJS** v8.xx
- **Serverless** framework:
    `npm install -g serverless`
- An **AWS** account (free tier is enough)
  You need to set your AWS account to work properly on your local machine. Follow this easy and useful [serverless guide](https://serverless.com/framework/docs/providers/aws/guide/credentials/)
- **VisualStudio Code** is strongly suggested but not mandatory
- Run `npm install` in the services folders (when you enter for the first time)

---

## 1 - Basic template

First of all let's check if serverless is correctly installed:

`serverless`

Now we can create a new Serverless Service/Project from a basic template

`serverless create --template aws-nodejs --path 1--basic-template`

Change into the newly created directory

`cd 1--basic-template`

Let's take a look at `serverless.yaml`. We have:

```yaml
service: 1--basic-template
provider:
  name: aws
  runtime: nodejs8.10
functions:
  hello:
    handler: handler.hello
```

Serverless framework has created an AWS Lambda service for us!

You can see that there are a lot of commented lines of code. They are some examples of the possible configurations.

The functions associated with this service are specified into the same file but **we need to specify which are the events** that will trigger the functions execution.

For example let's specify an HTTP event on `/` path. The `serverless.yml` file will be:

```yaml
service: basic-template
provider:
  name: aws
  runtime: nodejs8.10
functions:
  hello:
    handler: handler.hello
    events:
      - http:
          path: '/'
          method: GET
```

### Functions 📈

Now, our Lambda function will answer with the `hello` function defined into `handler.js` file. The function will simply return the event that has triggered the function itself.

More information about [functions](https://serverless.com/framework/docs/providers/aws/guide/functions/).

### Serverless deploy 🏆

Let's see how this Lambda function can be easily deployed on AWS Lambda. In order to the that, you have correctly set up the credentials of your AWS account and then simply run:

`serverless deploy -v`

From logging lines you can see that **Serverless** automatically package our functions, creates a CloudFormation template with them, upload it to S3, validates it and finally creates an entire and functional infrastructure on AWS! 🔥🔥

More information about [serverless](https://serverless.com/framework/docs/providers/aws/guide/quick-start/).

### Serverless offline 💻

Very nice! But I don't want to go everytime on the cloud! Usually, developers want to try their code locally and check if everything is fine!

Let's see how to use `serverless-offline` plugin. This plugin will emulate locally the cloud environment where our Lambda function will be deployed and it will allow us to run locally our code.
We need to:

- install the plugin: `npm install serverless-offline --save-dev`
- add the plugin to `serverless.yml` file:

```yaml
plugins:
  - serverless-offline
```

Now the service is correctly configured to run locally. Simply run:

`serverless offline start`

Try to perform a GET on `localhost:3000`! You will have your response!

More information about [serverless-offline](https://www.npmjs.com/package/serverless-offline). More information about [plugins](https://serverless.com/framework/docs/providers/aws/guide/plugins/).

---

## 2 - A simple service

### Multiple functions, path parameters and query string parameters

For this simple Serverless service the base concepts are the same of the previous example but, differently, we have more Lambda functions for the same service as we can see in the `.yml` file:

```yaml
functions:
  hello:
    handler: handler.hello
    events:
      - http:
          path: '/'
          method: GET

  myfunction:
    handler: another-handler.myexample
    events:
      - http:
          path: '/myAPI/{mypath1}/{mypath2}'
          method: GET
  
  appendExtension:
    handler: another-handler.appendExtension
    events:
      - http:
          path: '/append/{extension}'
          method: POST
```

Looking at `myfunction` function, there are two **paths parameters**. Their values will be retrieved into `event` object and can be used for business logic purpose.The same thing happens for the **query string parameters**.

### Local debugging

In the `.vscode/launch.json` and `package.json` files there are some configurations script that will allow you to debug your Lambda functions locally with **Serverless offline** plugin and the **VisualStudio Code integrated debugger**. Just go on *Debug* tab and run the configuration.

### Unit tests

It is possible to perform unit tests with any npm test package. I made them using `mocha` and `chai`. To run tests:

`npm run test`

---

## 3 - A simple dynamic web page (A and B services)

The purpose of this service is to render a dynamic web page. The html is created with **Handlebar** template engine. The content and the style are provided by APIs in *3b-service* while the complete rendered html is provided by *3-service*.

*3b-service* performs A/B test on providing content and style. It is possible to configure the webpage by means of *feature flags*.

### Multiple functions, path parameters and query string parameters 🔍

For this simple Serverless service the base concepts are the same of the previous examples but, differently, we have more Lambda functions for the same service as we can see in the `.yml` file:

```yaml
functions:
  configurationStyle:
    handler: handlers/configuration.getStyle
    events:
      - http:
          path: '/config/style'
          method: GET

  configurationContent:
    handler: handlers/configuration.getContent
    events:
      - http:
          path: '/config/content'
          method: GET

  configurationFlags:
    handler: handlers/configuration.getFeatureFlags
    events:
      - http:
          path: '/config/featureflags'
          method: GET

  data:
    handler: handlers/retrieveData.getData
    events:
      - http:
          path: '/data'
          method: GET
```

### Sharing code among functions ♻️

It is useful/best practice to not write multiple times the same code if this is required in several different parts. It is possible to share code among functions by exporting it as a Javascript module.

`handlers/configuration.js` and `handlers/retrieveData.js` files share the code that is written into `common/lib/randomPicker.js` in the following way:

```javascript
const randomPicker = require('../common/lib/randomPicker');
```

### Local debugging 📛

In the `.vscode/launch.json` and `package.json` files there are some configurations script that will allow you to debug your Lambda functions locally with **Serverless offline** plugin and the **VisualStudio Code integrated debugger**. Just go on *Debug* tab and run the configuration.

### Unit tests ✅

It is possible to perform unit tests with any npm test package. I made them using `mocha` and `chai`. To run tests:

`npm run test`

or

`npm test`

---

## Thank you for your attention 👍🏻🍄👾

[![Thank you](https://www.humorside.com/wp-content/uploads/2017/12/thank-you-meme-28.jpg)](http://serverless.com)
