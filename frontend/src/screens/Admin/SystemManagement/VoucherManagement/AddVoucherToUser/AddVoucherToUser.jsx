import React, { useEffect, useState } from "react";
import "./AddVoucherToUser.css";

const AddVoucherToUser = ({ setOpen }) => {
  return (
    <>
      <div className="cash-donation-div">
        <div
          className="cash-donation-container-innser"
          style={{ paddingLeft: "2rem" }}
        >
          <div className="form-div">
            <div className="form-input-div_add_user">
              <div className="inner-input-div2">
                <label>Voucher Prefix </label>
                <input
                  text="text"
                  placeholder="Voucher Prefix"
                  className="forminput_add_user"
                />
                <label>To Number </label>
                <input
                  type="number"
                  placeholder="To VC"
                  // value={currentDate}
                  className="forminput_add_user"
                  name="todaydate"
                  // onChange={(e) => settodaydate(e.target.value)}
                />
              </div>
            </div>
            <div className="form-input-div_add_user">
              <div className="inner-input-div2">
                <label>From Number</label>
                <input
                  type="number"
                  placeholder="From VC"
                  className="forminput_add_user"
                />
                <label>Assign To </label>
                <select
                  className="inner-input-div1-select12"
                  id="type"
                  name="donationtype"
                  // value={donationtype}
                  // onChange={(e) => setdonationtype(e.target.value)}
                >
                  <option value="No">No</option>
                  <option value="No">Yes</option>
                </select>
              </div>
            </div>
          </div>

          <div className="save-div-btn">
            <button className="save-btn1">Save</button>
            <button onClick={() => setOpen(false)} className="calcel-btn1">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddVoucherToUser;
