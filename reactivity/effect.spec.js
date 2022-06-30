import { reactive } from "./reactive.js";
import { effect } from "./effect.js";

describe("effect", () => {
  it("happy path", () => {
    let user = reactive({ name: "5C24", age: 18 });
    let nextAge;
    let nextInfo;

    effect(() => {
      nextAge = user.age + 1;
    });

    effect(() => {
      nextInfo = `${user.name}: ${user.age}`;
    });

    expect(nextAge).toBe(19);
    expect(nextInfo).toBe("5C24: 18");

    user.age++;

    expect(nextAge).toBe(20);
    expect(nextInfo).toBe("5C24: 19");

    user.name = "You";

    expect(nextInfo).toBe("You: 19");
  });
});
