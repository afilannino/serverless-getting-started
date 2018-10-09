# Getting started with Serverless framework

## Requirements

- NodeJS
- Serverless framework:
    `npm install -g serverless`
- An AWS account (free tier is enough)
    You need to set your AWS account to work properly on your local machine.
    Follow this easy and useful [serverless guide](https://serverless.com/framework/docs/providers/aws/guide/credentials/)

---

## 1 - Basic template

- Create a new Serverless Service/Project
    `serverless create --template aws-nodejs --path 1--basic-template`
- Change into the newly created directory
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
The functions associated with this service are specified into the same file but we need to specify which are the events that will trigger the functions execution. For example let's specify an HTTP event on `/` path. The `serverless.yml` file will be:

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

#### Functions

Now, our Lambda function will answer with the `hello` function defined into `handler.js` file. The function will simply return the event that has triggered the function itself.

More information about [functions](https://serverless.com/framework/docs/providers/aws/guide/functions/).

#### Serverless offline

Let's see how to use `serverless-offline` plugin. This plugin will emulate locally the cloud environment where our Lambda function will be deployed and it will allow us to debug locally our code.
We need to:

- install the plugin: `npm install serverless-offline --save-dev`
- add the plugin to `serverless.yml` file:

```yaml
plugins:
  - serverless-offline
```

Now the service is correctly configured to run locally. Simply run: `serverless offline start`

More information about [serverless-offline](https://www.npmjs.com/package/serverless-offline). More information about [plugins](https://serverless.com/framework/docs/providers/aws/guide/plugins/).

#### Serverless deploy

Now that our service is ready, it can be deployed in AWS Lambda. In order to the that, you have correctly set up the credential of your AWS account and then simply run `serverless deploy -v`.
More information about [serverless](https://serverless.com/framework/docs/providers/aws/guide/quick-start/).

---

## 2 - A simple service

