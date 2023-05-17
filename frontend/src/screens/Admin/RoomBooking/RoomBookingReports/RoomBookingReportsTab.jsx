import React, { useState, useEffect } from 'react';
import f1 from '../../../../assets/f1.png';

import { NavLink, useNavigate } from 'react-router-dom';
const RoomBookingReportsTab = ({ setopendashboard }) => {
  useEffect(() => {
    setopendashboard(true);
  }, []);

  return (
    <>
      <div className="mobilewidth dashboarmain">
        <div className="container1">
          <div className="bloc-tabs1">
            <NavLink
              to="/admin-panel/Room/checkinreports"
              className={({ isActive }) => (isActive ? 'tabs2' : 'tabs1')}
            >
              <img
                style={{ marginRight: '4%', width: '20px' }}
                src={f1}
                alt="fast"
              />
              Checkin History
            </NavLink>
            <NavLink
              style={{ width: '15rem' }}
              to="/admin-panel/Room/onlinecheckin"
              className={({ isActive }) => (isActive ? 'tabs2' : 'tabs1')}
            >
              <img
                style={{ marginRight: '4%', width: '20px' }}
                src={f1}
                alt="fast"
              />
              Online Checkin History
            </NavLink>
            <NavLink
              to="/admin-panel/Room/Holdhistory"
              className={({ isActive }) => (isActive ? 'tabs2' : 'tabs1')}
            >
              <img
                style={{ marginRight: '4%', width: '20px' }}
                src={f1}
                alt="fast"
              />
              Hold History
            </NavLink>

            <NavLink
              to="/admin-panel/Room/CanceledHistory"
              className={({ isActive }) => (isActive ? 'tabs2' : 'tabs1')}
            >
              <img
                style={{ marginRight: '4%', width: '20px' }}
                src={f1}
                alt="fast"
              />
              Cancel History
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default RoomBookingReportsTab;
