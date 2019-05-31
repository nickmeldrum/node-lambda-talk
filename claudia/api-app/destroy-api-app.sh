#!/bin/bash
set -e

# update already deployed lambda
time npx claudia destroy
