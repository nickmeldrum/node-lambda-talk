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


## Talk structure

 * what
 * who
 * why
 * how

 * apologies: all about aws... there are other megacorp cloud providers out there!

 * what
   (https://serverless-stack.com/chapters/what-is-serverless.html)
   (https://martinfowler.com/articles/serverless.html)
   * what is serverless?
     * depends on your context:
       * could mean "FAAS": aws lambda/ GCP cloud functions/ azure functions
       * could mean "managed services": aws cognito, dynamodb, sns, sqs, appsync, cloudfront, api gateway etc. etc. - i.e. you can create a whole backend without having to manage a single server/ ec2 instance
       * confusingly could mean "the serverless framework" - a cloud deployment framework that is cleverly calling themselves "serverless" from a branding perspective
      * (TODO: check that lambda/terraform youtube talk for good description - bookmarked on home macbook?)
      https://www.youtube.com/watch?v=HHCDLyLX7I0&t=328s
   * what is lambda?
 * who (image ideas: megacorp)
   * cloud providers:
     * aws lambda (what we will be focusing on
     * GCP cloud functions
     * Azure functions
     * Qinling (OpenStack) (extra image idea: hippy? something less pejorative?)
 * why
   * history of hosting applications:
     * old days: server in the office server room - make sure you don't kick the power supply on the way out! - system down!
     * data centers: I still buy the server, manage the hardware, manage the OS, manage the services, do the patching, pay for and manage all licenses, manage hack attacks etc. etc.
     * cloud 1.0 comes along: VPS - now I don't have to manage my hardware - yay! - still have to patch the OS, manage services, manage license, manage hacks etc.
     * cloud 2.0 comes along: "compute instances" (otherwise known as EC2!) - now I don't have to manage
     * TODO ^ above is wrong about VPS/ EC2 - also continue with v3 - what is serverless above ec2?
     VPS around 2001 - VMWare ESX Server
      most systems/ companies I have been involved with still used their own tin in a dc isntead of vps - probably concerns about virtualization? but small systems could use them - hard to scale though. web applications were being built often assuming they would only work on 1 web server - large effort to build an application that would work on a "web farm" and often times the tin would have to be bought for peak scale and just be sitting around the rest of the year.
     EC2 released 2006 - essentially a VPS still but with some key improvements that opened up a whole new world:
       * pay by the hour instead of by the month
       * still more expensive if on all the time
       * orchestration interface
       * provides "elasticity"
    2009 Got a bit more reasonable to use - with ELB, RDS, Cloudwatch, Cloudfront and VPCs
     Lambda released 2014
			 * Function as a service
          * don't have to manage the OS, patching, licenses etc
          * "pay as you go" - pay per execution (and it's cheap)
          * holds the promise of reduced complexity in the future, but for now it's still pretty complex, the complexity has just moved to a different place (complexity in rigorous splitting up and decoupling of your system, kdealing with throttling and cold starts, in dealing with good monitoring, ....)
          * but more than elasticity it gives amazing flexibility
          * automatic horizontal scaling with zero effort
          * LOTS of limitations which if you don't respect can SERIOUSLY bite you in the ass (limit on concurrent executions i.e. throttling, startup latency i.e. cold starts, local testing)
     * then mention containers/k8s?
 * how

serverless: why choose javascript?

  Java, Go, PowerShell, Node.js JavaScript, C#, Python, and Ruby

Java and C# suffers from slow startup times (being worked on but still) and needs higher Memory footprint
warm perf: .Net core 2.0 easily winning benchmarks
Go or Node.js can be fast with smaller footprint
Node and Python have great platform support: AWS, Azure and GCP
Node is JavaScript - largest number of devs "know it"
Node.js well suited, fast start

No of devs globally:

|------------|----------------|
| Language   | Number of devs |
|------------|----------------|
| Java       | 7,600,000      |
| JavaScript | 10,700,000     |
| C#         | 6,200,000      |
| Python     | 7,000,000      |
|------------|----------------|

Source: Slashdot

StackOverflow survey 2019: Programming languages:

|------------|----------------------------|
| Language   | Number of respondents used |
|------------|----------------------------|
| JavaScript | 67.8%                      |
| Python     | 41.7%                      |
| Java       | 41.1%                      |
| C#         | 31.0%                      |
| Go         | 8.2%                       |
|------------|----------------------------|

The deployment techs

|----------------------|--------------|---------------------------|----------|
| Name                 | Code/ Config | Opinionated -> Complexity | Maturity |
|----------------------|--------------|---------------------------|----------|
| Cloudformation/SAM   | Config       | Complex                   | V mature |
| AWS SDK              | Code         | Complex                   | V mature |
| AWS CDK              | Code         | Complex?                  | early    |
| Serverless Framework | Config       | Half-half?                | mid      |
| Claudia              | Code         | Opinionated               | early    |
| Terraform            | Config       | Complexity++              | mature   |
| ZEIT now             | No Config    | Opinionated++             | early    |
| Netlify              | ?            | ?                         | ?        |
|----------------------|--------------|---------------------------|----------|

TODO NEXT STEPS:

 * add the events/dates labels to the charts on the history of the www
 * slide after history talking about the acceleration of all this + the automation of a lot of our job
 * turn that "deployment techs" table into a matrix chart
 * slide that shows all the others (logos animate on top of each other pasting over the page)
 * talk about which to choose compared to project/ team size/ goals etc.?
 * slide showing choosing JavaScript for the prod code/ JS for the infrastructure code? JS all the way down!
 * go into examples of each?


 * brief overview of aws resources you might use with lambda
 * some interesting use cases of lambda
   * server rendering
   * chat bots
   * alexa apps?
   * web app workers
   * full on web backends?
 * examples of provisioning lambda backends using javascript
 * wider discussion on other provisioning methodologies

 * sum up


### Claudia

What is claudiajs?

deploy a node lambda using javascript.
very low boilerplate and low concept count.
very limited in what aws resources you can manage with it.

Great for a very simple (or focused in terms of resource usage) project.
Basically allows you to:
 1. deploy a lambda
 2. route web traffic to it through api gateway
 3. helpers to connect a lambda to chatbot interfaces

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

### Serverless framework


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
