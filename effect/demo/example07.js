/**
 * 利用全局变量 activeEffect 解决 trriger track 写死的问题
 *
 */

let activeEffect = null;

function effect(fn) {
  activeEffect = fn;
  activeEffect();
  activeEffect = null;
}

function createGetter() {
  return function get(target, key, receiver) {
    const res = Reflect.get(target, key, receiver);
    track(target, key);

    return res;
  };
}

function createSetter() {
  return function set(target, key, value, receiver) {
    const res = Reflect.set(target, key, value, receiver);

    trigger(target, key);

    return res;
  };
}

function reactive(raw) {
  return new Proxy(raw, { get: createGetter(), set: createSetter() });
}

const info = reactive({ name: "5c24", age: 18 });
const hobby = reactive({ sport: "Basketball", color: "DustyPink" });
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
  // 避免例如 console.log() 触发 track
  if (!activeEffect) return;

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

  dep.add(activeEffect);
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

// 先执行一次
effect(effectName);
effect(effectAge);
effect(effectSport);
effect(effectColor);

console.log(nameMessage, ageMessage, sportMessage, colorMessage);

info.name = "You";
info.age = 24;
hobby.sport = "Baseball";
hobby.color = "Pink";

console.log(nameMessage, ageMessage, sportMessage, colorMessage);
