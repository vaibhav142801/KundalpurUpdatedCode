const {sequelize,QueryTypes,query} = require("sequelize");
const db = require("../models");
db.donationModel.hasMany(db.donationItem,{foreignKey:'donationId',as:'itemDetails'})
db.donationItem.belongsTo(db.donationModel,{foreignKey:'donationId',as:'donationDetail'})
const TblDonation = db.donationModel;
const TblDonationItem = db.donationItem;
const itemList = db.itemList;
const TblNewDonation = db.newDonationModel;

class DonationCollaction {

  addNewDonation = async(req)=>{
    const {NAME,MODE_OF_DONATION,AMOUNT,CHEQUE_NO,DATE_OF_CHEQUE,NAME_OF_BANK,PAYMENT_ID,DATE_OF_DAAN}= req.body;

    const count = await TblNewDonation.count();
    const currentYear = new Date().getFullYear()
    let donationType = 'ONLINE';
    if(MODE_OF_DONATION == 2){
      donationType = 'CHEQUE';
    }
    const receiptId = count+1;
    let RECEIPT_NO = `${donationType}-${currentYear}-000${receiptId}`;
    const userId = req.user.id;
    const result =  await TblNewDonation.create({
      NAME,RECEIPT_NO,MODE_OF_DONATION:donationType,AMOUNT,CHEQUE_NO,DATE_OF_CHEQUE,NAME_OF_BANK,PAYMENT_ID,DATE_OF_DAAN,ADDED_BY:userId
    });
    if(!result){
      return null;
    }
    return true;
  }

    adddonation = async (req, receiptNo) => {
    const { name, phoneNo, address, new_member, donation_date, donation_time,donation_item } = req.body;
    const userId = req.user.id;
    const result = await TblDonation.create({name,phoneNo,receiptNo,address,new_member,donation_date,donation_time,created_by:userId})
    .then( async (res) => {
      let final = []
      donation_item.forEach(e => {
        final.push({donationId:res.id,itemId:e.item,amount:e.amount,remark:e.remark})
      });
        await TblDonationItem.bulkCreate(final)
        .then((resp)=>{
          res.dataValues['item_details'] = resp;
        });
        return {
          status: 1,
          message: "Created Successfully",
          data: res.dataValues,
        };
      }).catch((err) => {
        return {
          status: 1,
          message: "Something wrong!",
          data: res.err,
        };
      });
      return result;
  };

  getLastID = async () => {
    const lastID = await TblDonation.findOne({
      order: [["id", "DESC"]],
      attributes: ["id"],
    });
    return lastID ? lastID.id : 1;
  };

  donationRecord = async (req) => {
    const userId = req.user.id;
    const record = await TblDonation.findAll({
      where:{created_by:userId},
      attributes:['id','receiptNo','name','phoneNo','address','new_member','donation_date','donation_time'],
      include:[{
        model:TblDonationItem,
        as:'itemDetails',
        attributes:['itemId','amount','remark']
      }]
    });
    return record;
  }

  newDonationRecord = async (req) => {
    const userId = req.user.id;
    const record = await TblNewDonation.findAll({
      where:{ADDED_BY:userId},
      // attributes:['id','receiptNo','name','phoneNo','address','new_member','donation_date','donation_time'],
    });
    return record;
  }


  allDonationRecord = async(req)=>{
    const id = req.params.id;
    var whereClause;
    if(id){
      whereClause = {id:id};
    }
    const record = await TblDonation.findAll({
      where:whereClause,
      attributes:['id','receiptNo','name','phoneNo','address','new_member','donation_date','donation_time'],
      include:[{
        model:TblDonationItem,
        as:'itemDetails',
        attributes:['itemId','amount','remark']
      }]
    });
    return record;
  }

  getItemList = async()=>{
    const list = await itemList.findAll({
      attributes:['id','item_name'],
      where:{is_deleted:null}});
    return list;
  }
}

module.exports = new DonationCollaction();
