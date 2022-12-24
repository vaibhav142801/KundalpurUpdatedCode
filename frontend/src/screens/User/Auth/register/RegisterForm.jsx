import { useState } from "react";
import VerifyMobile from "./VerifyMobile";
import { useNavigate } from "react-router-dom";
import logo from "../../../../assets/sideimg.jpeg";
import "./registerform.scss";
const Register = () => {
  const navigate = useNavigate();
  const [verify, setVerify] = useState(false);
  const [mobileNo, setMobileNo] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, fullName, password, mobileNumber } = Object.fromEntries(
      new FormData(e.currentTarget)
    );

    if (
      typeof email === "string" &&
      typeof password === "string" &&
      typeof fullName === "string" &&
      typeof mobileNumber === "string"
    ) {
      console.log({ email, fullName, password, mobileNumber });
      setVerify(true);
    }
  };

  const handleVerify = (otp) => {
    console.log({ otp });
    setVerify(false);
    navigate("/");
  };

  const RegisterInputs = () => {
    return (
      <div className="mainlogin-div">
        <img className="img-container" src={logo} alt="logo " />
        <form onSubmit={handleSubmit} className="register-form">
          <div className="heading">Create Account</div>
          <div className="input-group">
            <label htmlFor="fullName">Full name</label>
            <input
              name="fullName"
              required
              type="text"
              id="full-name"
              placeholder="enter full name"
            />
          </div>
          <div className="input-group">
            <label htmlFor="mobile-number">Mobile Number</label>
            <input
              name="mobileNumber"
              required
              type="tel"
              id="mobileNumber"
              placeholder="enter mobile number"
            />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              name="email"
              required
              type="email"
              id="email"
              placeholder="enter email"
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              name="password"
              required
              title="*At least six characters"
              pattern=".{6,}"
              type="password"
              id="password"
              placeholder="enter password"
            />
            <div>*At least six characters</div>
          </div>
          <div className="input-group">
            <button type="submit" className="register-btn">
              Continue
            </button>
          </div>
        </form>
      </div>
    );
  };
  return (
    <>
      {!verify ? (
        <RegisterInputs />
      ) : (
        <VerifyMobile
          title={"Verify Mobile Number"}
          description={"We have send the OTP to your mobile number"}
          handleVerify={handleVerify}
          mobileNo={mobileNo || "0123456878"}
        />
      )}
    </>
  );
};

export default Register;
