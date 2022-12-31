import Reac, { useEffect } from "react";
import "./UserManagement.css";
function UserManagement({ setopendashboard }) {
  useEffect(() => {
    setopendashboard(true);
  }, []);
  return (
    <>
      <div className="dashboarddiv">RoleManagement</div>
    </>
  );
}

export default UserManagement;
