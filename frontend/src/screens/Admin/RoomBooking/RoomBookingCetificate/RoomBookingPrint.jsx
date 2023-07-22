import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useReactToPrint } from 'react-to-print';
import './RoomBookingCetificate.css';
import moment from 'moment';
function RoomBookingPrint({ setopendashboard }) {
  const navigate = useNavigate();
  const location = useLocation();
  const componentRef = useRef();
  const [isData, setisData] = useState('');
  const [checkindata, setcheckindata] = useState('');

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
      setcheckindata(location?.state?.checkindata);
    }

    setopendashboard(true);
    setTimeout(() => {
      handlePrint();
    }, 10);
  }, []);
  console.log('certificate', isData);

  var options = { year: 'numeric', month: 'short', day: '2-digit' };
  var today = new Date(isData && isData[0]?.date);
  const currDate = today
    .toLocaleDateString('en-IN', options)
    .replace(/-/g, ' ');
  const currTime = today.toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });

  var today1 = new Date(isData && isData[0]?.coutDate);
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
  var checkindate = moment(isData[0]?.date).format('DD');
  var checkoutdate = moment(isData[0]?.coutDate).format('DD');
  var days = checkoutdate - checkindate;
  return (
    <>
      <div
        className="button_div_print_download10"
        style={{ marginBottom: '-10rem' }}
      >
        <button onClick={() => navigate(-1)}>Back</button>

        <div />
      </div>
      <div className="main_room_receipt">
        <div className="print_ddd" id="receipt">
          <div
            className="main_room_receipt_innear"
            ref={componentRef}
            style={{ marginLeft: '0rem', marginTop: '5.2rem' }}
          >
            <div style={{ backgroundColor: '#01B0F1' }}>
              <p className="yadda_text lineheight">
                यात्री आगमन रसीद
                <span style={{ fontSize: '13px' }}>
                  ({isData[0]?.paymentMode === 2 ? 'Cash' : 'Online'})
                </span>
              </p>
            </div>

            <div className="innear_div_texx">
              <div className="innear_div_texx_dd">
                <div>
                  <p className="lineheight" style={{ color: 'gray' }}>
                    आवास क्र :
                  </p>

                  <p style={{ color: 'gray' }} className="lineheight">
                    यात्री का नाम :
                  </p>
                  <p style={{ color: 'gray' }} className="lineheight">
                    पिता/पति श्री :
                  </p>
                </div>
                <div className="main_left">
                  <p className="lineheight">
                    {isData && isData[0]?.booking_id}
                  </p>

                  <p className="lineheight">{isData && isData[0]?.name}</p>
                  <p className="lineheight">{isData && isData[0]?.Fname}</p>
                </div>
              </div>
              <div className="innear_div_texx_dd" style={{ marginLeft: '0px' }}>
                <div>
                  <p style={{ color: 'gray' }} className="lineheight">
                    आगमन दिनांक:
                  </p>
                  <p style={{ color: 'gray' }} className="lineheight">
                    मोबाईल न :
                  </p>
                  <p style={{ color: 'gray' }} className="lineheight">
                    पता :
                  </p>
                  <p style={{ color: 'gray' }} className="lineheight">
                    स्टे :
                  </p>
                </div>
                <div className="main_left">
                  <p className="lineheight">
                    {currDate} / {currTime}
                  </p>
                  <p className="lineheight">{isData && isData[0]?.contactNo}</p>
                  <p className="lineheight">{isData && isData[0]?.address}</p>
                  <p className="lineheight">{days}</p>
                </div>
              </div>
            </div>

            <div className="yyy_text_div">
              <p className="lineheight">यात्री संख्या </p>
              <p className="lineheight">Male: {isData[0]?.male}</p>
              <p className="lineheight">Female: {isData[0]?.female}</p>
              <p className="lineheight">Child: {isData[0]?.child}</p>
              <p className="lineheight">
                Total:
                {Number(isData[0]?.male) +
                  Number(isData[0]?.female) +
                  Number(isData[0]?.child)}
              </p>
            </div>

            <div>
              <table className="table_ddd">
                <tbody>
                  <tr>
                    <td className="table_tddd lineheight10">धर्मशाला नाम</td>
                    <td className="table_tddd lineheight10">
                      रूम टाईप & फेसिलिटी
                    </td>
                    <td className="table_tddd lineheight10">रूम न</td>
                    {/* <td className="table_tddd">रूम सुंविधाएं</td> */}
                    {/* <td className="table_tddd lineheight10">
                                  रुम न.
                                </td> */}
                    {/* <td className="table_tddd">रूम की संख्या</td> */}
                    <td className="table_tddd lineheight10">
                      सहयोग राशि
                      {/* <p className="lineheight10">
                                    {isData && isData?.nRoom && isData?.nRoom}X
                                    {isData &&
                                      isData?.roomAmount &&
                                      isData?.roomAmount}
                                  </p> */}
                    </td>
                    <td className="table_tddd lineheight10">
                      अमानत राशि
                      {/* <p className="lineheight10">
                                    {isData && isData?.nRoom && isData?.nRoom}+
                                    {isData && isData?.nRoom && isData?.nRoom}X
                                    {isData &&
                                      isData?.roomAmount &&
                                      isData?.roomAmount}
                                  </p> */}
                    </td>

                    {/* <td className="table_tddd">
                            अमानत राशि
                            <p>
                              {isData && isData[0]?.nRoom && isData[0]?.nRoom} X
                              {isData &&
                                isData[0]?.roomAmount &&
                                isData[0]?.roomAmount}
                            </p>
                          </td> */}
                  </tr>
                  {isData &&
                    isData?.map((item, index) => {
                      return (
                        <tr>
                          <td className="table_tddd lineheight10">
                            {checkindata?.dharamshala[0]?.dharmasala?.name}
                          </td>
                          <td className="table_tddd lineheight10">
                            {checkindata?.dharamshala[0]?.facility_name[0]}
                          </td>
                          <td className="table_tddd lineheight10">
                            {item?.RoomNo}
                          </td>

                          <td className="table_tddd lineheight10">
                            {Number(item?.roomAmount)}
                            .00
                          </td>
                          <td className="table_tddd lineheight10">
                            {Number(item?.advanceAmount)}
                            .00
                          </td>
                        </tr>
                      );
                    })}

                  <tr>
                    <td></td>
                    <td></td>
                    <td className="table_tddd lineheight10">Total</td>
                    <td
                      style={{ fontWeight: 800 }}
                      className="table_tddd lineheight10"
                    >
                      {isData &&
                        isData?.reduce((acc, item) => {
                          return acc + parseInt(item?.roomAmount);
                        }, 0)}
                    </td>
                    <td
                      style={{ fontWeight: 800 }}
                      className="table_tddd lineheight10"
                    >
                      {isData &&
                        isData?.reduce((acc, item) => {
                          return acc + parseInt(item?.advanceAmount);
                        }, 0)}
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
                {isData && isData[0]?.bookedByName}
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

export default RoomBookingPrint;
