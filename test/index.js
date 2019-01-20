let test = require("ava");
let bus = require("../");

test("basic", t => {
  let callCount = 0;

  bus.on("test-1", () => callCount++);

  bus.emit("test-1");

  t.deepEqual(callCount, 1);

  for (let e = 0; e < 100; e++) {
    bus.emit("test-1");
  }

  t.deepEqual(callCount, 101);
});

test("remove", t => {
  let callCount = 0;

  let handle = () => callCount++;

  bus.on("test-2", handle);

  for (let e = 0; e < 10; e++) {
    bus.emit("test-2");
  }

  bus.off("test-2", handle);

  for (let e = 0; e < 10; e++) {
    bus.emit("test-2");
  }

  bus.on("test-2", handle);

  for (let e = 0; e < 10; e++) {
    bus.emit("test-2");
  }

  t.deepEqual(callCount, 20);
});

test("multiple", t => {
  let callCount = 0;

  let one = () => callCount++;
  let two = () => (callCount += 10);

  bus.on("test-3", one);
  bus.on("test-3", two);

  for (let e = 0; e < 10; e++) {
    bus.emit("test-3");
  }

  t.deepEqual(callCount, 110);

  bus.off("test-3", one);

  for (let e = 0; e < 10; e++) {
    bus.emit("test-3");
  }

  t.deepEqual(callCount, 210);
});

test("props", t => {
  let callCount = 0;

  let one = ({ count }) => (callCount += count);
  let two = ({ count }) => (callCount += count * 10);

  bus.on("test-4", one);
  bus.on("test-4", two);

  for (let e = 0; e < 10; e++) {
    bus.emit("test-4", { count: 1 });
  }

  t.deepEqual(callCount, 110);

  bus.off("test-4", one);

  for (let e = 0; e < 10; e++) {
    bus.emit("test-4", { count: 1 });
  }

  t.deepEqual(callCount, 210);
});

test("removing list", t => {
  let callCount = 0;

  let handler = count => () => (callCount += count);
  let one = handler(1);
  let two = handler(2);
  let three = handler(3);

  bus.on("test-5", one);
  bus.on("test-5", two);
  bus.on("test-5", three);

  for (let e = 0; e < 10; e++) {
    bus.emit("test-5");
  }

  t.deepEqual(callCount, 60);

  bus.off("test-5", three);

  for (let e = 0; e < 10; e++) {
    bus.emit("test-5");
  }

  bus.off("test-5", one);
  bus.off("test-5", two);

  for (let e = 0; e < 10; e++) {
    bus.emit("test-5");
  }

  t.deepEqual(callCount, 90);
});

test("don't throw error when no handlers have been connected for an event", t => {
  bus.emit("test-6");
  t.deepEqual(void 0, undefined);
});
