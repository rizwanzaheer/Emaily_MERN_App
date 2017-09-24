// purpose of this file is to crease new user and test it
const assert = require("assert");
const User = require("../src/user");

describe("Creating records", () => {
  it("saves a user", () => {
    const joe = new User({
      name: "joe"
    });
    joe.save();
  });
});
