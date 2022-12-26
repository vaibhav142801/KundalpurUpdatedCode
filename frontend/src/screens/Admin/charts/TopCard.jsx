import React from "react";

function TopCard({ img, value }) {
  return (
    <>
      <div className="top-info-inear-div">
        <div className="top-info-inear-content-div">
          <img src={img} alt="dash1" />
          <p>{value}</p>
        </div>
      </div>
    </>
  );
}

export default TopCard;
