import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import moment from "moment";

function createData(name, calories, fat, carbs, protein, down) {
  return { name, calories, fat, carbs, protein, down };
}

const rows = [
  createData(
    "20-12-2022",
    "Pranay Shukla",
    "pranayshukla@gmail.com",
    "abcd efgh ijkl mnop qrst uvwxyz",
    "₹5100",
    "Download"
  ),
  createData(
    "20-12-2022",
    "Pranay Shukla",
    "pranayshukla@gmail.com",
    "abcd efgh ijkl mnop qrst uvwxyz",
    "₹5100",
    "Download"
  ),
  createData(
    "20-12-2022",
    "Pranay Shukla",
    "pranayshukla@gmail.com",
    "abcd efgh ijkl mnop qrst uvwxyz",
    "₹5100",
    "Download"
  ),
  createData(
    "20-12-2022",
    "Pranay Shukla",
    "pranayshukla@gmail.com",
    "abcd efgh ijkl mnop qrst uvwxyz",
    "₹5100",
    "Download"
  ),
  createData(
    "20-12-2022",
    "Pranay Shukla",
    "pranayshukla@gmail.com",
    "abcd efgh ijkl mnop qrst uvwxyz",
    "₹5100",
    "Download"
  ),
  createData(
    "20-12-2022",
    "Pranay Shukla",
    "pranayshukla@gmail.com",
    "abcd efgh ijkl mnop qrst uvwxyz",
    "₹5100",
    "Download"
  ),
  createData(
    "20-12-2022",
    "Pranay Shukla",
    "pranayshukla@gmail.com",
    "abcd efgh ijkl mnop qrst uvwxyz",
    "₹5100",
    "Download"
  ),
];
import "./DonationHistory.css";
import { useNavigate } from "react-router-dom";
import { User_AllDonation } from "../../../Redux/redux/action/AuthAction";
import { serverInstance } from "../../../API/ServerInstance";
function DonationHistory() {
  const [isrow, setisrow] = useState([]);
  const dispatch = useDispatch();
  const navigation = useNavigate();

  React.useEffect(() => {
    gettable();
  }, []);

  const gettable = () => {
    serverInstance("user/donation-list", "get").then((res) => {
      if (res.status === 404) {
        Swal.fire("Error!", "please authenticate", "error");
        return false;
      }
      try {
        setisrow(res.donation);
      } catch (error) {
        Swal.fire("Error!", "please authenticate", "error");
      }
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
      <div className="DonationHistory-main-div">
        <div>
          <div className="table-div-maain-donation-table-main">
            <div className="donation-history-text">
              <h2>DONATIONS</h2>
              <p>All Donations History</p>
            </div>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead style={{ background: "#FFEEE0" }}>
                  <TableRow>
                    <TableCell align="left">DATE</TableCell>
                    <TableCell align="left">NAME</TableCell>
                    <TableCell align="left">Donation Type</TableCell>
                    <TableCell align="left">Amount</TableCell>
                    <TableCell align="left">Cheque No.</TableCell>
                    <TableCell align="left">Date Of submission</TableCell>
                    <TableCell align="left">Name of Bank</TableCell>
                    <TableCell align="left">Payment id</TableCell>
                    <TableCell align="left">certificate</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {isrow.length !== 0 &&
                    isrow.map((row, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell align="left">
                          {moment(row?.DATE_OF_DAAN).format("DD/MM/YYYY")}
                        </TableCell>
                        <TableCell align="left">{row.NAME}</TableCell>
                        <TableCell align="left">
                          {row.MODE_OF_DONATION}
                        </TableCell>
                        <TableCell align="left">{row.AMOUNT}</TableCell>
                        <TableCell align="left">
                          {row.CHEQUE_NO ? row.CHEQUE_NO : "-"}
                        </TableCell>
                        <TableCell align="left">
                          {row.DATE_OF_CHEQUE ? row.DATE_OF_CHEQUE : "-"}
                        </TableCell>
                        <TableCell align="left">
                          {row.NAME_OF_BANK ? row.NAME_OF_BANK : "-"}
                        </TableCell>
                        <TableCell align="left">{row.PAYMENT_ID}</TableCell>
                        <TableCell
                          align="left"
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            downloadrecept(row);
                          }}
                        >
                          downolod
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </div>
    </>
  );
}

export default DonationHistory;
