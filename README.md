# An analysis of node lambda deployment tools

Up for analysis:

 * CloudFormation (https://aws.amazon.com/cloudformation/)
 * Serverless Application Model (SAM) (https://github.com/awslabs/serverless-application-model)
 * Terraform (https://www.terraform.io/)
 * Serverless Framework (https://serverless.com/)
 * Netlify (https://www.netlify.com/)
 * Claudia.js (https://claudiajs.com/)
 * ZEIT's Now (https://zeit.co/now)

Others? (worthy mentions?):

 * Apex (https://apex.run/)
 * Up (https://github.com/apex/up)
 * Architect (https://arc.codes/)
 * faast.js (https://faastjs.org/)
 * pulumi?
 * packer
 * sceptre (https://github.com/cloudreach/sceptre)
 * http://senecajs.org/

## Considerations for discussion

 * Vendor lock-in ( https://www.theregister.co.uk/2017/11/06/coreos_kubernetes_v_world/ https://lumigo.io/blog/you-are-wrong-about-serverless-vendor-lock-in/ )
 * Maturity/ opinionated/ customizable/ cloud agnostic/ cost/ configuration based or configuration free/ focused on what AWS resources you can configure?

## Research:

 * https://geekflare.com/serverless-apps-frameworks/
 * https://serverless.com/learn/comparisons/ (serverless framework sales tool of course)
 * https://github.com/awslabs/aws-cdk - what is the AWS Cloud Development Kit
 * https://lumigo.io/blog/comparison-of-lambda-deployment-frameworks/
 * https://serverless-stack.com/

 "Building and deploying serverless JS"

 An overview of some of the options out there for building a cloud native backend in JavaScript minimising effort and maintenance. There are an awful lot of options out there from "Define everything yourself" AWS Cloudformation or Terraform at 1 end of the spectrum 

abstract:

"Serverless platforms offer the promise of providing a simpler model for hosting an application in the cloud. The ecosystem is still immature and evolving at a frightening pace. This talk will be an overview of where we are currently, focused on AWS, but exploring the various options out there for making the building, deployment and maintenance of your application simpler."

A look at claudia:

claudia tutorial: https://claudiajs.com/tutorials/installing.html
export AWS_PROFILE=claudia
check out using IAM?


whats it's sweet spot?

"Use API Gateway as it if were a lightweight JavaScript web server"
super super simple if you just want "a function in the cloud"
good for chat bots - it has a bot builder built in

open source
good responses to issues

local story: unit tests only - integration tests etc. - deploy to cloud - luckily deployment is quick and simple

## Talk structure

 * what is serverless/ lambda
 * define infrastructure as code
 * brief overview of aws resources you might use with lambda
 * some interesting use cases of lambda
   * server rendering
   * chat bots
   * alexa apps?
   * web app workers
   * full on web backends?
 * examples of provisioning lambda backends using javascript
 * wider discussion on other provisioning methodologies

topics: what is lambda proxy integration?

using lambda as a web server

using express? use `aws-serverless-express` to translate an api-gateway request into an express request/response

bit heavy weight - important to keep lambdas light - so recommend to use Jeremy Dalys (https://www.jeremydaly.com/) `lambda api` (https://github.com/jeremydaly/lambda-api)

topics: stages and step functions?


## Notes on claudia

Problems:

 1. if create fails half way through - end up with resources created that have to be deleted manually - leaves things around
 2. very simple namespacing based on app name - chance of collisions - not going to work in an account that is used for other things
 3. using legacy slack integrations - should use the events api instead of outgoing webhooks
 4. no management of other aws resources, e.g. s3/sns/dynamodb etc. - very limited to lambda only with some automated api gateway stuff on top

Nice things:

 1. Got some nice extension points - post deploy hooks with promisified api gateway object etc.
 2. built in support for generating an 'aws-serverless-express' web server
 3. build in support for responding to s3 events/ sns event source

Good use cases:

 3. bots - slack bot/ alexa skill etc.
 4. simple website functionality - e.g. save some details in dynamo or stripe payment integration

