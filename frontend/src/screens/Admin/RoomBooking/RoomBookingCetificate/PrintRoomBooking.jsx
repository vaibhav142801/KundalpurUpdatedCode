import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useReactToPrint } from 'react-to-print';
import './RoomBookingCetificate.css';

function PrintRoomBooking({ setopendashboard }) {
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
      setisData(location.state?.data);
    }
    setopendashboard(true);
  }, []);
  console.log('certificate', isData);

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
              <div className="innear_div_texx_dd">
                <div>
                  <p>आवास क्र</p>
                  <p>यात्री का नाम-</p>
                  <p>पिता/पति श्री-</p>
                </div>
                <div>
                  <p>
                    {/* {isData &&
                      isData.map((item) => {
                        return <span> {item?.RoomNo}</span>;
                      })} */}
                  </p>
                  <p>{isData?.name}</p>
                  <p>{isData?.Fname}</p>
                </div>
              </div>
              <div className="innear_div_texx_dd">
                <div>
                  <p>आगमन दिनांक</p>
                  <p>मोबाईल न.-</p>
                  <p>पता-</p>
                </div>
                <div>
                  <p>
                    {currDate} / {currTime}
                  </p>
                  <p>{isData?.contactNo}</p>
                  <p>{isData?.city}</p>
                </div>
              </div>
            </div>
            <div className="yyy_text_div">
              <p>यात्री संख्या </p>
              <p>Male: {isData?.male}</p>
              <p>Female: {isData?.female}</p>
              <p>Child: {isData?.child}</p>
              <p>
                Total:{' '}
                {Number(isData?.male) +
                  Number(isData?.female) +
                  Number(isData?.child)}
              </p>
            </div>

            <div>
              <table className="table_ddd">
                <tbody>
                  <tr>
                    <td className="table_tddd">धर्मशाला नाम</td>
                    <td className="table_tddd">रूम टाईप</td>
                    {/* <td className="table_tddd">रूम सुंविधाएं</td> */}
                    <td className="table_tddd">रुम न.</td>
                    {/* <td className="table_tddd">रूम की संख्या</td> */}
                    <td className="table_tddd">
                      सहयोग राशि
                      <p>
                        {isData?.nRoom} X
                        {checkindata &&
                          checkindata?.dharamshala &&
                          checkindata?.dharamshala?.advance}
                      </p>
                    </td>
                    <td className="table_tddd">
                      अमानत राशि
                      <p>
                        {isData?.nRoom}+{isData?.nRoom} X
                        {checkindata &&
                          checkindata?.dharamshala &&
                          checkindata?.dharamshala?.advance}
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td className="table_tddd">
                      {/* {checkindata &&
                        checkindata?.dharamshala[0]?.dharmasala?.name} */}
                    </td>
                    <td className="table_tddd">
                      {/* {checkindata &&
                        checkindata?.dharamshala[0]?.facility_name?.map(
                          (element, index) => (
                            <span key={index}> {element},</span>
                          ),
                        )} */}
                      {/* {checkindata &&
                        checkindata?.dharamshala[0]?.category_name} */}
                    </td>
                    {/* <td className="table_tddd">
                      {checkindata &&
                        checkindata?.dharamshala[0]?.facility_name?.map(
                          (element, index) => (
                            <span key={index}> {element},</span>
                          ),
                        )}
                    </td> */}
                    <td className="table_tddd">
                      {/* {isData &&
                        isData.map((item) => {
                          return <span> {item?.RoomNo}</span>;
                        })} */}
                    </td>
                    {/* <td className="table_tddd">{isData[0]?.nRoom}</td> */}
                    <td className="table_tddd">
                      {/* {Number(isData?.nRoom) *
                        Number(
                          checkindata && checkindata?.dharamshala?.advance,
                        )} */}
                    </td>
                    <td className="table_tddd">
                      {/* {Number(isData?.nRoom + isData?.nRoom) *
                        Number(
                          checkindata && checkindata?.dharamshala?.advance,
                        )} */}
                    </td>
                  </tr>
                </tbody>
              </table>
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
