import React, { useRef, useState, useEffect } from 'react';
import { useReactToPrint } from 'react-to-print';
import Typography from '@mui/material/Typography';
import Moment from 'moment-js';
function PrintRoomBooking({ handleClose, isData }) {
  const componentRef = useRef();

  const [userName, setuserName] = useState('');

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  useEffect(() => {
    setuserName(sessionStorage.getItem('empName'));
  }, []);

  var today = new Date();

  const currTime = today.toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });
  return (
    <>
      <div style={{ maxHeight: 'calc(80vh - 4rem)', overflowY: 'auto' }}>
        <div ref={componentRef} style={{ padding: '1rem' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
            }}
          >
            <p>
              श्री दिगम्बर जैन सिद्धक्षेत्र कुण्डलगिरि कुण्डलपुर दमोह (म.प्र.)
            </p>

            <Typography variant="body2" color="primary" align="right">
              {Moment(today).format('DD-MM-YYYY')}/ {currTime}
              {userName && <>({userName})</>}
            </Typography>
          </div>
          <p
            style={{
              color: 'rgb(60, 95, 254)',
              marginTop: '1rem',
              marginBottom: '1rem',
            }}
          >
            Room Booking(आवास)
          </p>
          <div style={{ width: '100%' }}>
            <div
              style={{
                // display: 'flex',
                // justifyContent: 'space-between',
                marginBottom: '1rem',
                marginTop: '1rem',
              }}
            >
              <table>
                <tr
                  className="margintop_add"
                  style={{ borderBottom: '1px solid gray' }}
                >
                  <th>Username</th>
                  <th>Online</th>
                  <th>Cash</th>
                  {/* <th>Total</th> */}
                </tr>
                {isData && (
                  <>
                    {isData &&
                      isData.map((row, index) => (
                        <tr
                          className="margintop_add"
                          style={{ borderBottom: '1px solid gray' }}
                          key={index}
                        >
                          <TableCell>{row?.Username}</TableCell>
                          <TableCell>{row?.cash}</TableCell>
                          <TableCell>{row?.online}</TableCell>
                          <TableCell>
                            {Number(row?.cash) + Number(row?.online)}
                          </TableCell>
                        </tr>
                      ))}
                  </>
                )}
                <tr
                  className="margintop_add"
                  style={{ borderBottom: '1px solid gray' }}
                >
                  <th>Total</th>
                  <th>
                    {isData
                      ? isData.reduce(
                          (n, { cash }) => parseFloat(n) + parseFloat(cash),
                          0,
                        )
                      : '0'}
                  </th>
                  <th>
                    {' '}
                    {isData
                      ? isData.reduce(
                          (n, { online }) => parseFloat(n) + parseFloat(online),
                          0,
                        )
                      : '0'}
                  </th>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className="save-div-btn">
        <button onClick={() => handlePrint()} className="save-div-btn-btn">
          Print
        </button>
        <button
          onClick={() => handleClose()}
          className="save-div-btn-btn-cancel"
        >
          Cancel
        </button>
      </div>
    </>
  );
}

export default PrintRoomBooking;
