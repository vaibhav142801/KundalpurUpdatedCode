const httpStatus = require("http-status");
const { DonationCollection } = require("../collections");
const ApiError = require("../utils/ApiError");

const cashDonation = async (body) => {
  const donation = await DonationCollection.adddonation(body);
  return donation;
};

module.exports = {
  cashDonation,
};
