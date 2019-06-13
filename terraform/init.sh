#!/bin/bash
set -ex

aws s3api create-bucket \
  --bucket=terraform-example \
  --region=us-east-1

terraform init
