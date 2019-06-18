exports.handler = async event =>  {
  console.log('NICK', 'analyze called', event.Records[0].s3)
}
