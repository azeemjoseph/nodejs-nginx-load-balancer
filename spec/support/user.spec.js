const fetch = require("node-fetch");

var url_Test = "http://localhost:3001/";

describe("Express.js Server(External API Test)", function () {
  describe("GET /", function () {
    it("returns status code 200", function (done) {
      fetch(url_Test)
        .then((res) => {
          console.log("res : -->", res.status);
          expect(res.status).toBe(200);
          done();
        })
        .catch((err) => console.log(err));
    });
  });
});

describe("A suite", function () {
  it("contains spec with an expectation", function () {
    expect(true).toBe(true);
  });
});
