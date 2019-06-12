#!/bin/bash
set -e

aws lambda delete-function --function-name s3triggertest

aws s3 rm s3://nick-s3triggertest --recursive
aws s3api delete-bucket --bucket nick-s3triggertest

aws iam detach-role-policy \
  --role-name s3triggertest \
  --policy-arn arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole
aws iam detach-role-policy \
  --role-name s3triggertest \
  --policy-arn arn:aws:iam::aws:policy/AmazonS3FullAccess
aws iam delete-role --role-name s3triggertest
