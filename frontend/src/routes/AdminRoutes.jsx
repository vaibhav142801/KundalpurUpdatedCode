import React from "react";
import { Routes, Route } from "react-router-dom";
import CashDonation from "../screens/Admin/cashDonation/AddCashDonation";

import Dashboard from "../screens/Admin/Dashboard/Dashboard";

import MasterTap from "../screens/Admin/masters/MasterTap";
import DonatedUsers from "../screens/Admin/Donatedusers/DonatedUsers";
import RoomBooking from "../screens/Admin/RoomBooking/RoomBooking";

function AdminRoutes({ setopendashboard }) {
  return (
    <>
      <Routes>
        <Route
          path="/admin-panel/dashboard"
          element={<Dashboard setopendashboard={setopendashboard} />}
        />
        <Route
          path="/admin-panel/master"
          element={<MasterTap setopendashboard={setopendashboard} />}
        />
        <Route
          path="/admin-panel/donatedusers"
          element={<DonatedUsers setopendashboard={setopendashboard} />}
        />
        <Route
          path="/admin-panel/roombooking"
          element={<RoomBooking setopendashboard={setopendashboard} />}
        />
        <Route
          path="/admin-panel/cashdonation"
          element={<CashDonation setopendashboard={setopendashboard} />}
        />
      </Routes>
    </>
  );
}

export default AdminRoutes;
