#!/usr/bin/env node

// @ts-ignore: Cannot find declaration file
require('source-map-support/register');
const cdk = require('@aws-cdk/cdk');
const { CdkInitStack } = require('../lib/cdk-init-stack');

const app = new cdk.App();
new CdkInitStack(app, 'CdkInitStack');
