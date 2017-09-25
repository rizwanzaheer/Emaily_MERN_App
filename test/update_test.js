const assert = require("assert");
const User = require("../src/user");

describe("Updatting records", () => {
  let joe;
  beforeEach(done => {
    joe = new User({ name: "Joe" });
    joe.save().then(() => done());
  });
  it("instance type using set n save", done => {
    console.log(joe);
    // set func is only change in memory not in db
    joe.set("name", "Rizwan");
    joe
      .save()
      .then(() => User.find({}))
      .then(users => {
        assert(users.length === 1);
        assert(users[0].name === "Rizwan");
        done();
      });
    console.log(joe);
  });
});
