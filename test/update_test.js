const assert = require("assert");
const User = require("../src/user");

describe("Updatting records", () => {
  let joe;
  beforeEach(done => {
    joe = new User({ name: "Joe" });
    joe.save().then(() => done());
  });
  function assertName(operation, done) {
    operation.then(() => User.find({})).then(users => {
      assert(users.length === 1);
      assert(users[0].name === "Rizwan");
      done();
    });
  }
  it("instance type using set n save", done => {
    console.log(joe);
    // set func is only change in memory not in db
    joe.set("name", "Rizwan");
    assertName(joe.save(), done);
    console.log(joe);
  });
  it("A model instance can update!", done => {
    joe.update({ name: "Alex" });
    done();
  });
});
