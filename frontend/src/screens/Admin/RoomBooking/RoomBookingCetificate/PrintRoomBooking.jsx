import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useReactToPrint } from 'react-to-print';
import './RoomBookingCetificate.css';

function PrintRoomBooking({ setopendashboard }) {
  const navigate = useNavigate();
  const adminName = sessionStorage.getItem('adminName');
  const empName = sessionStorage.getItem('empName');
  const location = useLocation();
  const componentRef = useRef();
  const [isData, setisData] = useState('');
  const [checkindata, setcheckindata] = useState('');
  console.log('data from certifucate', isData);

  function down() {
    console.log('cliii');
    const input = document.getElementById('receipt');
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'pt', 'a4', false);
      pdf.addImage(imgData, 'PNG', 0, 0, 600, 0, undefined, false);
      pdf.save('download.pdf');
    });
  }
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  useEffect(() => {
    if (location.state) {
      setisData(location.state?.data);
    }
    setopendashboard(true);
    setTimeout(() => {
      handlePrint();
    }, 10);
  }, []);
  console.log('certificate', isData);

  var options = { year: 'numeric', month: 'short', day: '2-digit' };
  var today = new Date(isData && isData?.date);
  const currDate = today
    .toLocaleDateString('en-IN', options)
    .replace(/-/g, ' ');
  const currTime = today.toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });

  var today1 = new Date();
  const currDatecheckout = today1
    .toLocaleDateString('en-IN', options)
    .replace(/-/g, ' ');
  const currTimecheckout = today1.toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });

  let difference = today1.getTime() - today.getTime();
  let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));

  return (
    <>
      <div
        className="button_div_print_download10"
        style={{ marginBottom: '-10rem' }}
      >
        <button onClick={() => navigate('/admin-panel/room/checkin')}>
          Back
        </button>

        <div />
      </div>
      <div className="main_room_receipt">
        <div className="print_ddd" id="receipt">
          <div
            className="main_room_receipt_innear"
            ref={componentRef}
            style={{ marginLeft: '0rem', marginTop: '5.2rem' }}
          >
            {' '}
            <div>
              <p className="yadda_text"> यात्री प्रस्थान रसीद</p>
            </div>
            <div className="innear_div_texx">
              <div className="innear_div_texx_dd">
                <div>
                  <p className="lineheight" style={{ color: 'gray' }}>
                    आवास क्र :
                  </p>
                  <p style={{ color: 'gray' }} className="lineheight">
                    मोबाईल न :
                  </p>
                  <p style={{ color: 'gray' }} className="lineheight">
                    यात्री का नाम :
                  </p>
                  <p style={{ color: 'gray' }} className="lineheight">
                    पिता/पति श्री :
                  </p>
                </div>
                <div className="main_left">
                  <p className="lineheight">{isData && isData?.booking_id}</p>
                  <p className="lineheight">{isData && isData?.contactNo}</p>
                  <p className="lineheight">{isData && isData?.name}</p>
                  <p className="lineheight">{isData && isData?.Fname}</p>
                </div>
              </div>
              <div className="innear_div_texx_dd" style={{ marginLeft: '0px' }}>
                <div>
                  <p style={{ color: 'gray' }} className="lineheight">
                    प्रस्थान दिनाँक :
                  </p>
                  <p style={{ color: 'gray' }} className="lineheight">
                    आगमन दिनांक:
                  </p>

                  <p style={{ color: 'gray' }} className="lineheight">
                    स्टे :
                  </p>
                  <p style={{ color: 'gray' }} className="lineheight">
                    पता :
                  </p>
                </div>
                <div className="main_left">
                  <p className="lineheight">
                    {currDatecheckout} / {currTimecheckout}
                  </p>
                  <p className="lineheight">
                    {currDate} / {currTime}
                  </p>

                  <p className="lineheight">{TotalDays} Days</p>
                  <p className="lineheight">{isData && isData?.address}</p>
                </div>
              </div>
            </div>
            <div>
              <table className="table_ddd">
                <tbody>
                  <tr>
                    <td className="table_tddd lineheight10">धर्मशाला नाम</td>
                    <td className="table_tddd lineheight10">
                      रूम टाईप & रूम न.
                    </td>

                    <td className="table_tddd lineheight10">सहयोग राशि</td>
                    <td className="table_tddd lineheight10">अमानत राशि</td>

                    <td className="table_tddd lineheight10">शेष राशि वापिसी</td>
                  </tr>
                  <tr>
                    <td className="table_tddd lineheight10">
                      {isData && isData?.dharmasala?.name}
                    </td>
                    <td className="table_tddd lineheight10">
                      ({' '}
                      {isData &&
                        isData?.facility_name &&
                        isData?.facility_name.map((element, index) => (
                          <span key={index}> {element}</span>
                        ))}
                      ,{isData && isData?.category_name})-
                      {isData && isData?.roonNo}
                    </td>

                    <td className="table_tddd lineheight10">
                      {Number(isData && isData?.roomAmount) * Number(TotalDays)}
                      .00
                    </td>
                    <td className="table_tddd lineheight10">
                      {Number(isData && isData?.advanceAmount)}
                      .00
                    </td>
                    <td className="table_tddd lineheight10">
                      {
                        Number(isData && isData?.roomAmount) *
                          Number(TotalDays)-Number(isData && isData?.advanceAmount) }
                      .00
                    </td>
                  </tr>
                </tbody>
              </table>
              <p
                style={{
                  textAlign: 'right',
                  marginRight: '2rem',
                  marginTop: '0.5rem',
                  marginBottom: '0.5rem',
                }}
              >
                {empName ? empName : adminName}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="button_div_print_download">
        <button onClick={() => handlePrint()}>Print</button>
      </div>
    </>
  );
}

export default PrintRoomBooking;
