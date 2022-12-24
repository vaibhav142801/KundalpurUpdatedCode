import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

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
function DonationHistory() {
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
                    <TableCell align="left">EMAIL</TableCell>
                    <TableCell align="left">MESSAGE</TableCell>
                    <TableCell align="left">AMOUNT</TableCell>
                    <TableCell align="left">CERTIFICATE</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="left">{row.name}</TableCell>
                      <TableCell align="left">{row.calories}</TableCell>
                      <TableCell align="left">{row.fat}</TableCell>
                      <TableCell align="left">{row.carbs}</TableCell>
                      <TableCell align="left">{row.protein}</TableCell>
                      <TableCell align="left">{row.down}</TableCell>
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
