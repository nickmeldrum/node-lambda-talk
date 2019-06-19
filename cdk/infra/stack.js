const cdk = require('@aws-cdk/cdk')
const { CandidateService } = require('./candidate-service')

class CdkInitStack extends cdk.Stack {
  constructor(scope, id, props) {
    super(scope, id, props)

    new CandidateService(this, 'CandidateService')
  }
}

module.exports = { CdkInitStack }
