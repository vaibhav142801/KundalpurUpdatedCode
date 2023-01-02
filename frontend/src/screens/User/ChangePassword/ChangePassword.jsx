import React from "react";
import "./ChangePassword.css";
function ChangePassword() {
  return (
    <>
      <div className="mainbghomediv">
        <div className="main_change_password">
          <div lassName="main_change_password_content">
            <div>
              <div
                // className={
                //   formerror.Remark
                //     ? "inner-input-div-input-red"
                //     : "inner-input-div"
                // }

                className="inner-input-div"
              >
                <label>Old Password</label>
                <input
                  type="text"
                  name="Remark"
                  placeholder="Enter Old Password"
                  //   value={donationdata.Remark}
                  //   onChange={onChange}
                />
                {/* <p style={{ color: "red", marginTop: "5px" }}>
                          {formerror.Remark}
                        </p> */}
              </div>
              <div
                // className={
                //   formerror.Remark
                //     ? "inner-input-div-input-red"
                //     : "inner-input-div"
                // }

                className="inner-input-div"
              >
                <label>New Password</label>
                <input
                  type="text"
                  name="Remark"
                  placeholder="Enter New Password"
                  //   value={donationdata.Remark}
                  //   onChange={onChange}
                />
                {/* <p style={{ color: "red", marginTop: "5px" }}>
                          {formerror.Remark}
                        </p> */}
              </div>
              <div
                // className={
                //   formerror.Remark
                //     ? "inner-input-div-input-red"
                //     : "inner-input-div"
                // }

                className="inner-input-div"
              >
                <label>Confirm Password</label>
                <input
                  type="text"
                  name="Remark"
                  placeholder="Enter Confirm Password"
                  //   value={donationdata.Remark}
                  //   onChange={onChange}
                />
                {/* <p style={{ color: "red", marginTop: "5px" }}>
                          {formerror.Remark}
                        </p> */}
              </div>
            </div>

            <div className="opt_div_text">
              <p>The minimum Password age is 1</p>
              <p>The maximum Password age is 45</p>
              <p>No of Password remembered is 24</p>
              <p>The Password complexity property is enabled</p>
            </div>
            <div className="btn_div_change_password">
              <button className="ChangePassword_btn">Change Password </button>
              <button className="cancel_btn_password">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChangePassword;
