#!/bin/bash
set -xe

aws lambda add-permission \
  --function-name s3triggertest \
  --action lambda:InvokeFunction \
  --principal s3.amazonaws.com \
  --source-arn arn:aws:s3:::nick-s3triggertest \
  --statement-id 1

aws s3api put-bucket-notification-configuration \
  --bucket nick-s3triggertest \
  --notification-configuration file://notification-configuration.json
