import React from "react";
import Typography from "@mui/material/Typography";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import EmailIcon from "@mui/icons-material/Email";
import CallIcon from "@mui/icons-material/Call";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Link } from "react-router-dom";
import Logo from "../../../assets/logo1.jpeg";
import "./Footer.css";
const Footer = () => {
  return (
    <>
      <div className="mainfooter">
        <div className="footercontent">
          <div className="phonecon">
            <img src={Logo} alt="Logo" />
            <div className="mardivcontentlink">
              <p>
                भगवान श्री आदिनाथ (वृषभ) जब तृतीय काल में <br />
                चौरासी लाख वर्ष पूर्व तीन वर्ष साढ़े आठ महीने <br /> प्रमाण काल
                शेष रह गया था तब श्री आदिनाथ जी <br /> का जन्म हुआ था।
              </p>
              <p>
                <LocationOnIcon /> श्री दिगम्बर जैन सिद्धक्षेत्र (कुण्डलपुर)
                कुण्डलगिरि,
                <br /> कुण्डलपुर तहसील पटेरा जिला दमोह (म.प्र.)
                <br /> पिनकोड-470 773
              </p>
            </div>
          </div>

          <div className="phonecon">
            <Typography
              variant="h6"
              style={{ fontWeight: "400", marginBottom: "20px" }}
            >
              हमसे जुड़ें
            </Typography>
            <div className="mardivcontentlink">
              <Link to="/rental">facebook</Link>
              <Link to="/rental"> twitter </Link>
              <Link to="/rental"> google</Link>
            </div>
          </div>
          <div className="phonecon">
            <Typography
              variant="h6"
              style={{ fontWeight: "400", marginBottom: "20px" }}
            >
              पृष्ठ
            </Typography>
            <div className="mardivcontentlink">
              <Link to="/#">≈ श्री बड़े बाबा</Link>
              <Link to="/#">≈ आचार्य श्री</Link>
              <Link to="/#">≈ कुण्डलपुर</Link>
              <Link to="/#">≈ जैन धर्म</Link>
              <Link to="/#">≈ संपर्क</Link>
            </div>
          </div>
          <div className="phonecon">
            <Typography
              variant="h6"
              style={{ fontWeight: "400", marginBottom: "20px" }}
            >
              हमसे संपर्क करें​
            </Typography>
            <div className="mardivcontentlink">
              <p>
                {" "}
                <CallIcon />
                +91-7771834880 (आवास एवं कार्यालय)
              </p>
              <p>
                {" "}
                <CallIcon />
                +91-7771835891 (दान एवं कबूलियत)
              </p>
              <p>
                <EmailIcon />
                badebaba.kundalpur@gmail.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
