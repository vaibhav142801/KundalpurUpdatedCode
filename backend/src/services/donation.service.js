const httpStatus = require("http-status");
const { DonationCollection } = require("../collections");
const ApiError = require("../utils/ApiError");

const generateReceiptNo = (lastID) => {
  const currentYear = new Date().getFullYear()
  let receiptNo = `CASH${currentYear}-0000${lastID+1}`
  return receiptNo;
}

const cashDonation = async (req) => {
  const lastID = await DonationCollection.getLastID();
  const receiptNo = generateReceiptNo(lastID);
  const donation = await DonationCollection.adddonation(req,receiptNo);
  return donation;
};

const list = async(req) => {
  const record = await DonationCollection.donationRecord(req);
  return record;
}

const getItemList = async()=>{
  const list = await DonationCollection.getItemList();
  return list;
}

const allList = async(req)=>{
  const record = await DonationCollection.allDonationRecord(req);
  return record;
}

module.exports = {
  cashDonation,
  list,
  getItemList,
  allList
};
