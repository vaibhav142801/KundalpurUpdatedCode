import React, { useEffect, useState } from 'react';
import { serverInstance } from '../../../../API/ServerInstance';
import Swal from 'sweetalert2';
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
import Moment from 'moment-js';
import Print from '../../../../assets/Print.png';
import ExportPdf from '../../../../assets/ExportPdf.png';
import ExportExcel from '../../../../assets/ExportExcel.png';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import RoomShiftForm from './RoomShiftForm';
import Typography from '@mui/material/Typography';
import LoadingSpinner1 from '../../../../components/Loading/LoadingSpinner1';
import moment from 'moment';
import Checkoutform from './Checkoutform';
import { Select, MenuItem } from '@mui/material';
import RoomBookingTap from '../RoomBookingTap';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TotalAdvance from '../CheckIn/TotalAdvance';
import Totalguest from '../CheckIn/Totalguest';
import Printcheckin from '../CheckIn/Printcheckin';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { format } from 'date-fns';
import './RoomShift.css';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',

  bgcolor: 'background.paper',
  p: 3,
  boxShadow: 24,
  borderRadius: '5px',
};

const RoomShift = ({ setopendashboard }) => {
  const navigation = useNavigate();
  const [loader, setloader] = useState(false);
  const [isData, setisData] = React.useState('');
  const [isDataDummy, setisDataDummy] = React.useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [userrole, setuserrole] = useState('');
  const [open, setOpen] = React.useState(false);
  const [optionss, setoptionss] = useState('Currently Stay');
  const [changedata, setchangedata] = useState('');
  const handleClose = () => setOpen(false);
  const handleOepn = (data) => {
    setOpen(true);
    setchangedata(data);
  };

  const [open1, setOpen1] = React.useState(false);
  const handleClose1 = () => setOpen1(false);
  const handleOepn1 = () => {
    setOpen1(true);
  };

  const getall_donation = () => {
    setloader(true);

    if (optionss === 'Currently Stay') {
      serverInstance('room/checkin', 'get').then((res) => {
        if (res.data) {
          setloader(false);
          let filterData = res.data.filter((item) => item.modeOfBooking === 2);
          setisData(filterData);
          setisDataDummy(filterData);
          setisData(filterData);
          setisDataDummy(filterData);
        }
      });
    }
    if (optionss === 'History') {
      serverInstance('room/get-room-history-admin', 'post').then((res) => {
        console.log(res);
        if (res.data) {
          setloader(false);
          let filterData = res.data.filter((item) => item.modeOfBooking === 2);
          setisData(filterData);
          setisDataDummy(filterData);
        }
      });
    }
  };

  const downloadrecept = (row) => {
    navigation('/admin-panel/Room/OnlinePrintReceipt', {
      state: {
        data: row,
      },
    });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
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

  const ExportToExcel = () => {
    const fileName = 'CheckinGuest';
    const exportType = 'xls';
    var data = [];

    isData.map((item, index) => {
      data.push({
        bookingid: item?.booking_id,
        contactNo: item?.contactNo,
        Customer: item?.name,
        CheckinDate: Moment(item?.date).format('DD-MM-YYYY'),
        CheckinTime: moment(item?.time, 'HH:mm:ss').format('hh:mm:ss'),
        CheckOutDate: Moment(item?.coutDate).format('DD-MM-YYYY'),
        CheckOutTime: moment(item?.coutTime, 'HH:mm:ss').format('hh:mm:ss'),
        Rate: item?.roomAmount,
        Advance: item?.advanceAmount,
        RoomNo: item?.RoomNo,
      });
    });
    exportFromJSON({ data, fileName, exportType });
  };
  const ExportPdfmanul = (isData, fileName) => {
    const doc = new jsPDF();

    const tableColumn = [
      'booking_id',
      'contactNo',
      'name',
      'date',
      'time',
      'coutDate',
      'coutTime',
      'roomAmount',
      'advanceAmount',
      'RoomNo',
    ];

    const tableRows = [];

    isData.forEach((item) => {
      const ticketData = [
        item?.booking_id,
        item?.contactNo,
        item?.name,
        Moment(item?.date).format('DD-MM-YYYY'),
        moment(item?.time, 'HH:mm:ss').format('hh:mm:ss'),
        Moment(item?.coutDate).format('DD-MM-YYYY'),
        moment(item?.coutTime, 'HH:mm:ss').format('hh:mm:ss'),
        item?.roomAmount,
        item?.advanceAmount,
        item?.RoomNo,
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
  const [cancelid, setcancelid] = useState('');
  const [open3, setOpen3] = React.useState(false);

  const handleClickOpen3 = (id) => {
    setOpen3(true);
    setcancelid(id);
  };
  const handleClose5 = () => setOpen3(false);

  const handleClose4 = () => {
    setOpen3(false);

    serverInstance('/room/cancel-checkin', 'DELETE', {
      id: cancelid,
    }).then((res) => {
      console.log(res);
      if (res?.data?.status === true) {
        Swal.fire('Great!', res?.data?.message, 'success');
      }
      if (res?.data?.status === false) {
        Swal.fire(
          'Great!',
          'Room failed to checkout (Time Limit Elapsed)',
          'success',
        );
      }
    });
  };

  const [checkforceid, setcheckforceid] = useState('');
  const [open4, setOpen4] = React.useState(false);

  const handleClickOpen4 = (id) => {
    setOpen4(true);
    setcheckforceid(id);
  };
  const handleClose6 = () => setOpen4(false);

  const handleClose7 = () => {
    setOpen4(false);

    serverInstance('/room/force-checkout', 'POST', {
      id: checkforceid,
    }).then((res) => {
      console.log(res);
      if (res.data?.status === true) {
        getall_donation();
        Swal.fire('Great!', res?.data?.message, 'success');
      }
    });
  };

  useEffect(() => {
    getall_donation();
    setopendashboard(true);
    setuserrole(Number(sessionStorage.getItem('userrole')));
  }, [open, open1, open3, open4, optionss]);

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

  const [bookid, setbookid] = useState('');
  const [mobileno, setmobileno] = useState('');
  const [customername, setcustomername] = useState('');
  const [checkindate, setcheckindate] = useState('');
  const [checkintime, setcheckintime] = useState('');
  const [checkoutdate, setcheckoutdate] = useState('');
  const [checkouttime, setcheckouttime] = useState();
  const [roomNo, setroomNo] = useState('');
  const [rate, setrate] = useState('');
  const [advanceRate, setadvanceRate] = useState('');
  const onSearchByOther = (e, type) => {
    if (type === 'rate') {
      setrate(e.target.value);
    }
    if (type === 'advanceRate') {
      setadvanceRate(e.target.value);
    }
    if (type === 'bookid') {
      setbookid(e.target.value.toLowerCase());
    }
    if (type === 'mobileno') {
      setmobileno(e.target.value.toLowerCase());
    }
    if (type === 'customername') {
      setcustomername(e.target.value.toLowerCase());
    }
    if (type === 'checkindate') {
      setcheckindate(e.target.value.toLowerCase());
    }
    if (type === 'checkintime') {
      setcheckintime(e.target.value.toLowerCase());
    }
    if (type === 'checkoutdate') {
      setcheckoutdate(e.target.value.toLowerCase());
    }
    if (type === 'checkouttime') {
      setcheckouttime(e.target.value);
    }
    if (type === 'roomNo') {
      setroomNo(e.target.value);
    }
  };

  useEffect(() => {
    var filtered = isDataDummy?.filter(
      (dt) =>
        dt?.booking_id?.toLowerCase().indexOf(bookid) > -1 &&
        Moment(dt?.date).format('YYYY-MM-DD').indexOf(checkindate) > -1 &&
        Moment(dt?.coutDate).format('YYYY-MM-DD').indexOf(checkoutdate) > -1 &&
        dt?.name?.toLowerCase().indexOf(customername) > -1,
      // dt?.time?.toLowerCase().indexOf(checkintime) > -1 &&
      // dt?.coutTime?.toLowerCase().indexOf(checkouttime) > -1 &&
    );

    if (roomNo) {
      filtered = filtered?.map((item) => {
        if (item.RoomNo == Number(roomNo)) {
          return item;
        } else {
          return;
        }
      });
      filtered = filtered?.filter((x) => x !== undefined);
    }
    if (rate) {
      filtered = filtered?.map((item) => {
        if (item.roomAmount == Number(rate)) {
          return item;
        } else {
          return;
        }
      });
      filtered = filtered?.filter((x) => x !== undefined);
    }

    if (advanceRate) {
      filtered = filtered?.map((item) => {
        if (item.advanceAmount == Number(advanceRate)) {
          return item;
        } else {
          return;
        }
      });
      filtered = filtered?.filter((x) => x !== undefined);
    }
    if (mobileno) {
      filtered = filtered?.map((item) => {
        if (item.contactNo == mobileno) {
          return item;
        } else {
          return;
        }
      });
      filtered = filtered?.filter((x) => x !== undefined);
    }
    setisData(filtered);
  }, [
    bookid,
    checkindate,
    checkintime,
    checkoutdate,
    checkouttime,
    roomNo,
    mobileno,
    customername,
    rate,
    advanceRate,
  ]);
  return (
    <>
      <Dialog
        open={open3}
        onClose={handleClose5}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Cancel'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you want to cancel
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose5}>Disagree</Button>
          <Button onClick={handleClose4} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={open4}
        onClose={handleClose6}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Force check out'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you want to force check out
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose6}>Disagree</Button>
          <Button onClick={handleClose7} autoFocus>
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
                    Room Shift
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
              <RoomShiftForm setOpen={setOpen} changedata={changedata} />
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
                <IconButton>
                  <CloseIcon onClick={() => handleClose1()} />
                </IconButton>
              </div>
              <Printcheckin isData={isData} setOpen1={setOpen1} />;
            </div>
          </Box>
        </Fade>
      </Modal>

      <RoomBookingTap setopendashboard={setopendashboard} />
      <div style={{ marginLeft: '5rem', marginRight: '1.2rem' }}>
        {/* <div className="main_amin_gain">
          <div className="main_amin_gain1">
            Total Guest : <Totalguest data={isData} />
          </div>
          <div className="main_amin_gain2">
            Total Advance : <TotalAdvance data={isData} />
          </div>
          <Select
            id="donation-type"
            required
            sx={{
              width: '280px',
              fontSize: 14,
              '& .MuiSelect-select': {
                // borderColor: !!formerror.donationtype ? 'red' : '',
                padding: '10px 0px 10px 10px',
                background: '#fff',
              },
            }}
            value={optionss}
            name="optionss"
            onChange={(e) => setoptionss(e.target.value)}
          >
            <MenuItem
              sx={{
                fontSize: 14,
              }}
              value={'Currently Stay'}
            >
              Currently Stay
            </MenuItem>

            <MenuItem
              sx={{
                fontSize: 14,
              }}
              value={'History'}
            >
              History
            </MenuItem>
          </Select>
        </div> */}

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
                  onClick={() => ExportPdfmanul(isData, 'OnlineCheckinData')}
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
                  onClick={() => handleOepn1()}
                  src={Print}
                  alt=" Print"
                />
              </IconButton>
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
                  BookingId
                  <i
                    style={{ marginLeft: '0rem' }}
                    onClick={() => sortData('booking_id')}
                    class={`fa fa-sort`}
                  />
                </TableCell>
                <TableCell>
                  Mobile
                  <i
                    style={{ marginLeft: '0rem' }}
                    onClick={() => sortData('contactNo')}
                    class={`fa fa-sort`}
                  />
                </TableCell>
                <TableCell>
                  CustomerName
                  <i
                    style={{ marginLeft: '0rem' }}
                    onClick={() => sortData('holderName')}
                    class={`fa fa-sort`}
                  />
                </TableCell>
                <TableCell>
                  CheckinDate$Time
                  <i
                    style={{ marginLeft: '0rem' }}
                    onClick={() => sortData('date')}
                    class={`fa fa-sort`}
                  />
                </TableCell>

                <TableCell>
                  CheckoutDate$Time
                  <i
                    style={{ marginLeft: '0rem' }}
                    onClick={() => sortData('coutDate')}
                    class={`fa fa-sort`}
                  />
                </TableCell>

                <TableCell>
                  Rate
                  <i
                    style={{ marginLeft: '0rem' }}
                    onClick={() => sortData('roomAmount')}
                    class={`fa fa-sort`}
                  />
                </TableCell>
                <TableCell>
                  AdvanceRate
                  <i
                    style={{ marginLeft: '0rem' }}
                    onClick={() => sortData('advanceAmount')}
                    class={`fa fa-sort`}
                  />
                </TableCell>
                <TableCell>
                  RoomNo
                  <i
                    style={{ marginLeft: '0rem' }}
                    onClick={() => sortData('RoomNo')}
                    class={`fa fa-sort`}
                  />
                </TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>&nbsp;</TableCell>
                <TableCell>
                  <input
                    style={{ width: '5rem' }}
                    className="cuolms_search"
                    type="text"
                    onChange={(e) => onSearchByOther(e, 'bookid')}
                    placeholder="Search bookid"
                  />
                </TableCell>
                <TableCell>
                  <input
                    style={{ width: '7rem' }}
                    className="cuolms_search"
                    type="text"
                    onChange={(e) => onSearchByOther(e, 'mobileno')}
                    placeholder="Search  mobileno"
                  />
                </TableCell>
                <TableCell>
                  <input
                    style={{ width: '7rem' }}
                    className="cuolms_search"
                    type="text"
                    onChange={(e) => onSearchByOther(e, 'customername')}
                    placeholder="Search  name"
                  />
                </TableCell>
                <TableCell>
                  <input
                    style={{ width: '9rem' }}
                    className="cuolms_search"
                    type="date"
                    onChange={(e) => onSearchByOther(e, 'checkindate')}
                    placeholder="Search  checkin date"
                  />
                </TableCell>

                <TableCell>
                  <input
                    style={{ width: '9rem' }}
                    className="cuolms_search"
                    type="date"
                    onChange={(e) => onSearchByOther(e, 'checkoutdate')}
                    placeholder="Search checkout date"
                  />
                </TableCell>

                <TableCell>
                  <input
                    style={{ width: '7rem' }}
                    className="cuolms_search"
                    type="text"
                    onChange={(e) => {
                      onSearchByOther(e, 'rate');
                    }}
                    placeholder="Rate"
                  />
                </TableCell>
                <TableCell>
                  <input
                    style={{ width: '7rem' }}
                    className="cuolms_search"
                    type="text"
                    onChange={(e) => {
                      onSearchByOther(e, 'advanceRate');
                    }}
                    placeholder="Advance"
                  />
                </TableCell>
                <TableCell>
                  <input
                    style={{ width: '7rem' }}
                    className="cuolms_search"
                    type="text"
                    onChange={(e) => {
                      onSearchByOther(e, 'roomNo');
                    }}
                    placeholder="roomNo"
                  />
                </TableCell>
                <TableCell>
                  <button
                    style={{
                      width: '6rem',
                    }}
                    className="chaneRoom"
                    onClick={() => getall_donation()}
                  >
                    Reset
                  </button>
                </TableCell>
              </TableRow>
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
                      <TableCell>{row?.booking_id}</TableCell>
                      <TableCell>{row?.contactNo}</TableCell>
                      <TableCell>{row?.name}</TableCell>
                      <TableCell>
                        {Moment(row?.date).format('DD-MM-YYYY')}&nbsp;&nbsp;
                        {moment(row?.time, 'HH:mm:ss').format('hh:mm:ss')}
                      </TableCell>
                      {/* <TableCell>
                        {moment(row?.time, 'HH:mm:ss').format('hh:mm:ss')}
                      </TableCell> */}
                      <TableCell>
                        {Moment(row?.coutDate).format('DD-MM-YYYY')}&nbsp;&nbsp;
                        {moment(row?.coutTime, 'HH:mm:ss').format('hh:mm:ss')}
                      </TableCell>
                      {/* <TableCell>
                        {moment(row?.coutTime, 'HH:mm:ss').format('hh:mm:ss')}
                      </TableCell> */}
                      <TableCell> {row?.roomAmount}</TableCell>
                      <TableCell> {row?.advanceAmount}</TableCell>
                      <TableCell> {row?.RoomNo}</TableCell>
                      <TableCell
                        style={{ display: 'flex', flexDirection: 'column' }}
                      >
                        {optionss === 'History' ? (
                          <>
                            <button
                              style={{
                                width: '6rem',
                                marginBottom: '4px',
                                backgroundColor: '#000080',
                              }}
                              className="chaneRoom"
                              onClick={() => downloadrecept(row)}
                            >
                              Print
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              style={{
                                width: '6rem',
                                marginBottom: '4px',
                                backgroundColor: '#000080',
                              }}
                              className="chaneRoom"
                              onClick={() => downloadrecept(row)}
                            >
                              Print
                            </button>
                            <button
                              style={{
                                width: '6rem',
                                marginBottom: '4px',
                                backgroundColor: '#800000',
                              }}
                              onClick={() =>
                                navigation('/admin-panel/Room/OnlineForce', {
                                  state: {
                                    data: row,
                                  },
                                })
                              }
                              className="chaneRoom"
                            >
                              Forcecheckout
                            </button>
                            <button
                              style={{
                                width: '6rem',
                                marginBottom: '4px',
                                backgroundColor: '#FF0000',
                              }}
                              onClick={() => handleClickOpen3(row?.id)}
                              className="chaneRoom"
                            >
                              Cancel
                            </button>
                            <button
                              style={{
                                width: '6rem',
                                marginBottom: '4px',
                                backgroundColor: '#800080',
                              }}
                              onClick={() => handleOepn(row)}
                              className="chaneRoom"
                            >
                              RoomChange
                            </button>
                            <button
                              style={{
                                backgroundColor: '#FA7401',
                                width: '6rem',
                                marginBottom: '4px',
                              }}
                              onClick={() =>
                                navigation(
                                  '/admin-panel/Room/OnlinecheckinReceipt',
                                  {
                                    state: {
                                      data: row,
                                    },
                                  },
                                )
                              }
                              className="chaneRoom"
                            >
                              checkout
                            </button>
                          </>
                        )}
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

export default RoomShift;
