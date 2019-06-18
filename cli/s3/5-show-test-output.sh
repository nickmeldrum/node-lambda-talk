#!/bin/bash
set -xe

aws s3api list-objects --bucket nick-s3triggertest
aws s3api get-object --bucket nick-s3triggertest --key output-test1.json outfile
cat outfile
