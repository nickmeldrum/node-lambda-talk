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

## Considerations for discussion

 * Vendor lock-in ( https://www.theregister.co.uk/2017/11/06/coreos_kubernetes_v_world/ https://lumigo.io/blog/you-are-wrong-about-serverless-vendor-lock-in/ )
 * Maturity/ opinionated/ customizable/ cloud agnostic/ cost/ configuration based or configuration free/ focused on what AWS resources you can configure?

## Research:

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
