import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../screens/Admin/Dashboard/Dashboard";
import MasterTap from "../screens/Admin/masters/MasterTap";
import DonatedUsers from "../screens/Admin/Donatedusers/DonatedUsers";
import RoomBooking from "../screens/Admin/RoomBooking/RoomBooking";
import Donation from "../screens/Admin/Donation/Donation/Donation";
import AllDonationTap from "../screens/Admin/Donation/Alldonations/AllDonationTap";
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
          path="/admin-panel/alldonation"
          element={<AllDonationTap setopendashboard={setopendashboard} />}
        />
        <Route
          path="/admin-panel/donation"
          element={<Donation setopendashboard={setopendashboard} />}
        />
      </Routes>
    </>
  );
}

export default AdminRoutes;
