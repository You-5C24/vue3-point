/**
 * 利用 Set 进行依赖收集和触发依赖解决多个 effect 需要多次执行的问题
 * Set 具有自动去重的特点
 */

let myAge = 18;
let message1 = "";
let message2 = "";
const effect1 = () => (message1 = `message1's ${myAge}`);
const effect2 = () => (message2 = `message2's ${myAge}`);
const dep = new Set();

// 收集依赖
function track() {
  dep.add(effect1);
  dep.add(effect2);
}

// 触发依赖
function trigger() {
  dep.forEach((effect) => effect());
}

track();
// 先执行一次
effect1();
effect2();

console.log(message1, message2);

myAge = 24;
trigger();

console.log("----------------");
console.log(message1, message2);
