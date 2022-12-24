import React, { useEffect } from "react";
import Chart from "./Chart";
import "./Dashboard.css";
import OrdersTable from "./OrdersTable";
import TotalInfoCard from "./TotalInfoCard";
const Dashboard = ({ setopendashboard }) => {
  useEffect(() => {
    setopendashboard(true);
  }, []);
  return (
    <>
      <div className="dashboarddiv">
        {/* <div className="totalcardscontaoner">
          <TotalInfoCard
            bgcolor={"#FE6977"}
            title={"Total Earning"}
            value={"540,549"}
          />
          <TotalInfoCard
            bgcolor={"#19A2FB"}
            title={"Total Sales"}
            value={"540,549"}
          />
          <TotalInfoCard
            bgcolor={"#74CDFF"}
            title={"Total Profit"}
            value={"540,549"}
          />
          <TotalInfoCard
            bgcolor={"#83B3C0"}
            title={"Total Orders"}
            value={"540,549"}
          />
          <TotalInfoCard
            bgcolor={"#FF9066"}
            title={"Total Purchase"}
            value={"540,549"}
          />
        </div> */}
        <Chart />
        {/* <OrdersTable /> */}
      </div>
    </>
  );
};

export default Dashboard;
