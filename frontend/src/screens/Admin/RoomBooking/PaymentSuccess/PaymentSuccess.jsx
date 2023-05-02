import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ok from '../../../../assets/ok.png';
import { serverInstance } from '../../../../API/ServerInstance';
import './PaymentSuccess.css';
function PaymentSuccess({ setopendashboard }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isData, setisData] = useState('');
  const [paymentmode, setpaymentmode] = useState('');
  const [checkindata, setcheckindata] = useState('');
  useEffect(() => {
    if (location.state) {
      setisData(location?.state?.data?.data);
      setcheckindata(location?.state?.checkindata);
      console.log('Payment details payment', location?.state?.checkindata);
    }
    setopendashboard(true);
  }, []);

  var options = { year: 'numeric', month: 'short', day: '2-digit' };
  var today = new Date(isData && isData.data[0]?.date);
  const currDate = today
    .toLocaleDateString('en-IN', options)
    .replace(/-/g, ' ');
  const currTime = today.toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });

  var today1 = new Date(isData && isData.data[0]?.coutDate);
  const currDate1 = today1
    .toLocaleDateString('en-IN', options)
    .replace(/-/g, ' ');
  const currTime1 = today1.toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });
  return (
    <>
      <div style={{ marginLeft: '5rem', marginRight: '1.2rem' }}>
        <div className="main_div_head_tyopeeeebook">
          <div className="form_div_absolutebook_payment">
            <div className="centerdivhh">
              <p> Payment successful</p>
              <img src={ok} alt="ss" />
            </div>
            <div className="name_of_divvsssssv">
              <div className="name_of_divvsssssv10">
                {/* <p>Payment type</p> */}
                <p>Mobile number</p>
                <p>Amount Paid</p>
                <p>Advance Rate</p>
                <p>Booking id</p>
                <p>Room No</p>
                <p>Check in date time</p>
                <p>Check out date time</p>
                {/* <p>Transaction id</p> */}
              </div>
              <div className="name_of_divvsssssv10">
                <p>{paymentmode}</p>
                {/* <p>HDFC</p> */}
                <p>{isData.data && isData.data[0]?.contactNo}</p>

                <p>
                  {checkindata &&
                    checkindata?.roomcount?.length *
                      Number(
                        checkindata?.dharamshala &&
                          checkindata?.dharamshala[0]?.advance,
                      )}
                </p>
                <p>
                  {checkindata?.dharamshala &&
                    checkindata?.dharamshala[0]?.advance}
                </p>
                <p>{isData.data && isData.data[0]?.booking_id}</p>
                <p>
                  {isData &&
                    isData?.data &&
                    isData?.data?.map((item) => {
                      return <span> {item?.RoomNo}</span>;
                    })}
                </p>
                <p>
                  {currDate} / {currTime}
                </p>
                <p>
                  {currDate1} / {currTime1}
                </p>
                {/* <p>125362547859</p> */}
              </div>
            </div>
            <div className="payment_btn_duvvvvvv">
              <button
                onClick={() =>
                  navigate('/admin-panel/room/roombookingcetificate', {
                    state: {
                      data: isData,
                      checkindata: checkindata,
                    },
                  })
                }
                className="payment_btn_duvvvvvv10"
              >
                Confirmation
              </button>
              <button className="payment_btn_duvvvvvv11">Booking report</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PaymentSuccess;
