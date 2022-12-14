const httpStatus = require("http-status");
const { DonationCollection } = require("../collections");
const ApiError = require("../utils/ApiError");

const generateReceiptNo = (lastID) => {
  const currentYear = new Date().getFullYear()
  let receiptNo = `CASH${currentYear}-0000${lastID+1}`
  return receiptNo;
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
