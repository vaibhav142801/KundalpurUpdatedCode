import React, { useState, useEffect } from 'react';
import f1 from '../../../../assets/f4.png';
import { NavLink } from 'react-router-dom';
const DonationReportTap = ({ setopendashboard }) => {
  const [role, setrole] = useState('');
  const [emproleid, setemproleid] = useState('');
  useEffect(() => {
    setopendashboard(true);
    setrole(Number(sessionStorage.getItem('userrole')));
    setemproleid(Number(sessionStorage.getItem('empRoleid')));
  }, []);

  return (
    <>
      <div className="mobilewidth dashboarmain">
        <div className="container1">
          <div className="bloc-tabs1">
            {emproleid === 7 ? (
              <>
                <NavLink
                  to="/admin-panel/electronic/report/elec"
                  className={({ isActive }) => (isActive ? 'tabs2' : 'tabs1')}
                >
                  <img
                    style={{ marginRight: '4%', width: '20px' }}
                    src={f1}
                    alt="fast"
                  />
                  Electronic Report
                </NavLink>
                <NavLink
                  to="/admin-panel/electronic/report/cheque"
                  className={({ isActive }) => (isActive ? 'tabs2' : 'tabs1')}
                >
                  <img
                    style={{ marginRight: '4%', width: '20px' }}
                    src={f1}
                    alt="fast"
                  />
                  Cheque Report
                </NavLink>
              </>
            ) : (
              <>
                <NavLink
                  to="/admin-panel/electronic/report/cash"
                  className={({ isActive }) => (isActive ? 'tabs2' : 'tabs1')}
                >
                  <img
                    style={{ marginRight: '4%', width: '20px' }}
                    src={f1}
                    alt="fast"
                  />
                  Cash Report
                </NavLink>
                <NavLink
                  to="/admin-panel/electronic/report/elec"
                  className={({ isActive }) => (isActive ? 'tabs2' : 'tabs1')}
                >
                  <img
                    style={{ marginRight: '4%', width: '20px' }}
                    src={f1}
                    alt="fast"
                  />
                  Electronic Report
                </NavLink>
                <NavLink
                  to="/admin-panel/electronic/report/cheque"
                  className={({ isActive }) => (isActive ? 'tabs2' : 'tabs1')}
                >
                  <img
                    style={{ marginRight: '4%', width: '20px' }}
                    src={f1}
                    alt="fast"
                  />
                  Cheque Report
                </NavLink>
                <NavLink
                  to="/admin-panel/electronic/report/item"
                  className={({ isActive }) => (isActive ? 'tabs2' : 'tabs1')}
                >
                  <img
                    style={{ marginRight: '4%', width: '20px' }}
                    src={f1}
                    alt="fast"
                  />
                  Item Report
                </NavLink>
                <NavLink
                  to="/admin-panel/Room/Combine"
                  className={({ isActive }) => (isActive ? 'tabs2' : 'tabs1')}
                >
                  <img
                    style={{ marginRight: '4%', width: '20px' }}
                    src={f1}
                    alt="fast"
                  />
                  Combine Report
                </NavLink>
                <NavLink
                  to="/admin-panel/electronic/report/cancel-donations"
                  className={({ isActive }) => (isActive ? 'tabs2' : 'tabs1')}
                >
                  <img
                    style={{ marginRight: '4%', width: '20px' }}
                    src={f1}
                    alt="fast"
                  />
                  Cancelled
                </NavLink>

                <NavLink
                  to="/admin-panel/electronic/report/headreport"
                  className={({ isActive }) => (isActive ? 'tabs2' : 'tabs1')}
                >
                  <img
                    style={{ marginRight: '4%', width: '20px' }}
                    src={f1}
                    alt="fast"
                  />
                  Head Report
                </NavLink>
                <NavLink
                  to="/admin-panel/electronic/report/consolidated"
                  className={({ isActive }) => (isActive ? 'tabs2' : 'tabs1')}
                >
                  <img
                    style={{ marginRight: '4%', width: '20px' }}
                    src={f1}
                    alt="fast"
                  />
                  Consolidated
                </NavLink>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default DonationReportTap;
