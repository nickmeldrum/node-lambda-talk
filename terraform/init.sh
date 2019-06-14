#!/bin/bash
set -ex

aws s3api create-bucket \
  --bucket nick-tf-example \
  --region us-east-1

terraform init

#https://learn.hashicorp.com/terraform/aws/lambda-api-gateway
