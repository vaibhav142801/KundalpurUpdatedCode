import React from 'react';
import RoomBookingTap from '../RoomBookingTap';
import Print from '../../../../assets/Print.png';
import Tooltip from '@mui/material/Tooltip';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import './Dashbord.css';
function Dashbord({ setopendashboard }) {
  return (
    <>
      <RoomBookingTap setopendashboard={setopendashboard} />
      <div className="print_all_align">
        <div className="only_flex">
          <p style={{ marginTop: '0px', marginBottom: '0px' }}>Print All</p>
          <Tooltip title="Print">
            <img
              src={Print}
              alt="dd"
              style={{ width: '25px', marginLeft: '1rem' }}
            />
          </Tooltip>
        </div>
      </div>
      <div>
        <h1 className="trust_text">
          श्री दिगम्बर जैन सिद्धक्षेत्र कुण्डलगिरि कुण्डलपुर दमोह (म.प्र.)
        </h1>
        <div className="print_all_align" style={{ marginBottom: '1rem' }}>
          <div className="only_flex">
            <p style={{ marginTop: '0px', marginBottom: '0px' }}>Print</p>
            <Tooltip title="Print">
              <img
                src={Print}
                alt="dd"
                style={{ width: '25px', marginLeft: '1rem' }}
              />
            </Tooltip>
          </div>
        </div>
        <div className="table_main_div">
          <table>
            <tr
              className="margintop_add"
              style={{
                borderBottom: '1px solid gray',
                fontSize: '14px',
                borderRight: '1px solid gray',
              }}
            >
              <th colSpan={2}>धर्मशाला का विवरण</th>
            </tr>
            <tr
              style={{
                borderBottom: '1px solid gray',
                borderRight: '1px solid gray',
              }}
            >
              <td>Facility & Category</td>
              <td>Available Rooms (8)</td>
            </tr>
            <tr
              style={{
                borderBottom: '1px solid gray',
                borderRight: '1px solid gray',
              }}
            >
              <td>AC 1 Bed</td>
              <td>1-2-3-4-5-6-7-8</td>
            </tr>
            <tr
              style={{
                borderBottom: '1px solid gray',
                borderRight: '1px solid gray',
              }}
            >
              <td>Facility & Category</td>
              <td>Available Rooms (4)</td>
            </tr>
            <tr
              style={{
                borderBottom: '1px solid gray',
                borderRight: '1px solid gray',
              }}
            >
              <td>AC 2 Bed</td>
              <td>1-2-3-4</td>
            </tr>
          </table>
          <table>
            <tr
              className="margintop_add"
              style={{
                borderBottom: '1px solid gray',
                fontSize: '14px',
              }}
            >
              <th colSpan={2}>धर्मशाला का नाम- अष्टापद (पाटनी) गेस्ट हाउस</th>
            </tr>
            <tr style={{ borderBottom: '1px solid gray' }}>
              <td>Hold Room (0)</td>
              <td>Occupied Room (0)</td>
            </tr>
            <tr
              style={{
                borderBottom: '1px solid gray',
              }}
            >
              <td>0</td>
              <td>0</td>
            </tr>
            <tr style={{ borderBottom: '1px solid gray' }}>
              <td>Hold Room (0)</td>
              <td>Occupied Room (0)</td>
            </tr>
            <tr
              style={{
                borderBottom: '1px solid gray',
              }}
            >
              <td>0</td>
              <td>0</td>
            </tr>
          </table>
        </div>
        <div
          className="print_all_align"
          style={{ marginBottom: '1rem', marginTop: '1rem' }}
        >
          <div className="only_flex">
            <p style={{ marginTop: '0px', marginBottom: '0px' }}>Print</p>
            <Tooltip title="Print">
              <img
                src={Print}
                alt="dd"
                style={{ width: '25px', marginLeft: '1rem' }}
              />
            </Tooltip>
          </div>
        </div>
        <div className="table_main_div">
          <table>
            <tr
              className="margintop_add"
              style={{
                borderBottom: '1px solid gray',
                fontSize: '14px',
                borderRight: '1px solid gray',
              }}
            >
              <th colSpan={2}>धर्मशाला का विवरण</th>
            </tr>

            <tr
              style={{
                borderBottom: '1px solid gray',
                borderRight: '1px solid gray',
              }}
            >
              <td>Facility & Category</td>
              <td>Available Rooms (4)</td>
            </tr>
            <tr
              style={{
                borderBottom: '1px solid gray',
                borderRight: '1px solid gray',
              }}
            >
              <td>AC 2 Bed</td>
              <td>1-2-3-4</td>
            </tr>
          </table>
          <table>
            <tr
              className="margintop_add"
              style={{
                borderBottom: '1px solid gray',

                fontSize: '14px',
              }}
            >
              <th colSpan={2}>धर्मशाला का नाम- अष्टापद (पाटनी) गेस्ट हाउस</th>
            </tr>
            <tr style={{ borderBottom: '1px solid gray' }}>
              <td>Hold Room (0)</td>
              <td>Occupied Room (0)</td>
            </tr>
            <tr
              style={{
                borderBottom: '1px solid gray',
              }}
            >
              <td>0</td>
              <td>0</td>
            </tr>
          </table>
        </div>
      </div>
    </>
  );
}

export default Dashbord;
