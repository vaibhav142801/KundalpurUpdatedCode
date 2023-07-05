import React, { useRef } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { useReactToPrint } from 'react-to-print';
import moment from 'moment';
import Moment from 'moment-js';
//date  booking_id contactNo name address dharmasala?.name RoomNo roomAmount advanceAmount
function Printcheckin({ isData, setOpen1 }) {
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  var options = { year: 'numeric', month: 'short', day: '2-digit' };
  var today = new Date();
  const currDate = today
    .toLocaleDateString('en-IN', options)
    .replace(/-/g, ' ');
  const currTime = today.toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });
  return (
    <div>
      <div style={{ maxHeight: 'calc(80vh - 4rem)', overflowY: 'auto' }}>
        <div ref={componentRef} style={{ marginTop: '1rem' }}>
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
              {currDate} / {currTime}
            </Typography>
          </div>

          <Table
            sx={{ minWidth: 650, width: '100%' }}
            aria-label="simple table"
          >
            <TableHead style={{ background: '#F1F0F0' }}>
              <TableRow>
                <TableCell>BookingId</TableCell>
                <TableCell>Mobile</TableCell>
                <TableCell>CustomerName</TableCell>
                <TableCell>CheckinDate$Time</TableCell>
                <TableCell>CheckoutDate$Time</TableCell>
                <TableCell>Rate</TableCell>
                <TableCell>AdvanceRate</TableCell>
                <TableCell>RoomNo</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isData ? (
                <>
                  {isData?.map((row, index) => (
                    <TableRow
                      key={row.id}
                      sx={{
                        '&:last-child td, &:last-child th': { border: 0 },
                      }}
                    >
                      <TableCell>{row?.booking_id}</TableCell>
                      <TableCell>{row?.contactNo}</TableCell>
                      <TableCell>{row?.name}</TableCell>
                      <TableCell>
                        {Moment(row?.date).format('YYYY-MM-DD')}&nbsp;&nbsp;
                        {moment(row?.time, 'HH:mm:ss').format('hh:mm:ss')}
                      </TableCell>

                      <TableCell>
                        {Moment(row?.coutDate).format('DD-MM-YYYY')}&nbsp;&nbsp;
                        {moment(row?.coutTime, 'HH:mm:ss').format('hh:mm:ss')}
                      </TableCell>

                      <TableCell> {row?.roomAmount}</TableCell>
                      <TableCell> {row?.advanceAmount}</TableCell>
                      <TableCell> {row?.RoomNo}</TableCell>
                    </TableRow>
                  ))}
                </>
              ) : (
                <></>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      <div className="save-div-btn">
        <button onClick={() => handlePrint()} className="save-div-btn-btn">
          Print
        </button>
        <button
          onClick={() => setOpen1(false)}
          className="save-div-btn-btn-cancel"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default Printcheckin;
