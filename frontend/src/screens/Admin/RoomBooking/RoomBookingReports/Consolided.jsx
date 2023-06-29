import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { serverInstance } from '../../../../API/ServerInstance';
import { useNavigate } from 'react-router-dom';
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
import moment from 'moment';
import Print from '../../../../assets/Print.png';
import ExportPdf from '../../../../assets/ExportPdf.png';
import ExportExcel from '../../../../assets/ExportExcel.png';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import { Select, MenuItem } from '@mui/material';
import RoomBookingReportsTab from './RoomBookingReportsTab';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { format } from 'date-fns';
import Printcheckin from '../CheckIn/Printcheckin';
import LoadingSpinner1 from '../../../../components/Loading/LoadingSpinner1';
const style = {
  position: 'absolute',
  top: '47%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'auto',
  bgcolor: 'background.paper',
  p: 2,
  boxShadow: 24,
  borderRadius: '5px',
};

const Consolided = ({ setopendashboard }) => {
  const navigation = useNavigate();
  const [emplist, setemplist] = useState('');
  const [fromdate, setfromdate] = useState('');
  const [toDate, settoDate] = useState('');
  const [empidsearch, setempidsearch] = useState('');
  const [loader, setloader] = useState(false);
  const [isData, setisData] = React.useState('');
  const [isDataDummy, setisDataDummy] = React.useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [userrole, setuserrole] = useState('');
  const [open, setOpen] = React.useState(false);
  const [optionss, setoptionss] = useState('Currently Stay');
  const handleClose = () => setOpen(false);
  const handleOepn = () => setOpen(true);
  const [open1, setOpen1] = React.useState(false);
  const handleClose1 = () => setOpen1(false);
  const handleOepn1 = () => {
    setOpen1(true);
  };
  const [open8, setOpen8] = React.useState(false);
  const [changedata8, setchangedata8] = useState('');
  const handleClose8 = () => setOpen8(false);
  const handleOepn8 = (data) => {
    setOpen8(true);
    setchangedata8(data);
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

    serverInstance(
      'room/consolidated?date=&name=&advanceAmount=&roomAmount=&cancelAmount=',
      'get',
    ).then((res) => {
      console.log(res);
      if (res.data) {
        setloader(false);

        setisData(res.data);
        setisDataDummy(res.data);
      }
    });
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
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

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
  const [cancelid, setcancelid] = useState('');
  const [open3, setOpen3] = React.useState(false);

  const handleClickOpen3 = (id) => {
    setOpen3(true);
    setcancelid(id);
  };
  const handleClose5 = () => setOpen3(false);

  const handleClose4 = () => {
    setOpen3(false);

    // serverInstance('/room/force-checkout', 'POST', {
    //   id: deleteId,
    // }).then((res) => {
    //   console.log(res);
    //   // setOpen(false);
    // });
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

  const handledisable = (date) => {
    console.log('date daisble', date);
  };

  const getallemp_list = () => {
    serverInstance('admin/add-employee', 'get').then((res) => {
      if (res.status) {
        setemplist(res.data);
      } else {
        Swal('Error', 'somthing went  wrong', 'error');
      }
    });
  };

  const reset = () => {
    setfromdate('');
    setempidsearch('');
    getall_donation();
  };
  useEffect(() => {
    getallemp_list();
    getall_donation();
    setopendashboard(true);
    setuserrole(Number(sessionStorage.getItem('userrole')));
  }, [open, open1, open3, open4, open8, optionss]);

  const downloadrecept = (row) => {
    navigation('/admin-panel/Room/OnlinePrintReceipt', {
      state: {
        data: row,
      },
    });
  };

  const filterdata = (e) => {
    e.preventDefault();
    serverInstance(
      `/room/consolidated?date=${fromdate}&employeeName=${empidsearch}`,
      'get',
    ).then((res) => {
      if (res.status) {
        setemplist(res.data);
      } else {
        Swal('Error', 'somthing went  wrong', 'error');
      }
    });
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
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <div style={{ width: '100%' }} />
                <IconButton>
                  <CloseIcon onClick={() => handleClose1()} />
                </IconButton>
              </div>
              <Printcheckin isData={isData} setOpen1={setOpen1} />;
            </div>
          </Box>
        </Fade>
      </Modal>
      <RoomBookingReportsTab setopendashboard={setopendashboard} />
      <div style={{ marginLeft: '5rem', marginRight: '1rem' }}>
        <div
          className="search-header "
          style={{ paddingLeft: '1.5%', paddingRight: '1.3rem' }}
        >
          <div className="search-inner-div-reports">
            <form className="search-inner-div-reports" onSubmit={filterdata}>
              <div className="Center_main_dic_filetr">
                <label htmlFor="donation-date">From Date</label>
                <input
                  id="donation-date"
                  style={{ width: '17rem' }}
                  type="date"
                  placeholder="From"
                  value={fromdate}
                  name="fromdate"
                  onChange={(e) => {
                    setfromdate(e.target.value);
                  }}
                />
              </div>
              {/* <div className="Center_main_dic_filetr">
                <label htmlFor="donation-date">To Date</label>
                <input
                  id="donation-date"
                  style={{ width: '17rem' }}
                  type="date"
                  placeholder="From"
                  value={toDate}
                  name="toDate"
                  onChange={(e) => {
                    settoDate(e.target.value);
                  }}
                />
              </div> */}
              <div className="Center_main_dic_filetr">
                <label>Employee Name</label>
                <select
                  name="cars"
                  id="cars"
                  className="cuolms_search"
                  onChange={(e) => setempidsearch(e.target.value)}
                >
                  <option value="">All user</option>
                  {emplist &&
                    emplist.map((item, idx) => {
                      return (
                        <option value={item.Username}>{item.Username}</option>
                      );
                    })}
                </select>
              </div>

              <div className="Center_main_dic_filetr">
                <label>&nbsp;</label>
                <button>Search</button>
              </div>
            </form>
            <div className="Center_main_dic_filetr">
              <label>&nbsp;</label>
              <button onClick={() => reset()}>Reset</button>
            </div>
          </div>
        </div>
        <div
          className="search-header-print"
          style={{
            paddingRight: '1.5%',
            paddingBottom: '1rem',
            paddingLeft: '1.5%',
          }}
        >
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
                  onClick={() => ExportPdfmanul(isData, 'Report')}
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
                  // onClick={() => handleOpen5()}
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
                  Date
                  <i
                    style={{ marginLeft: '0.5rem' }}
                    onClick={() => sortData('booking_id')}
                    class={`fa fa-sort`}
                  />
                </TableCell>
                <TableCell>
                  Employee Name
                  <i
                    style={{ marginLeft: '0.5rem' }}
                    onClick={() => sortData('booking_id')}
                    class={`fa fa-sort`}
                  />
                </TableCell>
                <TableCell>
                  Check In Amount (Advance)
                  <i
                    style={{ marginLeft: '0.5rem' }}
                    onClick={() => sortData('contactNo')}
                    class={`fa fa-sort`}
                  />
                </TableCell>
                <TableCell>
                  Rent Amount (Room)
                  <i
                    style={{ marginLeft: '0.5rem' }}
                    onClick={() => sortData('holderName')}
                    class={`fa fa-sort`}
                  />
                </TableCell>
                <TableCell>
                  Check Out Amount (Return)
                  <i
                    style={{ marginLeft: '0.5rem' }}
                    onClick={() => sortData('holderName')}
                    class={`fa fa-sort`}
                  />
                </TableCell>

                {/* <TableCell>
                  Cancel Amount
                  <i
                    style={{ marginLeft: '0.5rem' }}
                    onClick={() => sortData('date')}
                    class={`fa fa-sort`}
                  />
                </TableCell> */}

                <TableCell>
                  Total Amount
                  <i
                    style={{ marginLeft: '0.5rem' }}
                    onClick={() => sortData('coutDate')}
                    class={`fa fa-sort`}
                  />
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>&nbsp;</TableCell>
                <TableCell>
                  <input
                    style={{ width: '5rem' }}
                    className="cuolms_search"
                    type="date"
                    onChange={(e) => onSearchByOther(e, 'date')}
                    placeholder="Search name"
                  />
                </TableCell>
                <TableCell>
                  <input
                    style={{ width: '5rem' }}
                    className="cuolms_search"
                    type="text"
                    onChange={(e) => onSearchByOther(e, 'employeeName')}
                    placeholder="Search name"
                  />
                </TableCell>
                <TableCell>
                  <input
                    style={{ width: '7rem' }}
                    className="cuolms_search"
                    type="text"
                    onChange={(e) => onSearchByOther(e, 'checkinAmount')}
                    placeholder="Search  Checkin"
                  />
                </TableCell>
                <TableCell>
                  <input
                    style={{ width: '7rem' }}
                    className="cuolms_search"
                    type="text"
                    onChange={(e) => onSearchByOther(e, 'rateAmount')}
                    placeholder="Search Rate"
                  />
                </TableCell>
                <TableCell>
                  <input
                    style={{ width: '7rem' }}
                    className="cuolms_search"
                    type="text"
                    onChange={(e) => onSearchByOther(e, 'checkoutAmount')}
                    placeholder="Search Checkout"
                  />
                </TableCell>
                {/* 
                <TableCell>
                  <input
                    style={{ width: '7rem' }}
                    className="cuolms_search"
                    type="text"
                    onChange={(e) => onSearchByOther(e, 'cancelAmount')}
                    placeholder="Search Cancel "
                  />
                </TableCell> */}

                <TableCell>
                  <input
                    style={{ width: '7rem' }}
                    className="cuolms_search"
                    type="text"
                    onChange={(e) => onSearchByOther(e, 'totalAmount')}
                    placeholder="Search Total"
                  />
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
                      <TableCell>
                        {Moment(row?.date).format('YYYY-MM-DD')}
                      </TableCell>
                      <TableCell>{row?.Username}</TableCell>
                      <TableCell>{row?.checkinAmount}</TableCell>
                      <TableCell>{row?.rateAmount}</TableCell>
                      <TableCell>{row?.checkoutAmount}</TableCell>

                      {/* <TableCell>{row?.cancelAmount}</TableCell> */}
                      <TableCell>{row?.totalAmount}</TableCell>
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

export default Consolided;
