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
import { MenuItem, Menu, Select } from '@mui/material';
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
import AllTotal from '../AllReport/Totals/AllTotal';
import Tooltip from '@mui/material/Tooltip';
import { Button } from '@mui/material';
import LoadingSpinner1 from '../../../../components/Loading/LoadingSpinner1';
import './AllHead.css';
const AllHead = ({ setopendashboard }) => {
  let users = [];
  let head = [];
  const [passuser, setpassuser] = useState('');
  const [passhead, setpasshead] = useState('');
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

  const componentRef3 = useRef();

  const handlePrint3 = useReactToPrint({
    content: () => componentRef3.current,
  });
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setpassuser(users);
  };

  const [anchorEl1, setAnchorEl1] = React.useState(null);
  const open1 = Boolean(anchorEl1);
  const handleClick1 = (event) => {
    setAnchorEl1(event.currentTarget);
  };
  const handleClose1 = () => {
    setAnchorEl1(null);
    setpasshead(head);
  };

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
    const fileName = 'HeadAllReport';
    const exportType = 'xls';
    var data = [];
    isData.map((item, index) => {
      data.push({
        Head: item?.type,

        'Electronic Amount Cheque': item?.electric_cheque_TOTAL_AMOUNT
          ? item?.electric_cheque_TOTAL_AMOUNT
          : '0',
        'Electronic Amount Bank': item?.electric_bank_TOTAL_AMOUNT
          ? item?.electric_bank_TOTAL_AMOUNT
          : '0',
        'Electronic Amount Cash': item?.electric_item_TOTAL_AMOUNT
          ? item?.electric_item_TOTAL_AMOUNT
          : '0',

        'Manual Amount Cheque': item?.manual_cheque_TOTAL_AMOUNT
          ? item?.manual_cheque_TOTAL_AMOUNT
          : '0',

        'Manual Amount Bank': item?.manual_bank_TOTAL_AMOUNT
          ? item?.manual_bank_TOTAL_AMOUNT
          : '0',

        'Mnaual Amount Item': item?.manual_item_TOTAL_AMOUNT
          ? item?.manual_item_TOTAL_AMOUNT
          : '0',

        'Manual Amount Cash': item?.manual_cash_TOTAL_AMOUNT
          ? item?.manual_cash_TOTAL_AMOUNT
          : '0',

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
    serverInstance(
      `admin/centralized-report?fromDate=${datefrom}&toDate=${dateto}`,
      'post',
      {
        user: passuser,
        type: passhead,
      },
    ).then((res) => {
      if (res.status) {
        setloader(false);
        setisData(res.data);
      } else {
        Swal('Error', 'somthing went  wrong', 'error');
      }
    });
  };

  useEffect(() => {
    filterdata();
    setopendashboard(true);
    getAllEmp();
    gettypehead();
    setuserrole(Number(sessionStorage.getItem('userrole')));
  }, []);

  const resetbutn = () => {
    setpasshead('');
    setpassuser('');
    setdatefrom('');
    setdateto('');
    setempId('');
    setisData('');
    setSearchHead('');
    settype('');
  };

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
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <div className="mainuser_item">
          <input
            style={{ marginLeft: '1.2rem' }}
            type="checkbox"
            onClick={() => {
              setpassuser('');
            }}
          />
          <span>All Users</span>
        </div>
        {empylist &&
          empylist.map((item, index) => (
            <MenuItem key={item?.id}>
              <div className="mainuser_item">
                <input
                  style={{ marginRight: '1rem' }}
                  type="checkbox"
                  onClick={() => {
                    users.push(item?.id);
                    console.log(users);
                  }}
                />
                <span>{item?.Username}</span>
              </div>
            </MenuItem>
          ))}
      </Menu>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl1}
        open={open1}
        onClose={handleClose1}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <div className="mainuser_item">
          <input
            style={{ marginLeft: '1.3rem' }}
            type="checkbox"
            onClick={() => {
              setpasshead('');
            }}
          />
          <span>All Head</span>
        </div>

        {headlist &&
          headlist.map((item, index) => (
            <MenuItem key={index} value={item.type_hi}>
              <div className="mainuser_item">
                <input
                  style={{ marginRight: '1rem' }}
                  type="checkbox"
                  onClick={() => {
                    head.push(item.type_hi);
                    console.log(head);
                  }}
                />
                <span> {item.type_hi}</span>
              </div>
            </MenuItem>
          ))}
      </Menu>

      <AllReportTap setopendashboard={setopendashboard} />

      <div style={{ marginLeft: '5rem', marginRight: '1rem' }}>
        <p>All Head Report</p>
        <div>
          <div className="search-header">
            <div className="search-inner-div-reports">
              <input
                id="donation-date"
                type="date"
                placeholder="From"
                value={datefrom}
                name="datefrom"
                onChange={(e) => {
                  setdatefrom(e.target.value);
                }}
              />
              <input
                id="donation-date"
                type="date"
                placeholder="From"
                value={dateto}
                name="dateto"
                onChange={(e) => {
                  setdateto(e.target.value);
                }}
              />

              <div className="main_div_selectAllhed">
                <div
                  onClick={handleClick1}
                  className="select_person_divAllHead"
                >
                  {passhead.length > 0
                    ? `Selected head ${passhead.length}`
                    : ' All Head'}
                  <svg
                    width="12"
                    height="7"
                    viewBox="0 0 12 7"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 1L6 6L11 1"
                      stroke="#333333"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
              </div>
              <div className="main_div_selectAllhed">
                <div onClick={handleClick} className="select_person_divAllHead">
                  {passuser.length > 0
                    ? `Selected user ${passuser.length}`
                    : 'All User '}
                  <svg
                    width="12"
                    height="7"
                    viewBox="0 0 12 7"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 1L6 6L11 1"
                      stroke="#333333"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
              </div>

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
                <TableCell>
                  Head Name
                  <i
                    style={{ marginLeft: '0.5rem' }}
                    onClick={() => sortData('TYPE')}
                    class={`fa fa-sort`}
                  />
                </TableCell>
                <TableCell>
                  Type
                  <i
                    style={{ marginLeft: '0.5rem' }}
                    onClick={() => sortData('MODE_OF_DONATION')}
                    class={`fa fa-sort`}
                  />
                </TableCell>

                <TableCell>
                  <i
                    style={{ marginLeft: '0.5rem' }}
                    onClick={() => sortData('manual_cheque_TOTAL_AMOUNT')}
                    class={`fa fa-sort`}
                  />
                </TableCell>
                <TableCell>
                  Amount Electronic
                  <i
                    style={{ marginLeft: '0.5rem' }}
                    onClick={() => sortData('manual_bank_TOTAL_AMOUNT')}
                    class={`fa fa-sort`}
                  />
                </TableCell>
                <TableCell>
                  Amount Item
                  <i
                    style={{ marginLeft: '0.5rem' }}
                    onClick={() => sortData('manual_item_TOTAL_AMOUNT')}
                    class={`fa fa-sort`}
                  />
                </TableCell>
                <TableCell>
                  Amount Cash
                  <i
                    style={{ marginLeft: '0.5rem' }}
                    onClick={() => sortData('manual_cash_TOTAL_AMOUNT')}
                    class={`fa fa-sort`}
                  />
                </TableCell>
                <TableCell>Total Amount</TableCell>
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
                      <TableCell onClick={() => filterHead(row.type)}>
                        {row.type ? row.type : row.TYPE}
                      </TableCell>
                      <TableCell>
                        {row?.donationType == 'manual' && 'Manual Donation'}
                        {row?.donationType == 'electric' && 'Donation'}
                      </TableCell>

                      <TableCell>
                        {row?.electric_cheque_TOTAL_AMOUNT &&
                          row?.electric_cheque_TOTAL_AMOUNT}
                        {row?.manual_cheque_TOTAL_AMOUNT &&
                          row?.manual_cheque_TOTAL_AMOUNT}

                        {row?.manual_cheque_TOTAL_AMOUNT === '' &&
                          row?.electric_cheque_TOTAL_AMOUNT === '' &&
                          '0'}
                      </TableCell>
                      <TableCell>
                        {row?.manual_bank_TOTAL_AMOUNT &&
                          row?.manual_bank_TOTAL_AMOUNT}
                        {row?.electric_bank_TOTAL_AMOUNT &&
                          row?.electric_bank_TOTAL_AMOUNT}
                        {row?.electric_bank_TOTAL_AMOUNT === '' &&
                          row?.electric_bank_TOTAL_AMOUNT === '' &&
                          '0'}
                      </TableCell>
                      <TableCell>
                        {row?.manual_item_TOTAL_AMOUNT &&
                          row?.manual_item_TOTAL_AMOUNT}
                        {row?.electric_item_TOTAL_AMOUNT &&
                          row?.electric_item_TOTAL_AMOUNT}
                      </TableCell>
                      <TableCell>
                        {row?.manual_cash_TOTAL_AMOUNT &&
                          row?.manual_cash_TOTAL_AMOUNT}
                        {row?.electric_cash_TOTAL_AMOUNT &&
                          row?.electric_cash_TOTAL_AMOUNT}
                        {row?.electric_cash_TOTAL_AMOUNT === '' &&
                          row?.electric_cash_TOTAL_AMOUNT === '' &&
                          '0'}
                        {row?.cheque === '' && '0'}
                        {row?.online === '' && '0'}
                      </TableCell>

                      <TableCell>
                        {row?.donationType == 'electric' &&
                          parseFloat(row?.electric_cheque_TOTAL_AMOUNT) +
                            parseFloat(row?.electric_bank_TOTAL_AMOUNT) +
                            parseFloat(row?.electric_item_TOTAL_AMOUNT) +
                            parseFloat(row?.electric_cash_TOTAL_AMOUNT)}
                        {row?.donationType == 'manual' &&
                          parseFloat(row?.manual_cheque_TOTAL_AMOUNT) +
                            parseFloat(row?.manual_bank_TOTAL_AMOUNT) +
                            parseFloat(row?.manual_item_TOTAL_AMOUNT) +
                            parseFloat(row?.manual_cash_TOTAL_AMOUNT)}
                      </TableCell>
                    </TableRow>
                  ))}
                </>
              ) : (
                <></>
              )}
              <TableRow>
                <TableCell> &nbsp;</TableCell>
                <TableCell style={{ fontWeight: 700 }}>Total</TableCell>

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

                <TableCell style={{ fontWeight: 700 }}>
                  {<AllTotal data={isData} />}
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
                  rowsPerPageOptions={[100, 200, 30000]}
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

export default AllHead;
