#!/bin/bash
set -ex

zip terraform-example.zip index.js

aws s3 cp terraform-example.zip \
  s3://terraform-example/v1.0.0/terraform-example.zip

terraform apply
