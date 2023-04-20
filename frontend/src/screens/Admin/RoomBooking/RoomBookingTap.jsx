import React, { useState, useEffect } from 'react';
import f1 from '../../../assets/f1.png';

import { NavLink, useNavigate } from 'react-router-dom';
const RoomBookingTap = ({ setopendashboard }) => {
  useEffect(() => {
    setopendashboard(true);
  }, []);

  return (
    <>
      <div className="mobilewidth dashboarmain">
        <div className="container1">
          <div className="bloc-tabs1">
            <NavLink
              to="/admin-panel/room/Dashboard"
              className={({ isActive }) => (isActive ? 'tabs2' : 'tabs1')}
            >
              <img
                style={{ marginRight: '4%', width: '20px' }}
                src={f1}
                alt="fast"
              />
              Dashbord
            </NavLink>
            <NavLink
              to="/admin-panel/room/checkin"
              className={({ isActive }) => (isActive ? 'tabs2' : 'tabs1')}
            >
              <img
                style={{ marginRight: '4%', width: '20px' }}
                src={f1}
                alt="fast"
              />
              Checkin
            </NavLink>
            <NavLink
              to="/admin-panel/room/hold"
              className={({ isActive }) => (isActive ? 'tabs2' : 'tabs1')}
            >
              <img
                style={{ marginRight: '4%', width: '20px' }}
                src={f1}
                alt="fast"
              />
              Hold
            </NavLink>
            <NavLink
              to="/admin-panel/room/roomshift"
              className={({ isActive }) => (isActive ? 'tabs2' : 'tabs1')}
            >
              <img
                style={{ marginRight: '4%', width: '20px' }}
                src={f1}
                alt="fast"
              />
              Room Shift
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default RoomBookingTap;
