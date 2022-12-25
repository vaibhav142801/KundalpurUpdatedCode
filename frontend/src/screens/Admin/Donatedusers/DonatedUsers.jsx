import React, { useEffect } from "react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import "./DonatedUsers.css";
import { serverInstance } from "../../../API/ServerInstance";
import Swal from "sweetalert2";
import moment from "moment";
import { useNavigate } from "react-router-dom";
const DonatedUsers = ({ setopendashboard }) => {
  const [isData, setisData] = React.useState([]);
  const navigation = useNavigate();

  useEffect(() => {
    setopendashboard(true);
    getall_donation();
  }, []);

  const getall_donation = () => {
    serverInstance("admin/donation-list", "get").then((res) => {
      if (res.status) {
        setisData(res.data);
      } else {
        Swal("Error", "somthing went  wrong", "error");
      }
      console.log(res);
    });
  };

  const downloadrecept = (row) => {
    navigation("/reciept", {
      state: {
        userdata: row,
      },
    });
  };
  return (
    <>
      <div className="dashboarddiv">
        <div>
          <div className="search-header">
            <div className="search-inner-div">
              <input type="text" placeholder="Name" />
              <input type="text" placeholder="Phone No" />
              <button>Search</button>
            </div>
            <div></div>
          </div>
          <hr style={{ color: "#e96d00" }} />
          <div className="add-btn-user">
            <button>+Add</button>
          </div>

          <div className="table-div-maain">
            <table className="dashborad-table">
              <tr>
                <th>S.No.</th>
                <th>Date</th>
                <th>Name </th>
                <th>Donation Type</th>
                <th>Amount</th>
                <th>Cheque No.</th>
                <th>Date Of submission</th>
                <th>Name of Bank</th>
                <th>Payment id</th>
                <th>certificate</th>
                <th>Edit/Delete</th>
              </tr>

              {isData.length !== 0 &&
                isData.map((row, index) => (
                  <tr>
                    <td>{index + 1}</td>
                    <td> {moment(row?.DATE_OF_DAAN).format("DD/MM/YYYY")}</td>
                    <td>{row.NAME}</td>
                    <td> {row.MODE_OF_DONATION}</td>
                    <td> {row.AMOUNT}</td>
                    <td> {row.CHEQUE_NO ? row.CHEQUE_NO : "-"}</td>
                    <td> {row.DATE_OF_CHEQUE ? row.DATE_OF_CHEQUE : "-"}</td>
                    <td> {row.NAME_OF_BANK ? row.NAME_OF_BANK : "-"}</td>
                    <td> {row.NAME_OF_BANK ? row.NAME_OF_BANK : "-"}</td>
                    <td> {row.PAYMENT_ID}</td>
                    <td
                      onClick={() => {
                        downloadrecept(row);
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      {" "}
                      downolod
                    </td>
                    <td>
                      <RemoveRedEyeIcon />
                      <DeleteForeverIcon />
                    </td>
                  </tr>
                ))}
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default DonatedUsers;
