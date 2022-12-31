import React, { useEffect, useState } from "react";
import "./Adduser.css";

const Adduser = ({ setOpen }) => {
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
                <label>Username</label>
                <input text="text" className="forminput_add_user" />
                <label>Mobile No</label>
                <input
                  type="text"
                  // value={currentDate}
                  className="forminput_add_user"
                  name="todaydate"
                  // onChange={(e) => settodaydate(e.target.value)}
                />
              </div>
            </div>
            <div className="form-input-div_add_user">
              <div className="inner-input-div2">
                <label>Email Address</label>
                <input text="text" className="forminput_add_user" />
                <label>Address</label>
                <input
                  type="text"
                  // value={currentDate}
                  className="forminput_add_user"
                  name="todaydate"
                  // onChange={(e) => settodaydate(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="form-div">
            <div className="form-input-div_add_user">
              <div className="inner-input-div2">
                <label>Password</label>
                <input text="password" className="forminput_add_user" />
                <label>DMax Previous Transaction Days</label>
                <input
                  type="text"
                  // value={currentDate}
                  className="forminput_add_user"
                  name="todaydate"
                  // onChange={(e) => settodaydate(e.target.value)}
                />
              </div>
            </div>
            <div className="form-input-div_add_user">
              <div className="inner-input-div2">
                <label> User Role</label>
                <select
                  className="inner-input-div1-select_add"
                  id="type"
                  name="donationtype"
                  // value={donationtype}
                  // onChange={(e) => setdonationtype(e.target.value)}
                >
                  <option value="None">Select Role</option>
                  <option value="All">Administrator</option>
                  <option value="Owner">Donation And Booking</option>
                  <option value="Owner">Room Booking</option>
                  <option value="Owner">Accounts</option>
                  <option value="Owner">Store</option>
                  <option value="Owner">Super Admin</option>
                  <option value="Owner">Manual Donation</option>
                  <option value="Owner">Elect Donation</option>
                </select>
                <label>Max Previous Donation Allowed</label>
                <input
                  type="text"
                  // value={currentDate}
                  className="forminput_add_user"
                  name="todaydate"
                  // onChange={(e) => settodaydate(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="form-div">
            <div className="form-input-div_add_user">
              <div className="inner-input-div2">
                <label>Is Cashier</label>
                <select
                  className="inner-input-div1-select_add"
                  id="type"
                  name="donationtype"
                  // value={donationtype}
                  // onChange={(e) => setdonationtype(e.target.value)}
                >
                  <option value="None">No</option>
                  <option value="All">Yes</option>
                </select>
                <label>Status</label>
                <select
                  className="inner-input-div1-select_add"
                  id="type"
                  name="donationtype"
                  // value={donationtype}
                  // onChange={(e) => setdonationtype(e.target.value)}
                >
                  <option value="None">Status</option>
                  <option value="All">Active</option>
                  <option value="Owner">De-Active</option>
                </select>
              </div>
            </div>
            <div className="form-input-div_add_user_add_user">
              <div className="inner-input-div2">
                <label>Can Cancle Checkout?</label>
                <select
                  className="inner-input-div1-select_add"
                  id="type"
                  name="donationtype"
                  // value={donationtype}
                  // onChange={(e) => setdonationtype(e.target.value)}
                >
                  <option value="None">No</option>
                  <option value="All">Yes</option>
                </select>
              </div>
            </div>
          </div>
          <div className="Full_input">
            <label>Credit Assigned Accounts *</label>
            <input type="text" />
          </div>
          <div>
            <input type="checkbox" /> Select All
          </div>
          <div className="Full_input">
            <label>Debit Assigned Accounts *</label>
            <input type="text" />
          </div>
          <div className="Full_input">
            <label>Credit Assigned Accounts *</label>
            <input type="text" />
          </div>
          <div>
            <input type="checkbox" /> Select All
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

export default Adduser;
