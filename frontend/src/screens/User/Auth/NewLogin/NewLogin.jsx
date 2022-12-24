import { useState } from "react";
import "./NewLogin.scss";
import { Link } from "react-router-dom";
import logo from "../../../../assets/sideimg.jpeg";
import OtpVerify from "./OtpVerify";

const VivekPLogin = () => {
  const [verify, setVerify] = useState(false);
  const [mobileNo, setMobileNo] = useState("");

  const handleInputChange = (e) => {
    setMobileNo(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(mobileNo);
    // const { mobileNumber } = Object.fromEntries(new FormData(e.currentTarget));

    // setVerify(true);
    // setMobileNo(mobileNo);
  };

  const handleVerify = (otp) => {
    setVerify(false);
    setMobileNo(mobileNo);
  };

  const MoNumberInput = () => {
    return (
      <div className="mainlogin-div">
        <img className="img-container" src={logo} alt="logo " />
        <form onSubmit={handleSubmit} className="login-form">
          <div className="heading">Login</div>
          <div className="button-container">
            <Link to="/login" className="navi-button">
              Email
            </Link>
            <button
              className="pl-button pl-button--active"
              id="secondary-button"
            >
              Phone Number
            </button>
          </div>

          <div className="input-group">
            <label htmlFor="tel">Phone Number</label>
            <input
              required
              name="mobileNumber"
              type="tel"
              id="mobileNumber"
              value={mobileNo}
              onChange={handleInputChange}
              placeholder="enter phone number"
            />
          </div>

          <div className="input-group">
            <button type="submit" className="login-btn">
              Send OTP
            </button>
          </div>

          <span className="newusertag">New to Quality Cricket</span>
          <Link to="/register" className="creatbtn">
            Create Account
          </Link>
        </form>
      </div>
    );
  };
  return (
    <>
      {!verify ? (
        <MoNumberInput />
      ) : (
        <OtpVerify
          title={"Login"}
          description={"We have send the OTP to your mobile number"}
          handleVerify={handleVerify}
          mobileNo={mobileNo}
        />
      )}
    </>
  );
};

export default VivekPLogin;
