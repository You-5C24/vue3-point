/**
 * 如果存在多个对象， 需要用 WeakMap 来存储这些对象的Map
 * WeakMap 能保证键只能是对象引用
 */

const info = { name: "5c24", age: 18 };
const hobby = { sport: "Basketball", color: "DustyPink" };
let nameMessage = "";
let ageMessage = "";
let sportMessage = "";
let colorMessage = "";

let effectName = () => (nameMessage = `my name is ${info.name}`);
let effectAge = () => (ageMessage = `I'm ${info.age} years old`);
let effectSport = () => (sportMessage = `my favorite sport is ${hobby.sport}`);
let effectColor = () => (colorMessage = `my favorite color is ${hobby.color}`);

const targetMap = new WeakMap();

function track(target, key) {
  let depsMap = targetMap.get(target);

  if (!depsMap) {
    depsMap = new Map();
    targetMap.set(target, depsMap);
  }

  let dep = depsMap.get(key);

  if (!dep) {
    dep = new Set();
    depsMap.set(key, dep);
  }

  if (target === info) {
    dep.add(key === "name" ? effectName : effectAge);
  } else {
    dep.add(key === "sport" ? effectSport : effectColor);
  }
}

function trigger(target, key) {
  const depsMap = targetMap.get(target);

  if (depsMap) {
    const dep = depsMap.get(key);
    if (dep) {
      dep.forEach((effect) => effect());
    }
  }
}

// 收集依赖
track(info, "name");
track(info, "age");
track(hobby, "sport");
track(hobby, "color");

// 先执行一次
effectName();
effectAge();
effectSport();
effectColor();

console.log(nameMessage, ageMessage, sportMessage, colorMessage);

info.name = "You";
info.age = 24;
hobby.sport = "Baseball";
hobby.color = "Pink";

trigger(info, "name");
trigger(info, "age");
trigger(hobby, "sport");
trigger(hobby, "color");

console.log("-----------");
console.log(nameMessage, ageMessage, sportMessage, colorMessage);
