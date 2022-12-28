import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainAdmin from "../src/screens/Admin/MainAdmin/MainAdmin";
import Navbar from "./screens/User/Header/Navbar";
import Footer from "./screens/User/Footer/Footer";
import MainRoutes from "./routes/MainRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import { toast, ToastContainer } from "react-toastify";

function App() {
  const [opendashboard, setopendashboard] = useState(false);
  const [showreciept, setshowreciept] = useState(false);
  return (
    <>
      <Router>
        {!opendashboard && !showreciept ? <Navbar /> : ""}
        {opendashboard && <MainAdmin />}
        <MainRoutes
          setopendashboard={setopendashboard}
          setshowreciept={setshowreciept}
        />
        <AdminRoutes setopendashboard={setopendashboard} />
        {!opendashboard && !showreciept ? <Footer /> : ""}
      </Router>
    </>
  );
}

export default App;
