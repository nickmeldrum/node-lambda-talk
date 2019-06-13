#!/bin/bash
set -ex

sam package \
  --template-file sam-template.yaml \
  --output-template-file sam-packaged.yaml \
  --s3-bucket nick-sam-greeting-code

set +e
sam deploy \
  --template-file sam-packaged.yaml \
  --stack-name sam-greeting \
  --region us-east-1 \
  --capabilities CAPABILITY_IAM
