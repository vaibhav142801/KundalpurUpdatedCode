import React, { useEffect } from "react";
import OptionsList from "./OptionsList";
import "./CashDonation.css";
const CashDonation = ({ setopendashboard }) => {
  useEffect(() => {
    setopendashboard(true);
  }, []);
  return (
    <>
      <div className="cash-donation-div">
        <div className="cash-donation-container">
          <h2 style={{ marginLeft: "1rem" }}>Add Cash Donation</h2>
          <div className="cash-donation-container-innser">
            <h2>Cash Donation</h2>
            <div className="form-div">
              <p>Voucher No:</p>
              <div className="form-input-div">
                <div className="phone-div-input">
                  <p>Phone No:</p>
                  <input text="text" className="forminput" />
                  <div className="new-menber-no-div">
                    <p>New Menber:</p>
                    <p>No</p>
                    <input type="radio" />
                    <p>Yes</p>
                    <input type="radio" />
                  </div>
                </div>
                <div>
                  <p>Name:</p>
                  <input text="text" className="forminput" />
                  <p>Donation Date:</p>
                  <input text="text" className="forminput" />
                </div>
                <div>
                  <p>Address:</p>
                  <input text="text" className="forminput" />
                  <p>Donation Time:</p>
                  <input text="text" className="forminput" />
                </div>
                <div className="receipt-div-input">
                  <p>Receipt No:</p>
                  <input text="text" className="forminput" />
                </div>
              </div>
              <div>
                <table className="table-cash-donation">
                  <tr>
                    <th>Head/Item</th>
                    <th>Amout</th>
                    <th>Remark</th>
                  </tr>
                  <tr>
                    <td>
                      <OptionsList />
                    </td>
                    <td>
                      {" "}
                      <input text="text" className="forminput1" />
                    </td>
                    <td>
                      {" "}
                      <input text="text" className="forminput1" />
                    </td>
                  </tr>
                  <tr>
                    <td>Total</td>
                    <td>0.22</td>
                    <td>
                      <hr />
                    </td>
                  </tr>
                </table>
              </div>
            </div>
            <div className="save-div-btn">
              <button className="save-btn">Save</button>
              <button className="calcel-btn">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CashDonation;
