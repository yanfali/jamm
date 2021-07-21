// I'm using let because I want to clear between test runs
let handlers = {};

const trigger = (type, ...args) => {
  if (handlers[type] !== undefined) {
    // I'm using a for loop, but I could have used forEach
    for (let i = 0; i < handlers[type].length; i++) {
      handlers[type][i](...args);
    }
  }
};

const on = (type, handler) => {
  if (handlers[type] === undefined) {
    handlers[type] = [handler];
  } else {
    handlers[type].push(handler);
  }
};

const off = (type, handler) => {
  if (handlers[type] !== undefined) {
    handlers[type] = handlers[type].filter((h) => handler !== h);
  }
};

// test case 1
on("foo", () => {
  console.log("Do foo");
});

on("foo", () => {
  console.log("Do some other foo");
});

trigger("foo");
handlers = {}; // clear state

// test case 2
const onFoo = () => {
  console.log("Do foo");
};

on("foo", onFoo);
off("foo", onFoo);
trigger("foo");

handlers = {}; // clear state

on("foo", (...args) => {
  console.log("here are my args", ...args);
});

const [arg1, arg2] = [1, 2];
trigger("foo", arg1, arg2);
