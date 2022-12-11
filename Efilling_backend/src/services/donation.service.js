const httpStatus = require("http-status");
const { DonationCollection } = require("../collections");
const ApiError = require("../utils/ApiError");

const generateReceiptNo = (lastID) => {
  let prefix = 'ABC00'
  return prefix+parseInt(lastID+1)
}

const cashDonation = async (body) => {
  const lastID = await DonationCollection.getLastID();
  const receiptNo = generateReceiptNo(lastID);
  const donation = await DonationCollection.adddonation(body,receiptNo);
  return donation;
};

const list = async(params) => {
  const record = await DonationCollection.donationRecord(params);
  return record;
}


module.exports = {
  cashDonation,
  list
};
