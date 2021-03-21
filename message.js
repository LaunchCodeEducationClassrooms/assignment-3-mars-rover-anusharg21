class Message {
  constructor(name,commands){
  this.name = name;
  if(!name){
  throw Error("Message name required.")// Write code here!
}
 this.commands = commands;
}
}
module.exports = Message;