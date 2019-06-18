exports.handler = async event =>  {
  console.log('NICK', 'profile called', event)
  return { name: 'josephine bloggs' }
}
