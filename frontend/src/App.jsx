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
  return (
    <>
      <Router>
        {!opendashboard && <Navbar />}
        {opendashboard && <MainAdmin />}
        <MainRoutes />
        <AdminRoutes setopendashboard={setopendashboard} />
        {!opendashboard && <Footer />}
      </Router>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
