const cdk = require('@aws-cdk/cdk')
const { CdkInitStack } = require('./stack')

const app = new cdk.App()
new CdkInitStack(app, 'CdkInitStack')
