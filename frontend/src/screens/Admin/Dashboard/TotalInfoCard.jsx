import React from "react";
import "./Dashboard.css";
const TotalInfoCard = ({ bgcolor, title, value }) => {
  return (
    <>
      <div className="totalmaindiv" style={{ background: bgcolor }}>
        <div className="totalcontent">
          <p>{title}</p>
          <p>{value}</p>
        </div>
      </div>
    </>
  );
};

export default TotalInfoCard;
