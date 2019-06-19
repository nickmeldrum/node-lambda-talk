exports.handler = async event =>  {
  console.log('NICK', 'profile called', event)
  const body = {
    name: 'Viv',
    skills: 'Java',
  }
  return {
    "statusCode": 200,
    "headers": {},
    "body": JSON.stringify(body),
    "isBase64Encoded": false
  }
}
