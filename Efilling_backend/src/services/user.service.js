const httpStatus = require('http-status');
const { UserCollection } = require('../collections');
const AuthCollaction = require('../collections/Auth.Collaction');
const ApiError = require('../utils/ApiError');


  /**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
   const createuser = async (userBody) => {
    const result = await UserCollection.createuser(userBody);
    return result;
  };




  /**
 * Login with username and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise<User>}
 */
const loginuser = async (email, password) => {
  const user = await AuthCollaction.getUserByEmail(email);  
  if (!user || !(await AuthCollaction.isPasswordMatch(password, user.PASSWORD))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
  }
  return user;
};





  module.exports = {
    createuser,
    loginuser
  }


