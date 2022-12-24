import React, { useState } from "react";
import search from "../../../assets/search.svg";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Badge from "@mui/material/Badge";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { secondaryColor } from "../../../utils/colorVariables";
import Sidebar from "../Sidebar/Sidebar";
import { useLocation } from "react-router-dom";
import logo from "../../../assets/logo.jpg";
import "./AdminHeader.css";
const AdminHeader = () => {
  const location = useLocation();
  const [showsidebar, setshowsidebar] = useState(false);

  return (
    <>
      <div className="adminmainheader">
        <div className="adminnavbar">
          <div className="routetilem">
            {/* <p>
              {location.pathname.slice(1).charAt(0).toUpperCase() +
                location.pathname.slice(2)}
            </p> */}

            <img
              src={logo}
              alt="logo"
              style={{ width: "70px", height: "45px" }}
            />
            <p>
              श्री दिगम्बर जैन सिद्धक्षेत्र कुण्डलगिरि , कुण्डलपुर जिला दमोह
              (म.प्र.)
            </p>
          </div>
          <div
            className="showburger"
            onClick={() => setshowsidebar(!showsidebar)}
          >
            {showsidebar ? <CloseIcon /> : <MenuIcon />}
          </div>
          <div className="rightmaindiv">
            <div className="searchmaindiv">
              <input type="text" placeholder="Search" />
              <button className="searchbtn">
                <img src={search} alt="search" />
              </button>
            </div>
            <div className="notificationdiv">
              <Badge badgeContent={4} color="primary" style={{ zIndex: 0 }}>
                <NotificationsIcon color="action" />
              </Badge>
            </div>

            <div className="profilemaindiv">
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Avatar
                  alt="Remy Sharp"
                  src="/static/images/avatar/1.jpg"
                  variant="rounded"
                  sx={{
                    width: 35,
                    height: 35,
                    marginRight: "11px",
                    marginTop: "5px",
                    marginLeft: "11px",
                  }}
                />
                <Typography
                  sx={{
                    size: "14px",
                    lineHeight: "17px",
                  }}
                >
                  Pranay
                </Typography>
                <IconButton size="small" aria-label="more">
                  <ArrowDropDownOutlinedIcon
                    size="large"
                    sx={{ color: secondaryColor }}
                  />
                </IconButton>
              </Box>
            </div>
          </div>
        </div>
        <div className={showsidebar ? "open" : "sliderdiv "}>
          <Sidebar setshowsidebar={setshowsidebar} />
        </div>
      </div>
    </>
  );
};

export default AdminHeader;
