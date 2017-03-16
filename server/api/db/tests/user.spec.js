/* eslint-disable */
const chai = require("chai");
const user = require('../user');

chai.should()

module.exports = function() {
  it('should have a function called usernameExists', function() {
    user.usernameExists.should.be.a('function');
  });
  it('should have a function called usernameOrEmailExists', function() {
    user.usernameOrEmailExists.should.be.a('function');
  });
  it('should have a function called find', function() {
    user.find.should.be.a('function');
  });
  it('should have a function called findByUserID', function() {
    user.findByUserID.should.be.a('function');
  });
};
