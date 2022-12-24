import React, { useEffect, useState } from "react";
import badebaba from "../../../assets/badebaba.jpg";
import "./Donation.css";
function Donation() {
  const [mode, setmode] = useState("");
  const [amount, setamount] = useState("");
  const modes = ["Please Select donation Mode", "Online", "cheque"];
  console.log(mode);

  return (
    <>
      <div className="supper-main-div">
        <div className="donation-top-img">
          <img src={badebaba} alt="badebaba" />
          <div className="donation-top-img-overlay">Donation</div>
        </div>
        <div className="supper-inear-main-div">
          <div className="main-form-div">
            <h2>Add Donation</h2>

            <div className="main-input-div">
              <div className="inner-input-div">
                <label>Name</label>
                <input type="text" />
              </div>
              <div className="inner-input-div">
                <label for="type">Donation Mode</label>
                <select
                  id="type"
                  name="mode"
                  value={mode}
                  onChange={(e) => setmode(e.target.value)}
                >
                  {modes.map((mode) => (
                    <option key={mode} value={mode}>
                      {mode}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {mode === "Online" && (
              <>
                <div>
                  <div className="main-input-div">
                    <div className="inner-input-div">
                      <label>Amout</label>
                      <input
                        type="text"
                        value={amount}
                        onChange={(e) => setamount(e.target.value)}
                      />

                      <div
                        className="donation-money-div-main"
                        style={{ marginTop: "10px" }}
                      >
                        <div className="btn-recharge-div">
                          <button onClick={() => setamount("65")}>₹1100</button>
                          <button onClick={() => setamount("300")}>
                            ₹2100
                          </button>
                          <button onClick={() => setamount("500")}>
                            ₹5100
                          </button>
                        </div>
                        <div className="btn-recharge-div">
                          <button onClick={() => setamount("3500")}>
                            ₹11,000
                          </button>
                          <button onClick={() => setamount("10000")}>
                            ₹21,000
                          </button>
                          <button onClick={() => setamount("50000")}>
                            ₹51,000
                          </button>
                        </div>
                      </div>
                    </div>
                    <div style={{ paddingBottom: "3%" }}>
                      <div className="inner-input-div">
                        <label>Remark</label>
                        <input type="text" value={amount} />
                        <div className="inner-input-div">
                          <label style={{ marginTop: "1rem" }} for="type">
                            Type of Daan
                          </label>
                          <select
                            id="type"
                            name="mode"
                            value={mode}
                            onChange={(e) => setmode(e.target.value)}
                          >
                            {modes.map((mode) => (
                              <option key={mode} value={mode}>
                                {mode}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="save-div-btn">
                    <button className="save-btn">Process to pay</button>
                  </div>
                </div>
              </>
            )}
            {mode === "cheque" && (
              <>
                <div>
                  <div className="main-input-div">
                    <div className="inner-input-div">
                      <label>Cheque No</label>
                      <input type="text" />
                    </div>
                    <div className="inner-input-div">
                      <label>Date</label>
                      <input type="date" />
                    </div>
                  </div>
                  <div className="main-input-div">
                    <div className="inner-input-div">
                      <label>Amout</label>
                      <input
                        type="text"
                        value={amount}
                        onChange={(e) => setamount(e.target.value)}
                      />
                      <div
                        className="donation-money-div-main"
                        style={{ marginTop: "10px" }}
                      >
                        <div className="btn-recharge-div">
                          <button onClick={() => setamount("65")}>₹1100</button>
                          <button onClick={() => setamount("300")}>
                            ₹2100
                          </button>
                          <button onClick={() => setamount("500")}>
                            ₹5100
                          </button>
                        </div>
                        <div className="btn-recharge-div">
                          <button onClick={() => setamount("3500")}>
                            ₹11,000
                          </button>
                          <button onClick={() => setamount("10000")}>
                            ₹21,000
                          </button>
                          <button onClick={() => setamount("50000")}>
                            ₹51,000
                          </button>
                        </div>
                      </div>
                    </div>
                    <div
                      className="inner-input-div"
                      style={{ marginBottom: "133px" }}
                    >
                      <label> Bank Name</label>
                      <input type="text" />
                    </div>
                  </div>
                  <div
                    className="main-input-div remark-divvv"
                    style={{ marginTop: "-25px" }}
                  >
                    <div className="inner-input-div">
                      <label>Remark</label>
                      <input type="text" />
                    </div>
                    <div className="inner-input-div">
                      <label for="type">Type of Daan</label>
                      <select
                        id="type"
                        name="mode"
                        value={mode}
                        onChange={(e) => setmode(e.target.value)}
                      >
                        {modes.map((mode) => (
                          <option key={mode} value={mode}>
                            {mode}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="save-div-btn">
                    <button className="save-btn">Submit</button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Donation;
