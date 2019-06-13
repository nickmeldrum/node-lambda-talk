#!/bin/bash
set -ex

aws cloudformation delete-stack \
	--stack-name sam-greeting-2 \
  --region us-east-1
