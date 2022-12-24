import React from "react";
import logo from "../../../assets/sideimg.jpeg";
import money from "../../../assets/money.jpeg";
import "./Home.css";
import Aboutus from "../about/Aboutus";
const Home = () => {
  return (
    <>
      <div>
        <div className="mainbghomediv">
          <div className="home-right-text">
            <div>
              <h2>
                Some Important Life <br /> Lessons From Gita
              </h2>
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
              <div className="main-start-btn-div">
                <img src={money} alt="money" />
                <button className="donation-now-btn">Donate Now</button>
              </div>
            </div>
          </div>

          <div className="home-left-img">
            <img src={logo} alt="logo" />
          </div>
        </div>
      </div>
      <Aboutus />
    </>
  );
};

export default Home;
