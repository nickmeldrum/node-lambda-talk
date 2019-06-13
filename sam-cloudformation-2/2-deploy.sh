#!/bin/bash
set -e

aws s3 cp swagger.yaml s3://nick-sam-greeting-code/swagger.yaml

sam package \
  --template-file sam-template.yaml \
  --output-template-file sam-packaged.yaml \
  --s3-bucket nick-sam-greeting-code

sam deploy \
  --template-file sam-packaged.yaml \
  --stack-name sam-greeting-2 \
  --region us-east-1 \
  --capabilities CAPABILITY_IAM \
  --parameter-overrides S3BucketName=nick-sam-greeting-code
