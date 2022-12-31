import Reac, { useEffect } from "react";
import "./VoucherManagement.css";
function SystemManagement({ setopendashboard }) {
  useEffect(() => {
    setopendashboard(true);
  }, []);
  return (
    <>
      <div className="dashboarddiv">RoleManagement</div>
    </>
  );
}

export default SystemManagement;
