const httpStatus = require('http-status');
const { donationService } = require('../services');
const catchAsync = require('../utils/catchAsync');
const ApiError = require('../utils/ApiError');

const addCashDonation = catchAsync(async(req,res)=>{
  const data = await donationService.cashDonation(req.body);
  res.status(httpStatus.CREATED).send(data);
})

const donationList = catchAsync( async(req,res)=>{
  const data = await donationService.list(req.params);
  if(!data){
    throw new ApiError(httpStatus.NOT_FOUND, "!somthing Went Wrong");
  }else{
    res.status(200).send({
      msg:'All record.',
      donation:data
    })
  }
})

module.exports = {
  addCashDonation,
  donationList
};
