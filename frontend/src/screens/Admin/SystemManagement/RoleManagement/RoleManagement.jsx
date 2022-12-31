import Reac, { useEffect } from "react";
import "./RoleManagement.css";
function RoleManagement({ setopendashboard }) {
  useEffect(() => {
    setopendashboard(true);
  }, []);

  return (
    <>
      <div className="dashboarddiv">RoleManagement</div>
    </>
  );
}

export default RoleManagement;
