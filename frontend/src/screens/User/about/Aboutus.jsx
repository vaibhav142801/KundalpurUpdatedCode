import React from "react";
import lefttop from "../../../assets/lefttop.jpeg";
import innear from "../../../assets/innear.jpeg";
import rightbottom from "../../../assets/rightbottom.jpeg";
import check from "../../../assets/check.jpeg";
import om from "../../../assets/om.jpeg";
import bg from "../../../assets/bg.svg";
import img3 from "../../../assets/img3.jpeg";
import img1 from "../../../assets/img2.jpeg";
import img4 from "../../../assets/img4.jpeg";
import img2 from "../../../assets/img2.jpeg";
import img5 from "../../../assets/img5.jpeg";
import money from "../../../assets/money.jpeg";
import "./Aboutus.css";
function Aboutus() {
  return (
    <>
      <div className="supper-main-div1">
        <div className="Aboutus-main-div">
          <div className="left-imgs-div">
            <img className="img-1" src={rightbottom} alt="letff" />
            <img className="img-2" src={innear} alt="ss" />
            <img className="img-3" src={lefttop} alt="ss" />
          </div>
          <div className="tex-right-main-div">
            <div className="education-text">
              <img src={om} alt="om" />
              <p>EDUCATION FOR ALL RURAL CHILDREN</p>
            </div>
            <h2>
              We are a Hindu that believe <br />
              in Ram
            </h2>
            <div className="supper-check-main-div">
              <div className="check-main-div">
                <div className="check-inear-div">
                  <img src={check} alt="check" />
                  <p>Peace of Mind</p>
                </div>
                <div className="check-inear-div">
                  <img src={check} alt="check" />
                  <p>100% Satisfaction</p>
                </div>
              </div>
              <div className="check-main-div">
                <div className="check-inear-div">
                  <img src={check} alt="check" style={{ marginLeft: "10px" }} />
                  <p>Set For Pastor</p>
                </div>
                <div className="check-inear-div">
                  <img src={check} alt="check" style={{ marginLeft: "10px" }} />
                  <p>Trusted Company</p>
                </div>
              </div>
            </div>
            <div className="linnes-outer-div">
              <div className="line-main-div">
                <div className="line-1" />
                <div className="line-2" />
                <div className="line-1" />
              </div>

              <p>
                We are a Hindu that belives in Lord Rama and Vishnu
                <br /> Deva the followers and We are a Hindu that belives in
                <br /> Lord Rama and Vishnu Deva. This is where you should
                <br /> start
              </p>
            </div>
          </div>
        </div>
        <div className="about-bttom-div">
          <h2>Trusted by successful nonprofits around the india</h2>
        </div>
        <div className="bottom-img-div">
          <img src={img3} alt="img" />
          <img src={img2} alt="img" />
          <img src={img4} alt="img" />
          <img src={img5} alt="img" />
          <img src={img1} alt="img" />
        </div>
        <div className="donation-center">
          <div className="main-start-btn-div">
            <img src={money} alt="money" />
            <button className="donation-now-btn">Donate Now</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Aboutus;
