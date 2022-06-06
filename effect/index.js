/**
 * 场景: myAge 发生改变  myself 也跟着改变
 */

// let myName = "5C24";
// let myAge = 18;
// let myself = `${myName}: ${myAge}`;

// console.log(myself);

// myAge = 20;

// console.log(myself);

/**
 * 再次指向一次 myself 赋值 可以实现场景
 */

// let myName = "5C24";
// let myAge = 18;
// let myself = `${myName}: ${myAge}`;

// console.log(myself);

// myAge = 20;

// myself = `${myName}: ${myAge}`;

// console.log(myself);

/**
 * 利用一个 effect 函数封装数值方法
 */

// let myName = "5C24";
// let myAge = 18;
// let myself = "";
// const effect = function () {
//   myself = `${myName}: ${myAge}`;
// };

// effect();

// console.log(myself);

// myAge = 20;

// effect();

// console.log(myself);

/**
 * 问题: 如果有多个 effect 函数就要执行多次
 */

// let myName = "5C24";
// let myAge = 18;
// let myself = "";
// const effect1 = function () {
//   myself = `${myName}: ${myAge}`;
// };
// let another = "";
// const effect2 = function () {
//   another = `this is another effect: ${myAge}`;
// };

// effect1();
// effect2();
// console.log(myself);
// console.log(another);

// myAge = 20;

// effect1();
// effect2();

// console.log(myself);
// console.log(another);

/**
 * 针对上面的问题:
 * track 函数收集依赖 myAge 的 effect 函数，放在一个用 Set 创建的 dep 里
 * 用 Set 的原因是，Set 是自动去重的
 *
 * 只要 myAge 值发生改变，执行 dep 里所有的 effect 函数
 */

// let myName = "5c24";
// let myAge = 18;
// let myself = "";
// let another = "";
// const effect1 = function () {
//   myself = `${myName}: ${myAge}`;
// };
// const effect2 = function () {
//   another = `this is another effect: ${myAge}`;
// };
// const dep = new Set();

// // 收集依赖
// function track() {
//   dep.add(effect1);
//   dep.add(effect2);
// }

// // 触发依赖
// function trigger() {
//   dep.forEach((effect) => effect());
// }

// track();
// // 先执行一次
// effect1();
// effect2();

// console.log(myself);
// console.log(another);

// myAge = 20;

// trigger();

// console.log(myself);
// console.log(another);

/**
 * 上面讲的是基础类型
 * 如果是对象类型的话用 Map 存储 dep
 */

// const person = { name: "5c24", age: 18 };
// let nameSentence1 = "";
// let nameSentence2 = "";
// let ageSentence1 = "";
// let ageSentence2 = "";
// const effectName1 = () => {
//   nameSentence1 = `${person.name}哈哈`;
// };
// const effectName2 = () => {
//   nameSentence2 = `${person.name}嘿嘿`;
// };
// const effectAge1 = () => {
//   ageSentence1 = `才${person.age}`;
// };
// const effectAge2 = () => {
//   ageSentence2 = `都已经${person.age}`;
// };
// const depsMap = new Map();

// function track(key) {
//   let dep = depsMap.get(key);

//   if (!dep) {
//     dep = new Set();
//     depsMap.set(key, dep);
//   }

//   if (key === "name") {
//     dep.add(effectName1);
//     dep.add(effectName2);
//   } else {
//     dep.add(effectAge1);
//     dep.add(effectAge2);
//   }
// }

// function trigger(key) {
//   const dep = depsMap.get(key);

//   if (dep) {
//     dep.forEach((effect) => effect());
//   }
// }

// track("name");
// track("age");

// // 第一次执行
// effectName1();
// effectName2();
// effectAge1();
// effectAge2();

// console.log(nameSentence1, nameSentence2, ageSentence1, ageSentence2);

// person.name = "You";
// person.age = 20;

// trigger("name");
// trigger("age");

// console.log(nameSentence1, nameSentence2, ageSentence1, ageSentence2);

/**
 * 以上是对单个对象的处理
 * 如果有多个对象的话，还需要一个 WeakMap 来存储这些对象的 Map
 * WeakMap 能保证键只能是对象引用
 */

const person = { name: "5c24", age: 18 };
const animal = { species: "dog", color: "black" };
let nameSentence1 = "";
let nameSentence2 = "";
let ageSentence1 = "";
let ageSentence2 = "";
let speciesSentence1 = "";
let speciesSentence2 = "";
let colorSentence1 = "";
let colorSentence2 = "";
const effectName1 = () => {
  nameSentence1 = `${person.name}哈哈`;
};
const effectName2 = () => {
  nameSentence2 = `${person.name}嘿嘿`;
};
const effectAge1 = () => {
  ageSentence1 = `才${person.age}`;
};
const effectAge2 = () => {
  ageSentence2 = `都已经${person.age}`;
};
const effectSpecies1 = () => {
  speciesSentence1 = `${animal.species}哈哈哈`;
};
const effectSpecies2 = () => {
  speciesSentence2 = `${animal.species}嘿嘿嘿`;
};
const effectColor1 = () => {
  colorSentence1 = `${animal.color}好看`;
};
const effectColor2 = () => {
  colorSentence2 = `${animal.color}不好看`;
};

let targetMap = new WeakMap();

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

  if (target === person) {
    if (key === "name") {
      dep.add(effectName1);
      dep.add(effectName2);
    } else {
      dep.add(effectAge1);
      dep.add(effectAge2);
    }
  } else if (target === animal) {
    if (key === "species") {
      dep.add(effectSpecies1);
      dep.add(effectSpecies2);
    } else {
      dep.add(effectColor1);
      dep.add(effectColor2);
    }
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

track(person, "name");
track(person, "age");
track(animal, "species");
track(animal, "color");

effectName1();
effectName2();
effectAge1();
effectAge2();
effectSpecies1();
effectSpecies2();
effectColor1();
effectColor2();

console.log(nameSentence1, nameSentence2, ageSentence1, ageSentence2);
console.log(speciesSentence1, speciesSentence2, colorSentence1, colorSentence2);

person.name = "You";
person.age = 20;
animal.species = "cat";
animal.color = "white";

trigger(person, "name");
trigger(person, "age");
trigger(animal, "species");
trigger(animal, "color");

console.log(nameSentence1, nameSentence2, ageSentence1, ageSentence2);
console.log(speciesSentence1, speciesSentence2, colorSentence1, colorSentence2);
