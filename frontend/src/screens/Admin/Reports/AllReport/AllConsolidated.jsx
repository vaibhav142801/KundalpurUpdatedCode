import React, { useEffect, useState, useRef } from 'react';
import { serverInstance } from '../../../../API/ServerInstance';
import Swal from 'sweetalert2';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import exportFromJSON from 'export-from-json';
import Moment from 'moment-js';
import { backendApiUrl } from '../../../../config/config';
import axios from 'axios';
import { ExportPdfmanul } from '../../compoments/ExportPdf';
import Print from '../../../../assets/Print.png';
import ExportPdf from '../../../../assets/ExportPdf.png';
import ExportExcel from '../../../../assets/ExportExcel.png';
import AllReportTap from '../AllReport/AllReportTap';
import { ReactSpinner } from 'react-spinning-wheel';
import 'react-spinning-wheel/dist/style.css';
import { useReactToPrint } from 'react-to-print';
import OnlineTotal from '../AllReport/Totals/OnlineTotal';
import ChequeTotal from '../AllReport/Totals/ChequeTotal';
import Chequestotal from '../AllReport/Totals/ChequeTotal';
import Cashtotal from '../AllReport/Totals/Cashtotal';
import ElecTotal from '../AllReport/Totals/ElecTotal';
import Itemtotal from '../AllReport/Totals/Itemtotal';
import OnlineCHeque from '../AllReport/Totals/OnlineCHeque';
import Tooltip from '@mui/material/Tooltip';
import { Button } from '@mui/material';
import LoadingSpinner1 from '../../../../components/Loading/LoadingSpinner1';
const AllConsolidated = ({ setopendashboard }) => {
  const [loader, setloader] = useState(false);
  const [isData, setisData] = React.useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(100);
  const [empylist, setempylist] = useState('');
  const [headlist, setheadlist] = useState('');
  const [userrole, setuserrole] = useState('');
  const [empId, setempId] = useState('');
  const [type, settype] = useState('');
  const [datefrom, setdatefrom] = useState('');
  const [dateto, setdateto] = useState('');
  const [SearchHead, setSearchHead] = useState('');
  const componentRef2 = useRef();

  const handlePrint2 = useReactToPrint({
    content: () => componentRef2.current,
  });
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getAllEmp = () => {
    serverInstance('admin/add-employee', 'get').then((res) => {
      if (res.status) {
        setempylist(res.data);
      } else {
        Swal('Error', 'somthing went  wrong', 'error');
      }
    });
  };

  const gettypehead = () => {
    serverInstance('admin/donation-type?type=1', 'get').then((res) => {
      if (res.status) {
        setheadlist(res.data);
      } else {
        Swal('Error', 'somthing went  wrong', 'error');
      }
    });
  };

  const ExportToExcel = () => {
    const fileName = 'HeadReport';
    const exportType = 'xls';
    var data = [];
    isData.map((item, index) => {
      data.push({
        Head: item?.type,
        Count: item?.count,
        'Amount Cheque': item?.cheque_amount ? item?.cheque_amount : '0',
        'Amount Electronic': item?.electric_amount
          ? item?.electric_amount
          : '0',
        'Amount Item': item?.item_amount ? item?.item_amount : '0',
        'Amount Cash': item?.cash_amount ? item?.cash_amount : '0',
        Total: item?.total_amount ? item?.total_amount : '0',
        'Created Date': Moment(item?.created_at).format('DD-MM-YYYY'),
      });
    });
    exportFromJSON({ data, fileName, exportType });
  };

  const ExportToExcel1 = () => {
    const fileName = 'Report';
    const exportType = 'xls';
    var data = [];
    SearchHead &&
      SearchHead.map((item, index) => {
        data.push({
          Date: Moment(item.donation_date).format('DD-MM-YYYY'),
          'Receipt No': item?.ReceiptNo,
          'Voucher No': item?.voucherNo,
          'Phone No': item?.phoneNo,
          name: item?.name,
          Address: item?.address,
          'Head/Item': item?.elecItemDetails
            ? item?.elecItemDetails.map((row) => {
                return row.type;
              })
            : item?.type,
          Amount: item?.elecItemDetails
            ? item?.elecItemDetails.reduce(
                (n, { amount }) => parseFloat(n) + parseFloat(amount),
                0,
              )
            : item?.Amount,
          remark: item?.elecItemDetails
            ? item?.elecItemDetails.map((row) => {
                return row.remark;
              })
            : item?.remark,
          'Created Date': Moment(item?.created_at).format('DD-MM-YYYY'),
        });
      });
    exportFromJSON({ data, fileName, exportType });
  };
  const filterdata = async () => {
    setloader(true);
    axios.defaults.headers.get[
      'Authorization'
    ] = `Bearer ${sessionStorage.getItem('token')}`;

    const res = await axios.get(
      `${backendApiUrl}admin/get-cons-report?user=${empId}&fromDate=${datefrom}&toDate=${dateto}&type=${type}`,
    );

    if (res.data.data) {
      setloader(false);
      setisData(res.data.data);
    }
  };

  // const filterHead = async (type) => {
  //   setloader(true);
  //   axios.defaults.headers.get[
  //     'Authorization'
  //   ] = `Bearer ${sessionStorage.getItem('token')}`;

  //   const res = await axios.get(
  //     `${backendApiUrl}user/searchAllDonation?employeeid=${empId}&type=${type}&fromDate=${datefrom}&toDate=${dateto}`,
  //   );

  //   if (res.data.status) {
  //     setloader(false);
  //     setSearchHead(res.data.data);
  //   }
  // };

  useEffect(() => {
    filterdata();
    setopendashboard(true);
    getAllEmp();
    gettypehead();
    setuserrole(Number(sessionStorage.getItem('userrole')));
  }, []);

  const resetbutn = () => {
    setdatefrom('');
    setdateto('');
    setempId('');
    setisData('');
    setSearchHead('');
  };

  const [currentSort, setcurrentSort] = useState('sort');
  const [currentSort1, setcurrentSort1] = useState('sort');
  const [currentSort2, setcurrentSort2] = useState('sort');
  const [currentSort3, setcurrentSort3] = useState('sort');
  const [currentSort4, setcurrentSort4] = useState('sort');
  const [currentSort5, setcurrentSort5] = useState('sort');
  const [currentSort6, setcurrentSort6] = useState('sort');
  const [currentSort7, setcurrentSort7] = useState('sort');

  const [sortField, setSortField] = useState('');
  const onSortChange = (sortField) => {
    let nextSort;

    if (sortField === 'employeeName') {
      if (currentSort === 'caret-down') nextSort = 'caret-up';
      else if (currentSort === 'caret-up') nextSort = 'sort';
      else if (currentSort === 'sort') nextSort = 'caret-down';
      setSortField(sortField);
      setcurrentSort(nextSort);
    }
    if (sortField === 'MODE_OF_DONATION') {
      if (currentSort1 === 'caret-down') nextSort = 'caret-up';
      else if (currentSort1 === 'caret-up') nextSort = 'sort';
      else if (currentSort1 === 'sort') nextSort = 'caret-down';
      setSortField(sortField);
      setcurrentSort1(nextSort);
    }

    if (sortField === 'ONLINE_TOTAL_AMOUNT') {
      if (currentSort2 === 'caret-down') nextSort = 'caret-up';
      else if (currentSort2 === 'caret-up') nextSort = 'sort';
      else if (currentSort2 === 'sort') nextSort = 'caret-down';
      setSortField(sortField);
      setcurrentSort2(nextSort);
    }

    if (sortField === 'CHEQUE_TOTAL_AMOUNT') {
      if (currentSort3 === 'caret-down') nextSort = 'caret-up';
      else if (currentSort3 === 'caret-up') nextSort = 'sort';
      else if (currentSort3 === 'sort') nextSort = 'caret-down';
      setSortField(sortField);
      setcurrentSort3(nextSort);
    }
    if (sortField === 'manual_cheque_TOTAL_AMOUNT') {
      if (currentSort4 === 'caret-down') nextSort = 'caret-up';
      else if (currentSort4 === 'caret-up') nextSort = 'sort';
      else if (currentSort4 === 'sort') nextSort = 'caret-down';
      setSortField(sortField);
      setcurrentSort4(nextSort);
    }
    if (sortField === 'manual_bank_TOTAL_AMOUNT') {
      if (currentSort5 === 'caret-down') nextSort = 'caret-up';
      else if (currentSort5 === 'caret-up') nextSort = 'sort';
      else if (currentSort5 === 'sort') nextSort = 'caret-down';
      setSortField(sortField);
      setcurrentSort5(nextSort);
    }

    if (sortField === 'manual_item_TOTAL_AMOUNT') {
      if (currentSort6 === 'caret-down') nextSort = 'caret-up';
      else if (currentSort6 === 'caret-up') nextSort = 'sort';
      else if (currentSort6 === 'sort') nextSort = 'caret-down';
      setSortField(sortField);
      setcurrentSort6(nextSort);
    }

    if (sortField === 'manual_cash_TOTAL_AMOUNT') {
      if (currentSort7 === 'caret-down') nextSort = 'caret-up';
      else if (currentSort7 === 'caret-up') nextSort = 'sort';
      else if (currentSort7 === 'sort') nextSort = 'caret-down';
      setSortField(sortField);
      setcurrentSort7(nextSort);
    }
  };

  useEffect(() => {
    if (sortField === 'employeeName') {
      if (currentSort === 'caret-up') {
        isData.sort((a, b) => {
          let fa = a.MODE_OF_DONATION,
            fb = b.MODE_OF_DONATION;

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
          let fa = a.MODE_OF_DONATION,
            fb = b.MODE_OF_DONATION;

          if (fa > fb) {
            return -1;
          }
          if (fa < fb) {
            return 1;
          }
          return 0;
        });
      } else {
        // filterdata();
      }
    }

    if (sortField === 'MODE_OF_DONATION') {
      if (currentSort1 === 'caret-up') {
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
      } else if (currentSort1 === 'caret-down') {
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
        // filterdata();
      }
    }

    if (sortField === 'ONLINE_TOTAL_AMOUNT') {
      if (currentSort2 === 'caret-up') {
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
      } else if (currentSort2 === 'caret-down') {
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
        // filterdata();
      }
    }

    if (sortField === 'CHEQUE_TOTAL_AMOUNT') {
      if (currentSort3 === 'caret-up') {
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
      } else if (currentSort3 === 'caret-down') {
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
        // filterdata();
      }
    }

    if (sortField === 'manual_cheque_TOTAL_AMOUNT') {
      if (currentSort4 === 'caret-up') {
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
      } else if (currentSort4 === 'caret-down') {
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
        // filterdata();
      }
    }

    if (sortField === 'manual_bank_TOTAL_AMOUNT') {
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
        // filterdata();
      }
    }

    if (sortField === 'manual_item_TOTAL_AMOUNT') {
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
        // filterdata();
      }
    }

    if (sortField === 'manual_cash_TOTAL_AMOUNT') {
      if (currentSort7 === 'caret-up') {
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
      } else if (currentSort7 === 'caret-down') {
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
        // filterdata();
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
    currentSort7,
  ]);
  return (
    <>
      <AllReportTap setopendashboard={setopendashboard} />

      <div style={{ marginLeft: '5rem', marginRight: '1rem' }}>
        <p>All Consolidated Report</p>
        <div>
          <div className="search-header">
            <div className="search-inner-div-reports">
              <input
                type="date"
                placeholder="From"
                value={datefrom}
                name="datefrom"
                onChange={(e) => {
                  setdatefrom(e.target.value);
                }}
              />
              <input
                type="date"
                placeholder="From"
                value={dateto}
                name="dateto"
                onChange={(e) => {
                  setdateto(e.target.value);
                }}
              />
              <select
                style={{ width: '14%' }}
                value={type}
                name="type"
                onChange={(e) => settype(e.target.value)}
              >
                <option>Type/Head</option>
                {headlist &&
                  headlist.map((item, index) => (
                    <option key={index} value={item.type_hi}>
                      {item.type_hi}
                    </option>
                  ))}
              </select>
              <select
                style={{ width: '14%' }}
                value={empId}
                name="empId"
                onChange={(e) => setempId(e.target.value)}
              >
                <option>Select User</option>
                {empylist &&
                  empylist.map((item, index) => (
                    <option key={index} value={item.id}>
                      {item.Username}
                    </option>
                  ))}
              </select>
              <button onClick={() => filterdata()}>Search</button>
              <button onClick={() => resetbutn()}>Reset</button>
              <Tooltip title="Print">
                <img
                  onClick={() => handlePrint2()}
                  src={Print}
                  alt="ss"
                  style={{ width: '30px' }}
                />
              </Tooltip>
              <Tooltip title="Export excel">
                <img
                  onClick={() => ExportToExcel()}
                  src={ExportExcel}
                  alt="s"
                  style={{ width: '30px' }}
                />
              </Tooltip>
              <Tooltip title="Export pdf">
                <img
                  onClick={() => ExportPdfmanul(isData, 'HeadReport')}
                  src={ExportPdf}
                  alt="ss"
                  style={{ width: '30px' }}
                />
              </Tooltip>
            </div>
            <div></div>
          </div>
        </div>

        <div className="table-div-maain" ref={componentRef2}>
          <Table
            sx={{ minWidth: 650, width: '100%' }}
            aria-label="simple table"
          >
            <TableHead style={{ background: '#FFEEE0' }}>
              <TableRow>
                <TableCell>&nbsp; </TableCell>
                <TableCell
                // style={{
                //   display: 'flex',
                //   flexDirection: 'column',
                //   alignItems: 'center',
                // }}
                >
                  Employee Name
                  <Button onClick={() => onSortChange('employeeName')}>
                    <i class={`fa fa-${currentSort}`} />
                  </Button>
                </TableCell>
                <TableCell>
                  <span
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: '9rem',
                    }}
                  >
                    Type
                    <Button onClick={() => onSortChange('MODE_OF_DONATION')}>
                      <i class={`fa fa-${currentSort1}`} />
                    </Button>
                  </span>
                </TableCell>
                <TableCell>
                  Online{' '}
                  <Button onClick={() => onSortChange('ONLINE_TOTAL_AMOUNT')}>
                    <i class={`fa fa-${currentSort2}`} />
                  </Button>
                </TableCell>
                <TableCell>
                  Cheque{' '}
                  <Button onClick={() => onSortChange('CHEQUE_TOTAL_AMOUNT')}>
                    <i class={`fa fa-${currentSort3}`} />
                  </Button>
                </TableCell>
                <TableCell>
                  Amount Cheque{' '}
                  <Button
                    onClick={() => onSortChange('manual_cheque_TOTAL_AMOUNT')}
                  >
                    <i class={`fa fa-${currentSort4}`} />
                  </Button>
                </TableCell>
                <TableCell>
                  Amount Electronic{' '}
                  <Button
                    onClick={() => onSortChange('manual_bank_TOTAL_AMOUNT')}
                  >
                    <i class={`fa fa-${currentSort5}`} />
                  </Button>
                </TableCell>
                <TableCell>
                  Amount Item{' '}
                  <Button
                    onClick={() => onSortChange('manual_item_TOTAL_AMOUNT')}
                  >
                    <i class={`fa fa-${currentSort6}`} />
                  </Button>
                </TableCell>
                <TableCell>
                  Amount Cash
                  <Button
                    onClick={() => onSortChange('manual_cash_TOTAL_AMOUNT')}
                  >
                    <i class={`fa fa-${currentSort7}`} />
                  </Button>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isData ? (
                <>
                  {(rowsPerPage > 0
                    ? isData
                        .reverse()
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage,
                        )
                    : isData
                  ).map((row, index) => (
                    <TableRow
                      key={index}
                      sx={{
                        '&:last-child td, &:last-child th': { border: 0 },
                      }}
                    >
                      {' '}
                      <TableCell>&nbsp;</TableCell>
                      {/* <TableCell onClick={() => filterHead(row.type)}> */}
                      <TableCell>
                        {row.employeeName ? row.employeeName : '-'}
                      </TableCell>
                      <TableCell style={{ width: '9rem' }}>
                        {row?.donationType == 'manual'
                          ? 'Manual Donation'
                          : 'Donation'}
                      </TableCell>
                      <TableCell>
                        {row.ONLINE_TOTAL_AMOUNT ? row.ONLINE_TOTAL_AMOUNT : ''}
                      </TableCell>
                      <TableCell>
                        {row.CHEQUE_TOTAL_AMOUNT ? row.CHEQUE_TOTAL_AMOUNT : ''}
                      </TableCell>
                      <TableCell>
                        {row?.electric_cheque_TOTAL_AMOUNT
                          ? row?.electric_cheque_TOTAL_AMOUNT
                          : ''}
                        {row?.manual_cheque_TOTAL_AMOUNT
                          ? row?.manual_cheque_TOTAL_AMOUNT
                          : ''}
                      </TableCell>
                      <TableCell>
                        {row?.manual_bank_TOTAL_AMOUNT
                          ? row?.manual_bank_TOTAL_AMOUNT
                          : ''}
                        {row?.electric_bank_TOTAL_AMOUNT
                          ? row?.electric_bank_TOTAL_AMOUNT
                          : ''}
                      </TableCell>
                      <TableCell>
                        {row?.manual_item_TOTAL_AMOUNT
                          ? row?.manual_item_TOTAL_AMOUNT
                          : ''}
                        {row?.electric_item_TOTAL_AMOUNT
                          ? row?.electric_item_TOTAL_AMOUNT
                          : ''}
                      </TableCell>
                      <TableCell>
                        {row?.manual_cash_TOTAL_AMOUNT
                          ? row?.manual_cash_TOTAL_AMOUNT
                          : ''}
                        {row?.electric_cash_TOTAL_AMOUNT
                          ? row?.electric_cash_TOTAL_AMOUNT
                          : ''}
                      </TableCell>
                    </TableRow>
                  ))}
                </>
              ) : (
                <></>
              )}
              <TableRow>
                <TableCell> &nbsp;</TableCell>
                <TableCell> &nbsp;</TableCell>
                <TableCell style={{ fontWeight: 700 }}>Total</TableCell>
                <TableCell style={{ fontWeight: 700 }}>
                  {<OnlineTotal data={isData} />}
                </TableCell>
                <TableCell style={{ fontWeight: 700 }}>
                  {<OnlineCHeque data={isData} />}
                </TableCell>
                <TableCell style={{ fontWeight: 700 }}>
                  {<Chequestotal data={isData} />}
                </TableCell>

                <TableCell style={{ fontWeight: 700 }}>
                  {<ElecTotal data={isData} />}
                </TableCell>
                <TableCell style={{ fontWeight: 700 }}>
                  {<Itemtotal data={isData} />}
                </TableCell>

                <TableCell style={{ fontWeight: 700 }}>
                  {<Cashtotal data={isData} />}
                </TableCell>
              </TableRow>
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

        {SearchHead && (
          <>
            <div>
              <p className="Cheque_text">Head Report</p>
              <img
                src={Print}
                alt="jj"
                style={{ width: '25px', marginRight: '2rem' }}
              />
              <img
                onClick={() => ExportToExcel1()}
                src={ExportExcel}
                alt="jj"
                style={{ width: '25px', marginRight: '2rem' }}
              />
              <img
                onClick={() => ExportPdfmanul(isData, 'HeadReport')}
                src={ExportPdf}
                alt="jj"
                style={{ width: '25px', marginRight: '1rem' }}
              />
            </div>
            <div className="table-div-">
              <Table
                sx={{ minWidth: 650, width: '100%' }}
                aria-label="simple table"
              >
                <TableHead style={{ background: '#FFEEE0' }}>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>ReceiptNo</TableCell>

                    <TableCell>VoucherNo</TableCell>
                    <TableCell>Phone No</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Address</TableCell>
                    <TableCell>Head/Item</TableCell>
                    <TableCell>Amount</TableCell>

                    <TableCell>Remark</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {SearchHead ? (
                    <>
                      {(rowsPerPage > 0
                        ? SearchHead.slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage,
                          )
                        : SearchHead
                      ).map((row, index) => (
                        <TableRow
                          key={row.id}
                          sx={{
                            '&:last-child td, &:last-child th': { border: 0 },
                          }}
                        >
                          <TableCell>
                            {Moment(row.donation_date).format('DD/MM/YYYY')}
                          </TableCell>
                          <TableCell>{row.ReceiptNo}</TableCell>

                          <TableCell>{row.voucherNo}</TableCell>
                          <TableCell>{row.phoneNo}</TableCell>
                          <TableCell>{row.name}</TableCell>
                          <TableCell> {row.address}</TableCell>
                          <TableCell>
                            {row.elecItemDetails.map((row) => {
                              return (
                                <li style={{ listStyle: 'none' }}>
                                  {row.type}
                                </li>
                              );
                            })}
                          </TableCell>
                          <TableCell>
                            {row.elecItemDetails.reduce(
                              (n, { amount }) =>
                                parseFloat(n) + parseFloat(amount),
                              0,
                            )}
                          </TableCell>

                          <TableCell>
                            {row.elecItemDetails.map((row) => {
                              return (
                                <li style={{ listStyle: 'none' }}>
                                  {row.remark}{' '}
                                </li>
                              );
                            })}
                          </TableCell>
                        </TableRow>
                      ))}
                    </>
                  ) : (
                    <>
                      <TableCell colSpan={8} align="center">
                        <ReactSpinner />
                      </TableCell>
                    </>
                  )}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TablePagination
                      count={SearchHead.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                      rowsPerPageOptions={[100, 200, 300000]}
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
          </>
        )}
      </div>

      {loader && <LoadingSpinner1 />}
    </>
  );
};

export default AllConsolidated;
