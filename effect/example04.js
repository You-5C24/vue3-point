/**
 * 如果是对象类型，对象的属性都可能有它各自的 dep
 * 用 Map 来管理这些 dep
 */

const info = { name: "5c24", age: 18 };
let nameMessage = "";
let ageMessage = "";
const effectName = () => (nameMessage = `my name is ${info.name}`);
const effectAge = () => (ageMessage = `my age is ${info.age}`);
const depsMap = new Map();

function track(key) {
  let dep = depsMap.get(key);

  if (!dep) {
    dep = new Set();
    depsMap.set(key, dep);
  }

  dep.add(key === "name" ? effectName : effectAge);
}

function trigger(key) {
  const dep = depsMap.get(key);
  if (dep) {
    dep.forEach((effect) => effect());
  }
}

track("name");
track("age");

// 先执行一次
effectName();
effectAge();

console.log(nameMessage, ageMessage);

info.name = "You";
info.age = 24;

trigger("name");
trigger("age");

console.log("---------------");
console.log(nameMessage, ageMessage);
