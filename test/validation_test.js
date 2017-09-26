const assert = require("assert");
const User = require("../src/user");

describe("Validating records", () => {
  it("requires a user name", done => {
    const user = new User({ name: undefined });
    const validationResult = user.validateSync();
    const { message } = validationResult.errors.name;
    // console.log(validationResult);
    assert(message === "Name is required!");
    done();
  });
  it("requires a user's name longer then 2 Characters!", done => {
    const user = new User({ name: "Al" });
    const validationResult = user.validateSync();
    const { message } = validationResult.errors.name;
    assert(message === "Name Must be longer then 2 characters.");
    done();
  });

  it("Disallows invalid records from being saved!", done => {
    const user = new User({ name: "Al" });
    user.save().catch(validationResult => {
      const { message } = validationResult.errors.name;
      assert(message === "Name Must be longer then 2 characters.");
      done();
    });
  });
});
