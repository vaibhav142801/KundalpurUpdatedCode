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
          path="/dashboard"
          element={<Dashboard setopendashboard={setopendashboard} />}
        />
        <Route
          path="/master"
          element={<MasterTap setopendashboard={setopendashboard} />}
        />
        <Route
          path="/donatedusers"
          element={<DonatedUsers setopendashboard={setopendashboard} />}
        />
        <Route
          path="/roombooking"
          element={<RoomBooking setopendashboard={setopendashboard} />}
        />
        <Route
          path="/cashdonation"
          element={<CashDonation setopendashboard={setopendashboard} />}
        />
      </Routes>
    </>
  );
}

export default AdminRoutes;
