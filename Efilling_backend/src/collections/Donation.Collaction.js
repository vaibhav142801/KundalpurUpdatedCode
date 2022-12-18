const db = require("../models");
db.donationModel.hasMany(db.donationItem,{foreignKey:'donationId',as:'itemDetails'})
db.donationItem.belongsTo(db.donationModel,{foreignKey:'donationId',as:'donationDetail'})
const TblDonation = db.donationModel;
const TblDonationItem = db.donationItem;
const itemList = db.itemList;

class DonationCollaction {
    adddonation = async (body, receiptNo) => {
    const { name, phoneNo, address, new_member, donation_date, donation_time,donation_item } = body;

    const result = await TblDonation.create({
      name,
      phoneNo,
      receiptNo,
      address,
      new_member,
      donation_date,
      donation_time
    }).then( async (res) => {
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

  donationRecord = async (params) => {
    const record = await TblDonation.findAll({
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
