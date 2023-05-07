import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useReactToPrint } from 'react-to-print';
import './RoomBookingCetificate.css';

function RoomBookingCetificate({ setopendashboard }) {
  const navigate = useNavigate();
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
      setisData(location.state?.data?.data);
      setcheckindata(location?.state?.checkindata);
    }
    setopendashboard(true);
  }, []);
  console.log('certificate', isData, checkindata);

  var options = { year: 'numeric', month: 'short', day: '2-digit' };
  var today = new Date(isData[0]?.date);
  const currDate = today
    .toLocaleDateString('en-IN', options)
    .replace(/-/g, ' ');
  const currTime = today.toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });
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
            style={{ marginLeft: '1.3rem', marginTop: '7rem' }}
          >
            <p className="yadda_text">यात्री आगमन रसीद</p>
            <div className="innear_div_texx">
              <div className="innear_div_texx_ddd">
                <div>
                  <p className="lineheight">आवास क्र</p>
                  <p className="lineheight">यात्री का नाम-</p>
                  <p className="lineheight">पिता/पति श्री-</p>
                </div>
                <div className="main_left">
                  <p className="lineheight">
                    {isData && isData[0]?.booking_id}
                  </p>
                  <p className="lineheight">{isData[0]?.name}</p>
                  <p className="lineheight">{isData[0]?.Fname}</p>
                </div>
              </div>
              <div className="innear_div_texx_ddd">
                <div>
                  <p className="lineheight">आगमन दिनांक</p>
                  <p className="lineheight">मोबाईल न.-</p>
                  <p className="lineheight">पता-</p>
                </div>
                <div className="main_left">
                  <p className="lineheight">
                    {currDate} / {currTime}
                  </p>
                  <p className="lineheight">{isData[0]?.contactNo}</p>
                  <p className="lineheight">{isData[0]?.city}</p>
                </div>
              </div>
            </div>
            <div className="yyy_text_div">
              <p>यात्री संख्या </p>
              <p>Male: {isData[0]?.male}</p>
              <p>Female: {isData[0]?.female}</p>
              <p>Child: {isData[0]?.child}</p>
              <p>
                Total:{' '}
                {Number(isData[0]?.male) +
                  Number(isData[0]?.female) +
                  Number(isData[0]?.child)}
              </p>
            </div>

            <div>
              <table className="table_ddd">
                <tbody>
                  <tr>
                    <td className="table_tddd">धर्मशाला नाम</td>
                    <td className="table_tddd">रूम टाईप & फेसिलिटी</td>
                    {/* <td className="table_tddd">रूम सुंविधाएं</td> */}
                    <td className="table_tddd">रुम न.</td>
                    {/* <td className="table_tddd">रूम की संख्या</td> */}
                    <td className="table_tddd">
                      सहयोग राशि
                      {/* <p>
                        {isData[0]?.nRoom} X
                        {checkindata &&
                          checkindata?.dharamshala &&
                          checkindata?.dharamshala[0]?.advance}
                      </p> */}
                    </td>
                    <td className="table_tddd">
                      अमानत राशि
                      {/* <p>
                        {isData[0]?.nRoom}+{isData[0]?.nRoom} X
                        {checkindata &&
                          checkindata?.dharamshala &&
                          checkindata?.dharamshala[0]?.advance}
                      </p> */}
                    </td>
                  </tr>
                  <tr>
                    <td className="table_tddd">
                      {checkindata &&
                        checkindata?.dharamshala[0]?.dharmasala?.name}
                    </td>
                    <td className="table_tddd">
                      {checkindata &&
                        checkindata?.dharamshala[0]?.facility_name?.map(
                          (element, index) => (
                            <span key={index}> {element},</span>
                          ),
                        )}
                      {checkindata &&
                        checkindata?.dharamshala[0]?.category_name}
                    </td>
                    {/* <td className="table_tddd">
                      {checkindata &&
                        checkindata?.dharamshala[0]?.facility_name?.map(
                          (element, index) => (
                            <span key={index}> {element},</span>
                          ),
                        )}
                    </td> */}
                    <td className="table_tddd lineheight10">
                      {Number(isData && isData?.roomAmount) * Number(1)}
                    </td>
                    <td className="table_tddd lineheight10">
                      {Number(isData && isData?.roomAmount) *
                        (Number(1) + Number(1))}
                    </td>
                    <td className="table_tddd lineheight10">
                      {Number(isData && isData?.roomAmount) * Number(1) -
                        Number(isData && isData?.roomAmount) *
                          (Number(1) + Number(1))}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p
              style={{
                textAlign: 'right',
                marginRight: '2rem',
                marginTop: '0.5rem',
                marginBottom: '0.5rem',
              }}
            >
              Admin
            </p>
          </div>
        </div>
      </div>
      <div className="button_div_print_download">
        <button onClick={() => handlePrint()}>Print</button>
      </div>
    </>
  );
}

export default RoomBookingCetificate;
