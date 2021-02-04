const expect = require("chai").expect;


describe("Dummy Test", () => {
  let result;
  
  before((done) => {
    ((x, y) => {
      result = x+y;
      done()
    })(1, 2);
        
  });

  it("should return 3", () => {
    expect(result).to.equal(3);
  });

});