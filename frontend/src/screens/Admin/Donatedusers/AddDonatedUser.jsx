import React, { useEffect, useState } from "react";
import { serverInstance } from "../../../API/ServerInstance";
import badebaba from "../../../assets/badebaba.jpg";
import { displayRazorpay } from "../../../RazorPay/RazorPay";

function AddDonatedUser() {
  const initialstate = {
    name: "",
    chequeno: "",
    date_of_sub: "",
    name_of_bank: "",
    Remark: "",
  };
  const [isFrom, setisFrom] = useState(initialstate);
  const [isError, setisError] = useState({});

  const [mode, setmode] = useState("");
  const [amount, setamount] = useState("");
  const [donationtype, setdonationtype] = useState("");
  const modes = ["Please Select donation Mode", "Online", "cheque"];
  const typesOfDonation = ["Please Select donation types", "Good", "Bad"];
  const onChangeText = (name, value) => {
    setisFrom({ ...isFrom, [name]: value });
  };

  const handlesubmit = () => {
    setisError(null);

    if (!sessionStorage.getItem("token")) {
      Swal.fire("Error!", "please authenticate ", "error");
      return false;
    }

    if (!isFrom.name) {
      setisError({ ...isError, name: "please enter your name" });
      return false;
    }
    if (!amount || amount === 0) {
      setisError({ ...isError, amount: "please enter amount" });
      return false;
    }

    if (mode === "cheque") {
      if (!isFrom.chequeno) {
        setisError({ ...isError, chequeno: "please enter cheque no." });
        return false;
      }
      if (!isFrom.date_of_sub) {
        setisError({
          ...isError,
          date_of_sub: "please enter date fo check submission",
        });
        return false;
      }
      if (!isFrom.name_of_bank) {
        setisError({
          ...isError,
          name_of_bank: "please enter name of bank",
        });
        return false;
      }
    }

    displayRazorpay(
      {
        ammount: amount,
        userid: 1,
      },
      (data) => {
        serverInstance("user/add-donation", "POST", {
          NAME: isFrom.name,
          MODE_OF_DONATION: mode === "Online" ? 1 : 2,
          AMOUNT: amount,
          CHEQUE_NO: isFrom?.chequeno,
          DATE_OF_CHEQUE: isFrom?.date_of_sub,
          NAME_OF_BANK: isFrom?.name_of_bank,
          DATE_OF_DAAN: new Date(),
          PAYMENT_ID: data.razorpay_order_id,
        }).then((res) => {
          if (res.status) {
            Swal.fire("Great!", res.msg, "success").then(() => {
              window.location.reload();
            });
          } else {
            Swal.fire("Error!", "Somthing went wrong!!", "error");
          }
        });
      }
    );
  };

  return (
    <>
      <div className="supper-main-div">
        {/* <div className="donation-top-img">
          <img src={badebaba} alt="badebaba" />
          <div className="donation-top-img-overlay">Donation</div>
        </div> */}

        <div className="supper-inear-main-div">
          <div className="main-form-div" style={{ width: "67%" }}>
            <h2>Add Donation</h2>

            <div className="main-input-div">
              <div className="inner-input-div">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  onChange={(e) => onChangeText("name", e.target.value)}
                />
                <p style={{ color: "red", marginTop: "5px" }}>
                  {isError?.name}
                </p>
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
                      <label>Amount</label>
                      <input
                        type="text"
                        value={amount}
                        onChange={(e) => setamount(e.target.value)}
                      />

                      <p style={{ color: "red", marginTop: "5px" }}>
                        {isError?.amount}
                      </p>

                      <div
                        className="donation-money-div-main"
                        style={{ marginTop: "10px" }}
                      >
                        <div className="btn-recharge-div">
                          <button onClick={() => setamount("1111")}>
                            ₹1111
                          </button>
                          <button onClick={() => setamount("2121")}>
                            ₹2121
                          </button>
                          <button onClick={() => setamount("5151")}>
                            ₹5151
                          </button>
                        </div>
                        <div className="btn-recharge-div">
                          <button onClick={() => setamount("11111")}>
                            ₹11,111
                          </button>
                          <button onClick={() => setamount("21211")}>
                            ₹21,211
                          </button>
                          <button onClick={() => setamount("51511")}>
                            ₹51,511
                          </button>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="inner-input-div">
                        <label>Remark</label>
                        <input
                          type="text"
                          name="remark"
                          onChange={(e) =>
                            onChangeText("remark", e.target.value)
                          }
                        />
                      </div>
                      <div className="inner-input-div">
                        <label>Type of donation </label>
                        <select
                          id="type"
                          name="mode"
                          value={donationtype}
                          onChange={(e) => setdonationtype(e.target.value)}
                        >
                          {typesOfDonation.map((mode) => (
                            <option key={mode} value={mode}>
                              {mode}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="save-div-btn">
                    <button className="save-btn" onClick={handlesubmit}>
                      Process to pay
                    </button>
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
                      <input
                        type="text"
                        name="chequeno"
                        onChange={(e) =>
                          onChangeText("chequeno", e.target.value)
                        }
                      />
                      <p style={{ color: "red", marginTop: "5px" }}>
                        {isError?.chequeno}
                      </p>
                    </div>
                    <div className="inner-input-div">
                      <label>Date</label>
                      <input
                        type="date"
                        name="date_of_sub"
                        onChange={(e) =>
                          onChangeText("date_of_sub", e.target.value)
                        }
                      />

                      <p style={{ color: "red", marginTop: "5px" }}>
                        {isError?.date_of_sub}
                      </p>
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
                      <p style={{ color: "red", marginTop: "5px" }}>
                        {isError?.amount}
                      </p>
                      <div
                        className="donation-money-div-main"
                        style={{ marginTop: "10px" }}
                      >
                        <div className="btn-recharge-div">
                          <button onClick={() => setamount("1111")}>
                            ₹1111
                          </button>
                          <button onClick={() => setamount("2121")}>
                            ₹2121
                          </button>
                          <button onClick={() => setamount("5151")}>
                            ₹5151
                          </button>
                        </div>
                        <div className="btn-recharge-div">
                          <button onClick={() => setamount("11111")}>
                            ₹11,111
                          </button>
                          <button onClick={() => setamount("21211")}>
                            ₹21,211
                          </button>
                          <button onClick={() => setamount("51511")}>
                            ₹51,511
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="inner-input-div">
                      <label> Bank Name</label>
                      <input
                        type="text"
                        name="name_of_bank"
                        onChange={(e) =>
                          onChangeText("name_of_bank", e.target.value)
                        }
                      />

                      <p style={{ color: "red", marginTop: "5px" }}>
                        {isError?.name_of_bank}
                      </p>
                      <div className="inner-input-div">
                        <label>Remark</label>
                        <input
                          type="text"
                          name="remark"
                          onChange={(e) =>
                            onChangeText("remark", e.target.value)
                          }
                        />
                        <label>Type of donation </label>
                        <select
                          id="type"
                          name="mode"
                          value={donationtype}
                          onChange={(e) => setdonationtype(e.target.value)}
                        >
                          {typesOfDonation.map((mode) => (
                            <option key={mode} value={mode}>
                              {mode}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div
                    className="main-input-div remark-divvv"
                    style={{ marginTop: "-25px" }}
                  ></div>

                  <div className="save-div-btn">
                    <button
                      type="button"
                      onClick={handlesubmit}
                      className="save-btn"
                    >
                      Process to pay
                    </button>
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

export default AddDonatedUser;
