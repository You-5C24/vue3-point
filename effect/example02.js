/**
 * 封装一个 effect 函数用于改变 myself 值
 */

let myAge = 18;
let myself = "";
const effect = () => (myself = `I'm ${myAge} years old`);

// 先执行一次
effect();

console.log(myself);

myAge = 24;
effect();

console.log("--------");
console.log(myself);
