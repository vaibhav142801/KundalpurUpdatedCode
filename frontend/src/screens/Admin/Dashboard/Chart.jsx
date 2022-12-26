import React from "react";
import Barchart from "../charts/Barchart";
import Linechart from "../charts/Linechart";
import "./Dashboard.css";
const Chart = () => {
  return (
    <>
      <div className="chartmain">
        <div className="chartmaincontent">
          <Barchart />
        </div>
      </div>
    </>
  );
};

export default Chart;
