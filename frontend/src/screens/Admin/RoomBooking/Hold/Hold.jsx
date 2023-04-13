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
import { ExportPdfmanul } from '../../../Admin/compoments/ExportPdf';
import Print from '../../../../assets/Print.png';
import ExportPdf from '../../../../assets/ExportPdf.png';
import ExportExcel from '../../../../assets/ExportExcel.png';
import Edit from '../../../../assets/Edit.png';
import eye from '../../../../assets/eye.png';
import Delete from '../../../../assets/Delete.png';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import { backendApiUrl } from '../../../../config/config';
import axios from 'axios';
import Holdfrom from './Holdfrom';
import UpdateHold from './UpdateHold';
import Typography from '@mui/material/Typography';
import RoomBookingTap from '../RoomBookingTap';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import LoadingSpinner1 from '../../../../components/Loading/LoadingSpinner1';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'auto',
  bgcolor: 'background.paper',
  p: 2,
  boxShadow: 24,
  borderRadius: '5px',
};

const Hold = ({ setopendashboard }) => {
  const navigation = useNavigate();
  const [isData, setisData] = React.useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [userrole, setuserrole] = useState('');
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const handleOepn = () => setOpen(true);
  const [loader, setloader] = useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [updatedata, setupdatedata] = useState('');
  const handleClose1 = () => setOpen1(false);
  const handleOepn1 = (data) => {
    setOpen1(true);

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
    serverInstance(`room/hold?id=${deleteId}`, 'delete').then((res) => {
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
  const getall_donation = () => {
    setloader(true);
    serverInstance('room/hold', 'get').then((res) => {
      if (res.data) {
        setisData(res.data);
        setloader(false);
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
    const fileName = 'ManualCashReport';
    const exportType = 'xls';
    var data = [];
    isData.map((item, index) => {
      data.push({
        Date: Moment(item.donation_date).format('DD-MM-YYYY'),
        'Receipt No': item?.ReceiptNo,
        'Voucher No': item?.voucherNo,
        'Phone No': item?.phoneNo,
        name: item?.name,
        Address: item?.address,
        'Head/Item': item?.elecItemDetails.map((row) => {
          return row.type;
        }),
        Amount: item?.elecItemDetails.reduce(
          (n, { amount }) => parseFloat(n) + parseFloat(amount),
          0,
        ),
        remark: item?.elecItemDetails.map((row) => {
          return row.remark;
        }),
        'Created Date': Moment(item?.created_at).format('DD-MM-YYYY'),
      });
    });
    exportFromJSON({ data, fileName, exportType });
  };

  useEffect(() => {
    getall_donation();
    setopendashboard(true);

    setuserrole(Number(sessionStorage.getItem('userrole')));
  }, [open, open1, open3]);

  useEffect(() => {
    getall_donation();
  }, [open, open1, open3]);
  const [currentSort, setcurrentSort] = useState('sort');
  const [currentSort1, setcurrentSort1] = useState('sort');
  const [currentSort2, setcurrentSort2] = useState('sort');
  const [currentSort3, setcurrentSort3] = useState('sort');
  const [currentSort4, setcurrentSort4] = useState('sort');
  const [currentSort5, setcurrentSort5] = useState('sort');
  const [currentSort6, setcurrentSort6] = useState('sort');

  const [sortField, setSortField] = useState('');
  const onSortChange = (sortField) => {
    let nextSort;

    if (sortField === 'mobile') {
      if (currentSort === 'caret-down') nextSort = 'caret-up';
      else if (currentSort === 'caret-up') nextSort = 'sort';
      else if (currentSort === 'sort') nextSort = 'caret-down';
      setSortField(sortField);
      setcurrentSort(nextSort);
    }
    if (sortField === 'name') {
      if (currentSort1 === 'caret-down') nextSort = 'caret-up';
      else if (currentSort1 === 'caret-up') nextSort = 'sort';
      else if (currentSort1 === 'sort') nextSort = 'caret-down';
      setSortField(sortField);
      setcurrentSort1(nextSort);
    }

    if (sortField === 'roomNo') {
      if (currentSort2 === 'caret-down') nextSort = 'caret-up';
      else if (currentSort2 === 'caret-up') nextSort = 'sort';
      else if (currentSort2 === 'sort') nextSort = 'caret-down';
      setSortField(sortField);
      setcurrentSort2(nextSort);
    }

    if (sortField === 'since') {
      if (currentSort3 === 'caret-down') nextSort = 'caret-up';
      else if (currentSort3 === 'caret-up') nextSort = 'sort';
      else if (currentSort3 === 'sort') nextSort = 'caret-down';
      setSortField(sortField);
      setcurrentSort3(nextSort);
    }
    if (sortField === 'remain') {
      if (currentSort4 === 'caret-down') nextSort = 'caret-up';
      else if (currentSort4 === 'caret-up') nextSort = 'sort';
      else if (currentSort4 === 'sort') nextSort = 'caret-down';
      setSortField(sortField);
      setcurrentSort4(nextSort);
    }
    if (sortField === 'approvedBy') {
      if (currentSort5 === 'caret-down') nextSort = 'caret-up';
      else if (currentSort5 === 'caret-up') nextSort = 'sort';
      else if (currentSort5 === 'sort') nextSort = 'caret-down';
      setSortField(sortField);
      setcurrentSort5(nextSort);
    }

    if (sortField === 'remarks') {
      if (currentSort6 === 'caret-down') nextSort = 'caret-up';
      else if (currentSort6 === 'caret-up') nextSort = 'sort';
      else if (currentSort6 === 'sort') nextSort = 'caret-down';
      setSortField(sortField);
      setcurrentSort6(nextSort);
    }
  };

  useEffect(() => {
    if (sortField === 'mobile') {
      if (currentSort === 'caret-up') {
        isData.sort((a, b) => {
          let fa = a[sortField].toLowerCase(),
            fb = b[sortField].toLowerCase();

          if (fa < fb) {
            return -1;
          }
          if (fa > fb) {
            return 1;
          }
          return 0;
        });
      } else if (currentSort === 'caret-down') {
        isData.sort((a, b) => {
          let fa = a[sortField].toLowerCase(),
            fb = b[sortField].toLowerCase();

          if (fa > fb) {
            return -1;
          }
          if (fa < fb) {
            return 1;
          }
          return 0;
        });
      } else {
        // getall_donation();
      }
    }

    if (sortField === 'name') {
      if (currentSort1 === 'caret-up') {
        isData.sort((a, b) => {
          let fa = a[sortField],
            fb = b[sortField];

          return fb - fa;
        });
      } else if (currentSort1 === 'caret-down') {
        isData.sort((a, b) => {
          let fa = a[sortField],
            fb = b[sortField];

          return fa - fb;
        });
      } else {
        // getall_donation();
      }
    }

    if (sortField === 'roomNo') {
      if (currentSort2 === 'caret-up') {
        isData.sort((a, b) => {
          let fa = a[sortField],
            fb = b[sortField];

          return fb - fa;
        });
      } else if (currentSort2 === 'caret-down') {
        isData.sort((a, b) => {
          let fa = a[sortField],
            fb = b[sortField];
          return fa - fb;
        });
      } else {
        // getall_donation();
      }
    }

    if (sortField === 'since') {
      if (currentSort3 === 'caret-up') {
        isData.sort((a, b) => {
          let da = new Date(a[sortField]),
            db = new Date(b[sortField]);
          return db - da;
        });
      } else if (currentSort3 === 'caret-down') {
        isData.sort((a, b) => {
          let da = new Date(a[sortField]),
            db = new Date(b[sortField]);
          return da - db;
        });
      } else {
        // getall_donation();
      }
    }

    if (sortField === 'remain') {
      if (currentSort4 === 'caret-up') {
        isData.sort((a, b) => {
          let da = new Date(a[sortField]),
            db = new Date(b[sortField]);
          return db - da;
        });
      } else if (currentSort4 === 'caret-down') {
        isData.sort((a, b) => {
          let da = new Date(a[sortField]),
            db = new Date(b[sortField]);
          return da - db;
        });
      } else {
        // getall_donation();
      }
    }

    if (sortField === 'approvedBy') {
      if (currentSort5 === 'caret-up') {
        isData.sort((a, b) => {
          let fa = a[sortField],
            fb = b[sortField];
          if (fa > fb) {
            return -1;
          }
          if (fa < fb) {
            return 1;
          }
          return 0;
        });
      } else if (currentSort5 === 'caret-down') {
        isData.sort((a, b) => {
          let fa = a[sortField],
            fb = b[sortField];

          if (fa < fb) {
            return -1;
          }
          if (fa > fb) {
            return 1;
          }
          return 0;
        });
      } else {
        // getall_donation();
      }
    }

    if (sortField === 'remarks') {
      if (currentSort6 === 'caret-up') {
        isData.sort((a, b) => {
          let fa = a[sortField],
            fb = b[sortField];
          if (fa > fb) {
            return -1;
          }
          if (fa < fb) {
            return 1;
          }
          return 0;
        });
      } else if (currentSort6 === 'caret-down') {
        isData.sort((a, b) => {
          let fa = a[sortField],
            fb = b[sortField];
          if (fa < fb) {
            return -1;
          }
          if (fa > fb) {
            return 1;
          }
          return 0;
        });
      } else {
        // getall_donation();
      }
    }
  }, [
    currentSort,
    currentSort1,
    currentSort2,
    currentSort3,
    currentSort4,
    currentSort5,
    currentSort6,
  ]);
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
                    Hold Room
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
              <Holdfrom setOpen={setOpen} />
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
                    Update Hold Room
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
              <UpdateHold setOpen={setOpen1} dataa={updatedata} />
            </div>
          </Box>
        </Fade>
      </Modal>
      <RoomBookingTap setopendashboard={setopendashboard} />

      <div style={{ marginLeft: '5rem', marginRight: '1.2rem' }}>
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
                  //   onClick={() => ExportToExcel()}
                  src={ExportExcel}
                  alt="cc"
                  style={{ width: '30px', marginLeft: '0rem' }}
                />
              </IconButton>
            </Tooltip>
            <Tooltip title="Export Pdf File">
              <IconButton>
                <img
                  //   onClick={() => ExportPdfmanul(isData, 'Report')}
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
                <TableCell>
                  S.No <Button>&nbsp;</Button>
                </TableCell>
                <TableCell>
                  Holder Mobile No{' '}
                  <Button onClick={() => onSortChange('mobile')}>
                    <i class={`fa fa-${currentSort}`} />
                  </Button>
                </TableCell>
                <TableCell>
                  Room holder Name{' '}
                  <Button onClick={() => onSortChange('name')}>
                    <i class={`fa fa-${currentSort1}`} />
                  </Button>
                </TableCell>
                <TableCell>
                  Room No{' '}
                  <Button onClick={() => onSortChange('roomNo')}>
                    <i class={`fa fa-${currentSort2}`} />
                  </Button>
                </TableCell>
                <TableCell>
                  Hold Since{' '}
                  <Button onClick={() => onSortChange('since')}>
                    <i class={`fa fa-${currentSort3}`} />
                  </Button>
                </TableCell>
                <TableCell>
                  Hold Remain{' '}
                  <Button onClick={() => onSortChange('remain')}>
                    <i class={`fa fa-${currentSort4}`} />
                  </Button>{' '}
                </TableCell>
                <TableCell>
                  Hold Approved By{' '}
                  <Button onClick={() => onSortChange('approvedBy')}>
                    <i class={`fa fa-${currentSort5}`} />
                  </Button>
                </TableCell>
                <TableCell>
                  Remarks{' '}
                  <Button onClick={() => onSortChange('remarks')}>
                    <i class={`fa fa-${currentSort6}`} />
                  </Button>
                </TableCell>
                <TableCell>
                  Action <Button>&nbsp;</Button>
                </TableCell>
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
                      <TableCell>{row?.mobile}</TableCell>
                      <TableCell>{row?.name}</TableCell>
                      <TableCell>{row?.roomNo}</TableCell>
                      <TableCell>
                        {Moment(row?.since).format('DD-MM-YYYY')}
                      </TableCell>
                      <TableCell>
                        {' '}
                        {Moment(row?.remain).format('DD-MM-YYYY')}
                      </TableCell>

                      <TableCell>{row?.approvedBy}</TableCell>
                      <TableCell> {row?.remarks}</TableCell>
                      <TableCell>
                        <Tooltip title="Edit">
                          <img
                            onClick={() => handleOepn1(row)}
                            src={Edit}
                            alt="eye"
                            style={{ width: '20px', marginRight: '0.5rem' }}
                          />
                        </Tooltip>

                        <Tooltip title="Delete">
                          <img
                            onClick={() => handleClickOpen3(row.id)}
                            src={Delete}
                            alt="eye"
                            style={{ width: '20px' }}
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
                  count={isData.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  rowsPerPageOptions={[5, 10, 25]}
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

export default Hold;
