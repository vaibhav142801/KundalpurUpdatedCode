import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../screens/User/Home/Home";

import EmailLogin from "../screens/User/Auth/EmailLogin/EmailLogin";
import NewLogin from "../screens/User/Auth/NewLogin/NewLogin";
import Forgot from "../screens/User/Auth/Forgot/Forgot";
import CreatePassword from "../screens/User/Auth/createPassword/CreatePassword";
import Donation from "../screens/User/donation/Donation";
import Auth from "../screens/User/Auth/Auth";
import Profile from "../screens/User/profile/Profile";
import Reciept from "../screens/Admin/Reciept/Reciept";
import DonationHistory from "../screens/User/donationHistory/DonationHistory";

function MainRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<EmailLogin />} />
        <Route path="/phonelogin" element={<NewLogin />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/create" element={<CreatePassword />} />
        <Route path="/register" element={<Auth />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/donation" element={<Donation />} />
        <Route path="/donationhistory" element={<DonationHistory />} />
        <Route path="/reciept" element={<Reciept />} />
      </Routes>
    </>
  );
}

export default MainRoutes;
