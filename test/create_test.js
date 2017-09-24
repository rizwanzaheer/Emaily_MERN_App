// purpose of this file is to crease new user and test it
const assert = require("assert");
const User = require("../src/user");

describe("Creating records", () => {
  it("saves a user", done => {
    const joe = new User({
      name: "joe"
    });
    joe.save().then(() => {
      // has joe been saved successfully?
      // in Model isNew  === true
      // when saved successfully then isNew === false
      assert(!joe.isNew);
      done();
    });
  });
});
