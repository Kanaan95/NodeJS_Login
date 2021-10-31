/**
 * Users - TESTING
 */

// Dependencies
const request = require("supertest");
const { expect } = require("chai");
const server = require("../../index");
const { after } = require("mocha");
const User = require("../../model/User");

describe("Users testing", () => {
  describe("List of users", () => {
    it("should return a list of users", (done) => {
      request(server)
        .get("/api/users")
        .expect(200, (err, res) => {
          if (!err && res) {
            expect(res.body.length).greaterThan(0);
            done();
          } else {
            done(err);
          }
        });
    });
  });

  describe("Create users", () => {
    it("should create a new user", async () => {
      const userProp = {
        name: "John Smith",
        email: "john.smith@gmail.com",
        password: "password123",
      };
      const res = await request(server)
        .post("/api/auth/register")
        .send(userProp);

      expect(res.statusCode).to.equal(200);
    });
  });

  describe("Delete user", () => {
    it("should delete created user using Mongoose", (done) => {
      User.deleteOne({ name: "John Smith" }, (err) => {
        if (!err) {
          done();
        } else {
          done(err);
        }
      });
    });
  });

  after(() => {
    server.close();
  });
});
