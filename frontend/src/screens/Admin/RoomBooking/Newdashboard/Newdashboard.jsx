import React, { useState, useEffect } from 'react';
import RoomBookingTap from '../RoomBookingTap';
import Print from '../../../../assets/Print.png';
import { serverInstance } from '../../../../API/ServerInstance';
import LoadingSpinner1 from '../../../../components/Loading/LoadingSpinner1';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import ExportPdf from '../../../../assets/ExportPdf.png';
import ExportExcel from '../../../../assets/ExportExcel.png';
import './Newdashboard.css';
function Newdashboard({ setopendashboard }) {
  const [isData, setisData] = useState('');
  const [categoryRooms, setcategoryRooms] = useState('');
  const [loader, setloader] = useState(true);
  const getdata = () => {
    serverInstance('room/dharmashala-data', 'get').then((res) => {
      setloader(true);

      console.log(res);
      if (res?.data?.dharmsalas) {
        setloader(false);
        setisData(res?.data?.dharmsalas);
      }
    });
  };

  const getobject = (roomData) => {
    let localityParameterSets;
    if (roomData) {
      localityParameterSets = Object.entries(roomData).map(([key, val]) => ({
        name: key,
        value: val,
      }));
    }

    return localityParameterSets;
  };

  const getholdobject = (roomData) => {
    let localityParameterSets;
    if (roomData) {
      localityParameterSets = Object.entries(roomData).map(([key, val]) => ({
        name: key,
        value: val,
      }));
    }

    return localityParameterSets;
  };

  const getoccupidedobject = (roomData) => {
    let localityParameterSets;
    if (roomData) {
      localityParameterSets = Object.entries(roomData).map(([key, val]) => ({
        name: key,
        value: val,
      }));
    }

    return localityParameterSets;
  };

  useEffect(() => {
    getdata();
  }, []);

  return (
    <>
      <RoomBookingTap setopendashboard={setopendashboard} />

      <div
        className="search-header "
        style={{ paddingLeft: '5.5%', paddingRight: '46.3rem' }}
      >
        <div className="search-inner-div-reports">
          <form className="search-inner-div-reports" style={{ width: '50%' }}>
            <div className="Center_main_dic_filetr">
              <label>Dharamshala</label>
              <select>
                <option>Select Dharamshala</option>
              </select>
            </div>

            <div className="Center_main_dic_filetr">
              <label>&nbsp;</label>
              <button>Search</button>
            </div>
          </form>
          <div className="Center_main_dic_filetr">
            <label>&nbsp;</label>
            <button>Reset</button>
          </div>
          <div className="Center_main_dic_filetr">
            <label>&nbsp;</label>
            <Tooltip title="Print Report">
              <img
                style={{ width: '30px' }}
                // onClick={() => handleOpen5()}
                src={Print}
                alt=" Print"
              />
            </Tooltip>
          </div>
          <div className="Center_main_dic_filetr">
            <label>&nbsp;</label>
            <Tooltip title="Export Pdf File">
              <img
                // onClick={() => ExportPdfmanul(isData, 'Report')}
                src={ExportPdf}
                alt="cc"
                style={{ width: '30px' }}
              />
            </Tooltip>
          </div>

          <div className="Center_main_dic_filetr">
            <label>&nbsp;</label>
            <Tooltip title="Export Excel File">
              <img
                // onClick={() => ExportToExcel()}
                src={ExportExcel}
                alt="cc"
                style={{ width: '30px', marginLeft: '0rem' }}
              />
            </Tooltip>
          </div>
        </div>
      </div>
      <div>
        <div style={{ paddingLeft: '5.5%', paddingRight: '.3rem' }}>
          <div className="borderisbodediv">
            <h5>धर्मशाला का नाम</h5>
          </div>

          <div className="borderisbodediv10">
            <p>अयोध्या (B.L.) धर्मशाला</p>
          </div>

          <div className="borderisbodediv">
            <h5>धर्मशाला का विवरण</h5>
          </div>
          <div className="borderisbodediv10">
            <p>FacilityCategory and Available Rooms (19)</p>
          </div>

          <div className="borderisbodediv10">
            <p>4 BED</p>
          </div>

          <div className="borderisbodediv10">
            <p>1,2,3,4,5,6,7,8,9,10,11,12,13,14.15,16,17.18,19</p>
          </div>

          <div className="borderisbodediv">
            <h5>Hold Room (0)</h5>
          </div>
          <div className="borderisbodediv10">
            <p>0</p>
          </div>

          <div className="borderisbodediv">
            <h5>Occupied Room (1)</h5>
          </div>

          <div className="borderisbodediv10">
            <p>0</p>
          </div>
        </div>
      </div>
      {loader && <LoadingSpinner1 />}
    </>
  );
}

export default Newdashboard;
