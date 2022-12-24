import React from "react";
import PostAddIcon from "@mui/icons-material/PostAdd";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import CloseIcon from "@mui/icons-material/Close";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const style = {
  position: "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70%",
  bgcolor: "background.paper",

  boxShadow: 24,
  p: 4,
};
import "./DonationMaster.css";
function DonationMaster() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
      >
        <Fade in={open}>
          <Box sx={style}>
            <div>
              <div className="add-div-close-div">
                <h2>Add New User</h2>
                <CloseIcon onClick={() => handleClose()} />
              </div>
              <hr />
              <div className="main-input-div1">
                <div className="inner-input-div1">
                  <label>Name</label>
                  <input text="text" />
                </div>
                <div className="inner-input-div1">
                  <label>Email</label>
                  <input text="text" />
                </div>
              </div>
              <div className="main-input-div1">
                <div className="inner-input-div1">
                  <label>Phone No</label>
                  <input text="text" />
                </div>
                <div className="inner-input-div1">
                  <label>Date Of Birth</label>
                  <input type="date" />
                </div>
              </div>
              <div className="main-input-div1">
                <div className="inner-input-div1">
                  <label>Password</label>
                  <input text="text" />
                </div>
                <div className="inner-input-div1">
                  <label>Address</label>
                  <input text="text" />
                </div>
              </div>
              <div className="save-div-btn">
                <button className="save-btn1">Add User</button>
                <button onClick={() => handleClose()} className="calcel-btn">
                  Cancel
                </button>
              </div>
            </div>
          </Box>
        </Fade>
      </Modal>
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
          <button onClick={handleOpen}>+Add</button>
        </div>
        <div className="table-div-maain">
          <table className="dashborad-table">
            <tr>
              <th>Sn</th>
              <th>Title</th>
              <th>Name</th>
              <th>Contact No</th>
              <th>Email-Id</th>
              <th>Action</th>
            </tr>
            <tr>
              <td>1</td>
              <td>Mr</td>
              <td>Anil Babu</td>
              <td>7505786956</td>
              <td>anilb9850@gmail.com</td>
              <td>
                <RemoveRedEyeIcon />
                <DeleteForeverIcon />
              </td>
            </tr>
            <tr>
              <td>1</td>
              <td>Mr</td>
              <td>Anil Babu</td>
              <td>7505786956</td>
              <td>anilb9850@gmail.com</td>
              <td>
                <RemoveRedEyeIcon />
                <DeleteForeverIcon />
              </td>
            </tr>
            <tr>
              <td>1</td>
              <td>Mr</td>
              <td>Anil Babu</td>
              <td>7505786956</td>
              <td>anilb9850@gmail.com</td>
              <td>
                <RemoveRedEyeIcon /> <DeleteForeverIcon />
              </td>
            </tr>
            <tr>
              <td>1</td>
              <td>Mr</td>
              <td>Anil Babu</td>
              <td>7505786956</td>
              <td>anilb9850@gmail.com</td>
              <td>
                <RemoveRedEyeIcon /> <DeleteForeverIcon />
              </td>
            </tr>
            <tr>
              <td>1</td>
              <td>Mr</td>
              <td>Anil Babu</td>
              <td>7505786956</td>
              <td>anilb9850@gmail.com</td>
              <td>
                <RemoveRedEyeIcon /> <DeleteForeverIcon />
              </td>
            </tr>{" "}
            <tr>
              <td>1</td>
              <td>Mr</td>
              <td>Anil Babu</td>
              <td>7505786956</td>
              <td>anilb9850@gmail.com</td>
              <td>
                <RemoveRedEyeIcon />
                <DeleteForeverIcon />
              </td>
            </tr>
            <tr>
              <td>1</td>
              <td>Mr</td>
              <td>Anil Babu</td>
              <td>7505786956</td>
              <td>anilb9850@gmail.com</td>
              <td>
                <RemoveRedEyeIcon /> <DeleteForeverIcon />
              </td>
            </tr>
            <tr>
              <td>1</td>
              <td>Mr</td>
              <td>Anil Babu</td>
              <td>7505786956</td>
              <td>anilb9850@gmail.com</td>
              <td>
                <RemoveRedEyeIcon /> <DeleteForeverIcon />
              </td>
            </tr>
          </table>
        </div>
      </div>
    </>
  );
}

export default DonationMaster;
