const assert = require("assert");
const User = require("../src/user");

describe("Deleting a User", () => {
  let joe;
  beforeEach(done => {
    joe = new User({ name: "Joe" });
    joe.save().then(() => done());
  });
  it("Model instance remove", done => {
    // Joe instance
    joe
      .remove()
      .then(() => User.findOne({ name: "Joe" }))
      .then(user => {
        assert(user === null);
        done();
      });
  });
  it("Class method remove", done => {
    // User Remove a bunch of records with some given criteria
    User.remove({ name: "Joe" })
      .then(() => User.findOne({ name: "Joe" }))
      .then(user => {
        assert(user === null);
        done();
      });
  });
  it("Class method findAndRemove", done => {
    User.findOneAndRemove({ name: "Joe" })
      .then(() => User.findOne({ name: "Joe" }))
      .then(user => {
        assert(user === null);
        done();
      });
  });
  it("Class method findByIdAndRemove", done => {
    User.findByIdAndRemove({ _id: joe._id })
      .then(() => User.findOne({ name: "Joe" }))
      .then(user => {
        assert(user === null);
        done();
      });
  });
});
