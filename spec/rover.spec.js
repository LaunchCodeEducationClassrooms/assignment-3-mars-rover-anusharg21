const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {
it("constructor sets position and default values for mode and generatorWatts",function(){
  let rover = new Rover(100);
  expect(rover.position).toEqual(100);
  expect(rover.generatorWatts).toEqual(110)
  });
it("response returned by receiveMessage contains name of message",function(){
  let rover = new Rover(100);
  let message = new Message('test message with command',[]);
  let response = rover.receiveMessage(message);
  expect(response.message).toEqual(message.name);
})
it("response returned by receiveMessage includes two results if two commands are sent in the message",function(){
  let rover = new Rover(100);
  let message = new Message('test message with two commands',[new       Command('STATUS_CHECK')]);
  let response = rover.receiveMessage(message);
  expect(response.results.length).toEqual(message.commands.length)
})
it("responds correctly to status check command",function(){
   let rover = new Rover(100);
   let message = new Message('test message with two commands',[new Command('STATUS_CHECK')]);
   let response = rover.receiveMessage(message);
   expect(response.results[0].roverStatus.position).toEqual(100);
   expect(response.results[0].roverStatus.mode).toEqual('NORMAL');
   expect(response.results[0].roverStatus.generatorWatts).toEqual(110);
})
it("responds correctly to mode change command",function(){
  let rover = new Rover(100);
  let message = new Message('test message with two commands',[new Command('MODE_CHANGE', 'LOW_POWER')]);
  let response = rover.receiveMessage(message);
  expect(response.results[0].completed).toBeTrue;
  expect(rover.mode).toEqual('LOW_POWER');
})
it("responds with false completed value when attempting to move in LOW_POWER mode",function(){
  let rover = new Rover(100);
  rover.mode = 'LOW_POWER';
  let message = new Message('test message with two commands',[new Command('MOVE',430)]);
  let response = rover.receiveMessage(message);
  expect(response.results[0].completed).toBeFalse;
})
it("responds with position for move command",function(){
  let rover = new Rover(100);
  let message = new Message('test message with two commands',[new Command('MOVE',430)]);
  let response = rover.receiveMessage(message);
  expect(rover.position).toEqual(message.commands[0].value);
})
  // 7 tests here!

});
