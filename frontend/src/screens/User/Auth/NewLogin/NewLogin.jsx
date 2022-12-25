import { useState } from "react";
import "./NewLogin.scss";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../../assets/sideimg.jpeg";
import OtpVerify from "./OtpVerify";
import { useDispatch } from "react-redux";
import {
  LoginwithOtp,
  VerifyOtp,
} from "../../../../Redux/redux/action/AuthAction";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const VivekPLogin = () => {
  const [verify, setVerify] = useState(false);
  const [mobileNo, setMobileNo] = useState("");
  const dispatch = useDispatch();
  const navigation = useNavigate();

  const handleInputChange = (e) => {
    setMobileNo(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!mobileNo) {
      Swal.fire("Error!", "please enter mobile no.", "error");
      return false;
    }
    if (mobileNo.length !== 10) {
      Swal.fire("Error!", "please enter valid mobile no.", "error");
      return false;
    }
    setVerify(true);
    setMobileNo(mobileNo);
    dispatch(
      LoginwithOtp({ mobile_no: mobileNo }, (res) => {
        if (res.status === 1) {
          Swal.fire("Great!", res.msg, "success");
          setVerify(true);
          setMobileNo(mobileNo);
        } else {
          Swal.fire("Error!", res.message, "error");
        }
      })
    );
  };

  const handleVerify = (otp) => {
    dispatch(
      VerifyOtp({ username: mobileNo, otp: otp }, (res) => {
        console.log(res);
        if (res) {
          sessionStorage.setItem("token", res.tokens.access.token);
          navigation("/");
          Swal.fire("Great!", res.msg, "success");
          setMobileNo("");
        } else {
          Swal.fire("Error!", res.message, "error");
        }
      })
    );
    // setVerify(false);
    // setMobileNo(mobileNo);
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
