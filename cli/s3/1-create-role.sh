#!/bin/bash
set -e

aws iam create-role \
  --role-name s3triggertest \
  --assume-role-policy-document file://trust-policy.json

aws iam attach-role-policy \
  --role-name s3triggertest \
  --policy-arn arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole

aws iam attach-role-policy \
  --role-name s3triggertest \
  --policy-arn arn:aws:iam::aws:policy/AmazonS3FullAccess
