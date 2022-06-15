/**
 * 需求: myAge 发生改变; myself 随之发生改变
 */

let myAge = 18;
let myself = `I'm ${myAge} years old`;

console.log(myself);

myAge = 24;

myself = `I'm ${myAge} years old`;
console.log("-------------");
console.log(myself);
