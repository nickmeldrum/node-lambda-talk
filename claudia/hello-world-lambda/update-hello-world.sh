#!/bin/bash
set -e

# update already deployed lambda
time npx claudia update

#test lambda
time npx claudia test-lambda --event event.json
