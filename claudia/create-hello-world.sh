#!/bin/bash
set -e

# first time deploy lambda to claudia
time npx claudia create --region us-east-1 --handler hello-world.handler

#test lambda
time npx claudia test-lambda
