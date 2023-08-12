import React, { useEffect, useState } from 'react';
import { serverInstance } from '../../../../API/ServerInstance';
import { useNavigate, Link } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import { Box, Button } from '@mui/material';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import CloseIcon from '@mui/icons-material/Close';
import exportFromJSON from 'export-from-json';
import LoadingSpinner1 from '../../../../components/Loading/LoadingSpinner1';
import Moment from 'moment-js';
import Print from '../../../../assets/Print.png';
import ExportPdf from '../../../../assets/ExportPdf.png';
import ExportExcel from '../../../../assets/ExportExcel.png';
import Edit from '../../../../assets/Edit.png';
import eye from '../../../../assets/eye.png';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { format } from 'date-fns';
import AddForm from './AddForm';
import Updatedharmshala from './Updatedharmshala';
import ViewDharamshala from './ViewDharamshala';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import './AddDharamshala.css';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '488px',
  bgcolor: 'background.paper',
  p: 1,
  boxShadow: 24,
  borderRadius: '5px',
};

const style1 = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '41.3%',
  bgcolor: 'background.paper',
  p: 1,
  boxShadow: 24,
  borderRadius: '5px',
};

const AddDharamshala = ({ setopendashboard }) => {
  const navigation = useNavigate();
  const [loader, setloader] = useState(false);
  const [isData, setisData] = React.useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [userrole, setuserrole] = useState('');
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const handleOepn = () => setOpen(true);
  const [updatedata, setupdatedata] = useState('');
  const [open1, setOpen1] = React.useState(false);
  const handleClose1 = () => setOpen1(false);
  const handleOepn1 = (data) => {
    setOpen1(true);
    setupdatedata(data);
  };
  const [open2, setOpen2] = React.useState(false);
  const handleClose2 = () => setOpen2(false);
  const handleOepn2 = (data) => {
    setOpen2(true);
    setupdatedata(data);
  };
  const [deleteId, setdeleteId] = useState('');
  const [open3, setOpen3] = React.useState(false);

  const handleClickOpen3 = (id) => {
    setOpen3(true);
    setdeleteId(id);
  };
  const handleClose5 = () => setOpen3(false);
  const handleClose4 = () => {
    setOpen3(false);
    serverInstance(`room/dharmashala?id=${deleteId}`, 'delete').then((res) => {
      if (res.data.status === true) {
        setOpen(false);
        Swal.fire('Great!', res.data.message, 'success');
      }
      if (res.data.status === false) {
        setOpen(false);
        Swal.fire('Great!', res.data.message, 'success');
      }
    });
  };
  var options = { year: 'numeric', month: 'short', day: '2-digit' };
  var today = new Date();
  const currDate = today
    .toLocaleDateString('en-IN', options)
    .replace(/-/g, ' ');
  const currTime = today.toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });
  const getall_donation = () => {
    setloader(true);
    serverInstance('room/dharmashala', 'get').then((res) => {
      if (res.data) {
        setloader(false);
        setisData(res.data);
      }
    });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const ExportToExcel = () => {
    const fileName = 'DharamshalList';
    const exportType = 'xls';
    var data = [];
    isData.map((item, index) => {
      data.push({
        SNo: index + 1,
        nameinHindi: item?.nameH,
        nameinEnglish: item?.name,

        'Created Date': Moment(item?.created_at).format('DD-MM-YYYY'),
      });
    });
    exportFromJSON({ data, fileName, exportType });
  };
  const ExportPdfmanul = (fileName) => {
    const doc = new jsPDF();

    const tableColumn = ['s.no', 'nameinHindi', 'nameinEnglish'];

    const tableRows = [];

    isData.forEach((item, index) => {
      const ticketData = [
        index + 1,
        item?.nameH,
        item?.name,

        format(new Date(item.createdAt), 'yyyy-MM-dd'),
      ];

      tableRows.push(ticketData);
    });

    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    const date = Date().split(' ');

    const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];

    doc.text(`Report of ${fileName}`, 8, 9);
    doc.setFont('Lato-Regular', 'normal');
    doc.setFontSize(28);
    doc.save(`${fileName}_${dateStr}.pdf`);
  };

  useEffect(() => {
    getall_donation();
    setopendashboard(true);

    setuserrole(Number(sessionStorage.getItem('userrole')));
  }, [open, open1]);

  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const sortData = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setisData(
      [...isData].sort((a, b) => {
        if (a[key] < b[key]) {
          return direction === 'ascending' ? -1 : 1;
        }
        if (a[key] > b[key]) {
          return direction === 'ascending' ? 1 : -1;
        }
        return 0;
      }),
    );
    setSortConfig({ key: key, direction: direction });
  };

  return (
    <>
      <Dialog
        open={open3}
        onClose={handleClose5}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {'Do you want to delete'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            After delete you cannot get again
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose5}>Disagree</Button>
          <Button onClick={handleClose4} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
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
                <div>
                  <h2 style={{ marginBottom: '0.5rem', marginLeft: '1rem' }}>
                    Add Dharamshala
                  </h2>
                  <Typography
                    style={{ marginLeft: '1rem' }}
                    variant="body2"
                    color="primary"
                  >
                    {currDate} / {currTime}
                  </Typography>
                </div>

                <IconButton>
                  <CloseIcon onClick={() => handleClose()} />
                </IconButton>
              </div>
              <AddForm setOpen={setOpen} />
            </div>
          </Box>
        </Fade>
      </Modal>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open1}
        onClose={handleClose1}
        closeAfterTransition
      >
        <Fade in={open1}>
          <Box sx={style}>
            <div>
              <div className="add-div-close-div">
                <div>
                  <h2 style={{ marginBottom: '0.5rem', marginLeft: '1rem' }}>
                    Update Dharamshala
                  </h2>
                  <Typography
                    style={{ marginLeft: '1rem' }}
                    variant="body2"
                    color="primary"
                  >
                    {currDate} / {currTime}
                  </Typography>
                </div>

                <IconButton>
                  <CloseIcon onClick={() => handleClose1()} />
                </IconButton>
              </div>
              <Updatedharmshala setOpen={setOpen1} updatedata={updatedata} />
            </div>
          </Box>
        </Fade>
      </Modal>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open2}
        onClose={handleClose2}
        closeAfterTransition
      >
        <Fade in={open2}>
          <Box sx={style1}>
            <div>
              <div className="add-div-close-div">
                <div style={{ marginLeft: '1rem', marginBottom: '1rem' }}>
                  <h2 style={{ marginBottom: '0.5rem' }}>
                    Dharamshala details
                  </h2>
                  <Typography variant="body2" color="primary">
                    {currDate} / {currTime}
                  </Typography>
                </div>

                <IconButton>
                  <CloseIcon onClick={() => handleClose2()} />
                </IconButton>
              </div>
              <ViewDharamshala setOpen={setOpen2} updatedata={updatedata} />
            </div>
          </Box>
        </Fade>
      </Modal>

      <div>
        <div className="search-header-print">
          <div
            className="search-header-print"
            style={{
              borderBottom: '1px  solid gray',
              width: '100%',
              borderTop: ' 1px solid gray',
              paddingTop: '1%',
            }}
          >
            <Tooltip title="Export Excel File">
              <IconButton>
                <img
                  onClick={() => ExportToExcel()}
                  src={ExportExcel}
                  alt="cc"
                  style={{ width: '30px', marginLeft: '0rem' }}
                />
              </IconButton>
            </Tooltip>
            <Tooltip title="Export Pdf File">
              <IconButton>
                <img
                  onClick={() => ExportPdfmanul('Dharamshalalist')}
                  src={ExportPdf}
                  alt="cc"
                  style={{ width: '30px' }}
                />
              </IconButton>
            </Tooltip>
            <Tooltip title="Print Report">
              <IconButton>
                <img
                  style={{ width: '30px' }}
                  //   onClick={() => handleOpen5()}
                  src={Print}
                  alt=" Print"
                />
              </IconButton>
            </Tooltip>
            <Tooltip title="Add Dharamshala">
              <Button
                onClick={() => handleOepn()}
                className="add_btn_main_dhara"
              >
                + Add
              </Button>
            </Tooltip>
            &nbsp;&nbsp;
          </div>
        </div>

        <div className="table-div-maain">
          <Table
            sx={{ minWidth: 650, width: '100%' }}
            aria-label="simple table"
          >
            <TableHead style={{ background: '#F1F0F0' }}>
              <TableRow>
                <TableCell>S.No</TableCell>
                <TableCell>
                  Dharamshala
                  <i
                    style={{ marginLeft: '0.5rem' }}
                    onClick={() => sortData('name')}
                    class={`fa fa-sort`}
                  />
                </TableCell>
                <TableCell>
                  Description
                  <i
                    style={{ marginLeft: '0.5rem' }}
                    onClick={() => sortData('desc')}
                    class={`fa fa-sort`}
                  />
                </TableCell>
                <TableCell>
                  Status
                  <i
                    style={{ marginLeft: '0.5rem' }}
                    onClick={() => sortData('desc')}
                    class={`fa fa-sort`}
                  />
                </TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isData ? (
                <>
                  {(rowsPerPage > 0
                    ? isData.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage,
                      )
                    : isData
                  ).map((row, index) => (
                    <TableRow
                      key={row.id}
                      sx={{
                        '&:last-child td, &:last-child th': { border: 0 },
                      }}
                    >
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{row?.name}</TableCell>
                      <TableCell>{row?.desc?.slice(0, 40)}</TableCell>
                      <TableCell>
                        {row?.paymentStatus === 0 ? 'Deactivate' : 'Active'}
                      </TableCell>
                      <TableCell>
                        <Tooltip title="View">
                          <img
                            onClick={() => handleOepn2(row)}
                            src={eye}
                            alt="eye"
                            style={{ width: '20px', marginRight: '0.5rem' }}
                          />
                        </Tooltip>

                        <Tooltip title="Edit">
                          <img
                            onClick={() => handleOepn1(row)}
                            src={Edit}
                            alt="eye"
                            style={{ width: '20px', marginRight: '0.5rem' }}
                          />
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
                </>
              ) : (
                <></>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  count={isData && isData.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  rowsPerPageOptions={[50, 100, 250]}
                  labelRowsPerPage={<span>Rows:</span>}
                  labelDisplayedRows={({ page }) => {
                    return `Page: ${page}`;
                  }}
                  backIconButtonProps={{
                    color: 'secondary',
                  }}
                  nextIconButtonProps={{ color: 'secondary' }}
                  SelectProps={{
                    inputProps: {
                      'aria-label': 'page number',
                    },
                  }}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </div>
      {loader && <LoadingSpinner1 />}
    </>
  );
};

export default AddDharamshala;
