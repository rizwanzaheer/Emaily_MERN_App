const assert = require("assert");
const User = require("../src/user");

describe("Updatting records", () => {
  let joe;
  beforeEach(done => {
    joe = new User({ name: "Joe", likes: 0 });
    joe.save().then(() => done());
  });
  function assertName(operation, done) {
    operation.then(() => User.find({})).then(users => {
      assert(users.length === 1);
      assert(users[0].name === "Alex");
      done();
    });
  }
  it("instance type using set n save", done => {
    console.log(joe);
    // set func is only change in memory not in db
    joe.set("name", "Alex");
    assertName(joe.save(), done);
    console.log(joe);
  });
  it("A model instance can update!", done => {
    joe.update({ name: "Alex" });
    done();
  });
  it("A model class can update", done => {
    // find name 'Joe' and update with "Alex"
    assertName(User.update({ name: "Joe" }, { name: "Alex" }), done);
  });
  it("A model class can update one record", done => {
    assertName(User.findOneAndUpdate({ name: "Joe" }, { name: "Alex" }), done);
  });
  it("A model class can find a record with ID and update!", done => {
    assertName(User.findByIdAndUpdate(joe._id, { name: "Alex" }), done);
  });

  it("A User can have their postcount incremented by 1.", done => {
    User.update({ name: "Joe" }, { $inc: { likes: 10 } })
      .then(() => User.findOne({ name: "Joe" }))
      .then(user => {
        assert(user.likes === 10);
      });
    done();
  });
});
