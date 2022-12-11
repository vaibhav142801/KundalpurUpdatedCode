const httpStatus = require('http-status');
const { donationService } = require('../services');
const catchAsync = require('../utils/catchAsync');
const ApiError = require('../utils/ApiError');

const addCashDonation = catchAsync(async(req,res)=>{
  const cashDonation = await donationService.cashDonation(req.body);
  res.send({
    msg:'test'
  })
})

module.exports = {
  addCashDonation
};
