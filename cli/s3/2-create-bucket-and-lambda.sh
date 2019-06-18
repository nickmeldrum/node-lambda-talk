#!/bin/bash
set -xe

aws s3api create-bucket --bucket nick-s3triggertest

zip s3triggertest.zip index.js

aws lambda create-function \
  --function-name s3triggertest \
  --runtime "nodejs10.x" \
  --role arn:aws:iam::277625601220:role/s3triggertest \
  --handler index.handler \
  --zip-file fileb://s3triggertest.zip
