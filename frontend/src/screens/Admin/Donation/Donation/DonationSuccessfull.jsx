import React, { useEffect } from 'react';
import images from '../../../../assets/images.png';
import { useNavigate } from 'react-router-dom';

function DonationSuccessfull({ handleClose, isData }) {
  const navigate = useNavigate();

  console.log('data from sucess', isData);

  const go_to_receipt = () => {
    if (isData) {
      navigate('/reciept', {
        state: {
          userdata: isData,
        },
      });
    }
  };

  useEffect(() => {
    // go_to_receipt();
  }, []);

  return (
    <>
      <div className="PaymentSuccessfull-main-div">
        <div className="PaymentSuccessfull-main-div-innear">
          <img src={images} alt=" images " />
          <p>Donation Added Successfully</p>
          <button
            onClick={() => {
              setTimeout(() => {
                navigate('/reciept', {
                  state: {
                    userdata: isData,
                  },
                });
              }, 1000);
            }}
            className="done-btn"
          >
            Download Receipt
          </button>
          <button
            onClick={() =>
              navigate('/admin-panel/reports/printcontent', {
                state: {
                  data: isData,
                },
              })
            }
            className="done-btn"
          >
            Print Receipt
          </button>
          <button onClick={() => handleClose()} className="ok_btn">
            Ok
          </button>
        </div>
      </div>
    </>
  );
}

export default DonationSuccessfull;
