const chai = require("chai");
const expect = chai.expect;

describe("a scenario", () => {
  context("a function", () => {
    beforeEach(() => {
      console.log("======beforeEach");
    });

    afterEach(() => {
      console.log("=====afterEach");
    });
    it("should do something", () => {
      expect(true).to.equal(true);
    });

    it("should do some other thing", () => {
      expect(true).to.equal(true);
      expect({ name: "foo" }).to.equal({ name: "foo" });
      expect()
    });
  });

  before(() => {
    console.log("------before");
  });

  after(() => {
    console.log("------after");
  });
});
