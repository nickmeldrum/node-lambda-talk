#!/bin/bash
set -e

# first time deploy api gateway enabled lambda
time npx claudia create --region us-east-1 --api-module api-app
