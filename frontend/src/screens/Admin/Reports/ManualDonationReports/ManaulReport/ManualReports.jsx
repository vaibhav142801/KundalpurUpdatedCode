import React, { useEffect, useState } from 'react';
import { serverInstance } from '../../../../../API/ServerInstance';
import Swal from 'sweetalert2';
import { useNavigate, Link } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import { Box } from '@mui/material';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import CloseIcon from '@mui/icons-material/Close';
import Cancel from '../../../compoments/Cancel1';
import DownloadIcon from '@mui/icons-material/Download';
import ClearIcon from '@mui/icons-material/Clear';
import Moment from 'moment-js';
import exportFromJSON from 'export-from-json';
import { ExportPdfmanulElectronic } from '../../../compoments/ExportPdf';
import UpdateCash from '../../../Donation/ManualDonation/UpdateComponents/UpdateCash';
import UpdateChe from '../../../Donation/ManualDonation/UpdateComponents/UpdateChe';
import UpdateElec from '../../../Donation/ManualDonation/UpdateComponents/UpdateElec';
import UpdateTtem from '../../../Donation/ManualDonation/UpdateComponents/UpdateTtem';
import Print from '../../../../../assets/Print.png';
import ExportPdf from '../../../../../assets/ExportPdf.png';
import ExportExcel from '../../../../../assets/ExportExcel.png';
import Edit from '../../../../../assets/Edit.png';
import ManualTotal from '../../../compoments/ManualTotal';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import PrintManual from '../../../compoments/PrintManual';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import axios from 'axios';
import { backendApiUrl } from '../../../../../config/config';
import ManualDonationTap from '../ManualDonationTap';
import Delete from '../../../../../assets/Delete.png';
import { Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import LoadingSpinner1 from '../../../../../components/Loading/LoadingSpinner1';
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,

  color: '#FDC99C',
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',

  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  zIndex: 2,
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  left: '11px',
  bottom: '0px',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    height: '17px',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const style5 = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  width: '70%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  p: 2,

  boxShadow: 24,
  borderRadius: '15px',
};
const style = {
  position: 'absolute',
  top: '40%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '30%',
  bgcolor: 'background.paper',
  p: 2,
  boxShadow: 24,
  borderRadius: '5px',
};

const openupadtestyle = {
  position: 'absolute',
  top: '40%',
  left: '50%',
  transform: 'translate(-50%, -50%)',

  bgcolor: 'background.paper',
  p: 2,
  boxShadow: 24,
  borderRadius: '5px',
};

const donationColorTheme = {
  cash: '#48a828',
};

const ManualReports = ({ setopendashboard }) => {
  const navigation = useNavigate();
  const [loader, setloader] = useState(false);
  const [emplist, setemplist] = useState('');
  const [isData, setisData] = React.useState('');
  const [isDataDummy, setisDataDummy] = React.useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [showalert, setshowalert] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [updateData, setupdateData] = useState('');
  const [openupdate, setopenupdate] = useState(false);
  const [showUpdateBtn, setshowUpdateBtn] = useState(true);
  const [donationTypes, setDonationTypes] = useState([]);
  const [updateId, setupdateId] = useState('');
  const [datefrom, setdatefrom] = useState('');
  const [dateto, setdateto] = useState('');
  const [userrole, setuserrole] = useState('');
  const [voucherfrom, setvoucherfrom] = useState('');
  const [voucherto, setvoucherto] = useState('');
  const [open5, setOpen5] = React.useState(false);
  const [searchvalue, setsearchvalue] = useState('');
  const handleOpen5 = () => setOpen5(true);
  const handleClose5 = () => setOpen5(false);
  const [date, setDate] = useState('');
  const [receiptNo, setReceiptNo] = useState('');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [remark, setRemark] = useState('');
  const [type, setType] = useState('');
  const [userType, setUserType] = useState('');
  const [deleteId, setdeleteId] = useState('');
  const [open3, setOpen3] = React.useState(false);
  const [chequeno, setchequeno] = useState('');
  const [bank, setbank] = useState('');
  const handleClickOpen3 = (id) => {
    setOpen3(true);
    setdeleteId(id);
  };

  const handleClose6 = () => setOpen3(false);
  const handleClose4 = () => {
    setOpen3(false);
    serverInstance('admin/delete-meanual-donation', 'post', { id: deleteId })
      .then((res) => {
        if (res.data.status) {
          Swal.fire('Great!', res.data.message, 'success');
          getall_donation();
        } else {
          Swal('Error', 'somthing went  wrong', 'error');
        }
      })
      .catch((error) => {
        Swal('Error', 'somthing went  wrong', 'error');
      });
  };
  const handleOpen = (id) => {
    setupdateId(id);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const upadteClose = () => {
    setopenupdate(false);
  };
  const upadteOpen = (row) => {
    setupdateData(row);
    setopenupdate(true);
  };

  const getall_donation = () => {
    setloader(true);
    setsearchvalue('');
    setdatefrom('');
    setdateto('');
    setvoucherfrom('');
    setvoucherto('');
    serverInstance('admin/manual-donation', 'get').then((res) => {
      if (res.status) {
        setloader(false);
        let filterData = res.data.filter((item) => item.modeOfDonation === '3');

        setisData(filterData);
        setisDataDummy(filterData);
      } else {
        Swal('Error', 'somthing went  wrong', 'error');
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

  const printreceipt = (row) => {
    if (row.active === '0') {
    } else {
      navigation('/manualreceipt', {
        state: {
          userdata: row,
        },
      });
    }
  };

  const ExportToExcel = () => {
    const fileName = 'ManaulAllDonationReport';
    const exportType = 'xls';
    var data = [];
    isData.map((item, index) => {
      data.push({
        Date: Moment(item.donation_date).format('DD-MM-YYYY'),
        'Receipt No': item?.ReceiptNo,

        'Phone No': item?.phoneNo,
        name: item?.name,
        Address: item?.address,
        'Head/Item': item?.manualItemDetails.map((row) => {
          return row.type;
        }),
        Amount: item?.manualItemDetails.reduce(
          (n, { amount }) => parseFloat(n) + parseFloat(amount),
          0,
        ),
        remark: item?.manualItemDetails.map((row) => {
          return row.remark;
        }),
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
    if (searchvalue) {
      const res = await axios.get(
        `${backendApiUrl}/admin/search-manual?search=${searchvalue}&type=${3}`,
      );

      if (res.data.status) {
        setloader(false);
        setisData(res.data.data);
        setisDataDummy(res.data.data);
      }
    } else {
      const res = await axios.get(
        `${backendApiUrl}user/manual-search-donation?fromDate=${datefrom}&toDate=${dateto}&fromReceipt=${voucherfrom}&toReceipt=${voucherto}&modeOfDonation=${1}`,
      );

      if (res.data.status) {
        setloader(false);
        setisData(res.data.data);
        setisDataDummy(res.data.data);
      }
    }
  };

  const get_donation_tyeps = () => {
    try {
      Promise.all([serverInstance('admin/donation-type?type=1', 'get')]).then(
        ([res, item]) => {
          if (res.status) {
            setDonationTypes(res.data);
            console.log(res.data);
          } else {
            Swal.fire('Error', 'somthing went  wrong', 'error');
          }
        },
      );
    } catch (error) {
      Swal.fire('Error!', error, 'error');
    }
  };
  const getallemp_list = () => {
    serverInstance('admin/add-employee', 'get').then((res) => {
      if (res.status) {
        setemplist(res.data);
        console.log('empl list', res.data);
      } else {
        Swal('Error', 'somthing went  wrong', 'error');
      }
      console.log(res);
    });
  };
  useEffect(() => {
    getallemp_list();
    getall_donation();
    setopendashboard(true);
    get_donation_tyeps();
    setuserrole(Number(sessionStorage.getItem('userrole')));
  }, [showalert, openupdate, open]);
  const onSearchByOther = (e, type) => {
    if (type === 'Date') {
      setDate(e.target.value);
    }
    if (type === 'Receipt') {
      setReceiptNo(e.target.value.toLowerCase());
    }
    if (type === 'Phone') {
      setPhone(e.target.value.toLowerCase());
    }
    if (type === 'Name') {
      setName(e.target.value.toLowerCase());
    }
    if (type === 'Address') {
      setAddress(e.target.value.toLowerCase());
    }
    if (type === 'Type') {
      setType(e.target.value);
    }
    if (type === 'Amount') {
      setAmount(e.target.value);
    }
    if (type === 'Remark') {
      setRemark(e.target.value);
    }
    if (type === 'UserType') {
      setUserType(e.target.value.toLowerCase());
    }
    if (type === 'Bank') {
      setbank(e.target.value);
    }
    if (type === 'cheque') {
      setchequeno(e.target.value);
    }
  };
  useEffect(() => {
    var filtered = isDataDummy?.filter(
      (dt) =>
        dt?.ReceiptNo.toLowerCase().indexOf(receiptNo) > -1 &&
        dt?.phoneNo.toLowerCase().indexOf(phone) > -1 &&
        Moment(dt?.donation_date).format('YYYY-MM-DD').indexOf(date) > -1 &&
        dt?.name.toLowerCase().indexOf(name) > -1 &&
        dt?.address.toLowerCase().indexOf(address) > -1 &&
        dt?.CreatedBy?.toLowerCase()?.indexOf(userType) > -1,
    );
    console.log(filtered);
    if (type) {
      filtered = filtered?.map((item) => {
        if (item?.manualItemDetails?.find((typ) => typ.type == type)) {
          return item;
        } else {
          return;
        }
      });
      filtered = filtered?.filter((x) => x !== undefined);
    }

    if (amount) {
      filtered = filtered?.map((item) => {
        console.log(
          item.manualItemDetails.reduce(
            (n, { amount }) => parseFloat(n) + parseFloat(amount),
            0,
          ),
        );
        if (
          item.manualItemDetails.reduce(
            (n, { amount }) => parseFloat(n) + parseFloat(amount),
            0,
          ) == amount
        ) {
          return item;
        } else {
          return;
        }
      });
      filtered = filtered?.filter((x) => x !== undefined);
    }
    if (remark) {
      filtered = filtered?.map((item) => {
        if (item?.manualItemDetails?.find((typ) => typ.remark == remark)) {
          return item;
        } else {
          return;
        }
      });
      filtered = filtered?.filter((x) => x !== undefined);
    }
    if (bank) {
      filtered = filtered?.map((item) => {
        if (item?.manualItemDetails?.find((typ) => typ.BankName == bank)) {
          return item;
        } else {
          return;
        }
      });
      filtered = filtered?.filter((x) => x !== undefined);
    }

    if (chequeno) {
      filtered = filtered?.map((item) => {
        if (item?.manualItemDetails?.find((typ) => typ.ChequeNo == chequeno)) {
          return item;
        } else {
          return;
        }
      });
      filtered = filtered?.filter((x) => x !== undefined);
    }

    setisData(filtered);
  }, [
    phone,
    receiptNo,
    date,
    name,
    address,
    type,
    amount,
    remark,
    userType,
    bank,
    chequeno,
  ]);

  const [currentSort, setcurrentSort] = useState('sort');
  const [currentSort1, setcurrentSort1] = useState('sort');
  const [currentSort2, setcurrentSort2] = useState('sort');
  const [currentSort3, setcurrentSort3] = useState('sort');
  const [currentSort4, setcurrentSort4] = useState('sort');
  const [currentSort5, setcurrentSort5] = useState('sort');
  const [currentSort6, setcurrentSort6] = useState('sort');
  const [currentSort7, setcurrentSort7] = useState('sort');
  const [currentSort8, setcurrentSort8] = useState('sort');
  const [currentSort9, setcurrentSort9] = useState('sort');
  const [currentSort10, setcurrentSort10] = useState('sort');
  const [currentSort11, setcurrentSort11] = useState('sort');
  const [sortField, setSortField] = useState('');
  const onSortChange = (sortField) => {
    let nextSort;

    if (sortField === 'donation_date') {
      if (currentSort === 'caret-down') nextSort = 'caret-up';
      else if (currentSort === 'caret-up') nextSort = 'sort';
      else if (currentSort === 'sort') nextSort = 'caret-down';
      setSortField(sortField);
      setcurrentSort(nextSort);
    }
    if (sortField === 'ReceiptNo') {
      if (currentSort1 === 'caret-down') nextSort = 'caret-up';
      else if (currentSort1 === 'caret-up') nextSort = 'sort';
      else if (currentSort1 === 'sort') nextSort = 'caret-down';
      setSortField(sortField);
      setcurrentSort1(nextSort);
    }

    if (sortField === 'voucherNo') {
      if (currentSort2 === 'caret-down') nextSort = 'caret-up';
      else if (currentSort2 === 'caret-up') nextSort = 'sort';
      else if (currentSort2 === 'sort') nextSort = 'caret-down';
      setSortField(sortField);
      setcurrentSort2(nextSort);
    }

    if (sortField === 'phoneNo') {
      if (currentSort3 === 'caret-down') nextSort = 'caret-up';
      else if (currentSort3 === 'caret-up') nextSort = 'sort';
      else if (currentSort3 === 'sort') nextSort = 'caret-down';
      setSortField(sortField);
      setcurrentSort3(nextSort);
    }
    if (sortField === 'name') {
      if (currentSort4 === 'caret-down') nextSort = 'caret-up';
      else if (currentSort4 === 'caret-up') nextSort = 'sort';
      else if (currentSort4 === 'sort') nextSort = 'caret-down';
      setSortField(sortField);
      setcurrentSort4(nextSort);
    }
    if (sortField === 'address') {
      if (currentSort5 === 'caret-down') nextSort = 'caret-up';
      else if (currentSort5 === 'caret-up') nextSort = 'sort';
      else if (currentSort5 === 'sort') nextSort = 'caret-down';
      setSortField(sortField);
      setcurrentSort5(nextSort);
    }

    if (sortField === 'type') {
      if (currentSort6 === 'caret-down') nextSort = 'caret-up';
      else if (currentSort6 === 'caret-up') nextSort = 'sort';
      else if (currentSort6 === 'sort') nextSort = 'caret-down';
      setSortField(sortField);
      setcurrentSort6(nextSort);
    }

    if (sortField === 'amount') {
      if (currentSort7 === 'caret-down') nextSort = 'caret-up';
      else if (currentSort7 === 'caret-up') nextSort = 'sort';
      else if (currentSort7 === 'sort') nextSort = 'caret-down';
      setSortField(sortField);
      setcurrentSort7(nextSort);
    }
    if (sortField === 'createdBy') {
      if (currentSort8 === 'caret-down') nextSort = 'caret-up';
      else if (currentSort8 === 'caret-up') nextSort = 'sort';
      else if (currentSort8 === 'sort') nextSort = 'caret-down';
      setSortField(sortField);
      setcurrentSort8(nextSort);
    }
    if (sortField === 'remark') {
      if (currentSort9 === 'caret-down') nextSort = 'caret-up';
      else if (currentSort9 === 'caret-up') nextSort = 'sort';
      else if (currentSort9 === 'sort') nextSort = 'caret-down';
      setSortField(sortField);
      setcurrentSort9(nextSort);
    }

    if (sortField === 'ChequeNo') {
      if (currentSort9 === 'caret-down') nextSort = 'caret-up';
      else if (currentSort9 === 'caret-up') nextSort = 'sort';
      else if (currentSort9 === 'sort') nextSort = 'caret-down';
      setSortField(sortField);
      setcurrentSort9(nextSort);
    }

    if (sortField === 'BankName') {
      if (currentSort9 === 'caret-down') nextSort = 'caret-up';
      else if (currentSort9 === 'caret-up') nextSort = 'sort';
      else if (currentSort9 === 'sort') nextSort = 'caret-down';
      setSortField(sortField);
      setcurrentSort9(nextSort);
    }
  };

  useEffect(() => {
    if (sortField === 'donation_date') {
      if (currentSort === 'caret-up') {
        isData.sort((a, b) => {
          let da = new Date(a[sortField]),
            db = new Date(b[sortField]);
          return db - da;
        });
      } else if (currentSort === 'caret-down') {
        isData.sort((a, b) => {
          let da = new Date(a[sortField]),
            db = new Date(b[sortField]);
          return da - db;
        });
      } else {
        getall_donation();
      }
    }

    if (sortField === 'ReceiptNo') {
      if (currentSort1 === 'caret-up') {
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
      } else if (currentSort1 === 'caret-down') {
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
      } else {
        getall_donation();
      }
    }

    if (sortField === 'voucherNo') {
      if (currentSort2 === 'caret-up') {
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
      } else if (currentSort2 === 'caret-down') {
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
      } else {
        setisData(defaultdata);
      }
    }

    if (sortField === 'phoneNo') {
      if (currentSort3 === 'caret-up') {
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
      } else if (currentSort3 === 'caret-down') {
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
      } else {
        getall_donation();
      }
    }

    if (sortField === 'name') {
      if (currentSort4 === 'caret-up') {
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
      } else if (currentSort4 === 'caret-down') {
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
      } else {
        getall_donation();
      }
    }

    if (sortField === 'address') {
      if (currentSort5 === 'caret-up') {
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
      } else if (currentSort5 === 'caret-down') {
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
      } else {
        getall_donation();
      }
    }

    if (sortField === 'type') {
      if (currentSort6 === 'caret-up') {
        isData.sort((a, b) => {
          let fa = a.address.toLowerCase(),
            fb = b.address.toLowerCase();

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
          let fa = a.address.toLowerCase(),
            fb = b.address.toLowerCase();

          if (fa < fb) {
            return -1;
          }
          if (fa > fb) {
            return 1;
          }
          return 0;
        });
      } else {
        getall_donation();
      }
    }

    if (sortField === 'amount') {
      if (currentSort7 === 'caret-up') {
        isData.sort((a, b) => {
          let fa = a.address.toLowerCase(),
            fb = b.address.toLowerCase();

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
          let fa = a.address.toLowerCase(),
            fb = b.address.toLowerCase();

          if (fa < fb) {
            return -1;
          }
          if (fa > fb) {
            return 1;
          }
          return 0;
        });
      } else {
        getall_donation();
      }
    }
    if (sortField === 'createdBy') {
      if (currentSort5 === 'caret-up') {
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
      } else if (currentSort5 === 'caret-down') {
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
      } else {
        getall_donation();
      }
    }
    if (sortField === 'remark') {
      if (currentSort9 === 'caret-up') {
        isData.sort((a, b) => {
          let fa = a.address.toLowerCase(),
            fb = b.address.toLowerCase();

          if (fa > fb) {
            return -1;
          }
          if (fa < fb) {
            return 1;
          }
          return 0;
        });
      } else if (currentSort9 === 'caret-down') {
        isData.sort((a, b) => {
          let fa = a.address.toLowerCase(),
            fb = b.address.toLowerCase();

          if (fa < fb) {
            return -1;
          }
          if (fa > fb) {
            return 1;
          }
          return 0;
        });
      } else {
        getall_donation();
      }
    }

    if (sortField === 'ChequeNo') {
      if (currentSort11 === 'caret-up') {
        isData.sort((a, b) => {
          let fa = a.address.toLowerCase(),
            fb = b.address.toLowerCase();

          if (fa > fb) {
            return -1;
          }
          if (fa < fb) {
            return 1;
          }
          return 0;
        });
      } else if (currentSort11 === 'caret-down') {
        isData.sort((a, b) => {
          let fa = a.address.toLowerCase(),
            fb = b.address.toLowerCase();

          if (fa < fb) {
            return -1;
          }
          if (fa > fb) {
            return 1;
          }
          return 0;
        });
      } else {
        getall_donation();
      }
    }
    if (sortField === 'BankName') {
      if (currentSort11 === 'caret-up') {
        isData.sort((a, b) => {
          let fa = a.address.toLowerCase(),
            fb = b.address.toLowerCase();

          if (fa > fb) {
            return -1;
          }
          if (fa < fb) {
            return 1;
          }
          return 0;
        });
      } else if (currentSort11 === 'caret-down') {
        isData.sort((a, b) => {
          let fa = a.address.toLowerCase(),
            fb = b.address.toLowerCase();

          if (fa < fb) {
            return -1;
          }
          if (fa > fb) {
            return 1;
          }
          return 0;
        });
      } else {
        getall_donation();
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
    currentSort8,
    currentSort9,
    currentSort10,
    currentSort11,
  ]);
  return (
    <>
      <Dialog
        open={open3}
        onClose={handleClose6}
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
          <Button onClick={handleClose6}>Disagree</Button>
          <Button onClick={handleClose4} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open5}
        onClose={handleClose5}
        closeAfterTransition
      >
        <Fade in={open5}>
          <Box sx={style5}>
            <PrintManual isData={isData} handleClose={handleClose5} />
          </Box>
        </Fade>
      </Modal>
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
              <div className="add-div-close-div1">
                <h2>Cancel electronic donation </h2>
                <CloseIcon onClick={() => handleClose()} />
              </div>
              <Cancel handleClose={handleClose} updateId={updateId} type={2} />
            </div>
          </Box>
        </Fade>
      </Modal>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openupdate}
        onClose={upadteClose}
        closeAfterTransition
      >
        <Fade in={openupdate}>
          <Box
            sx={{
              ...openupadtestyle,
              width: {
                xs: '90%',
                sm: '70%',
                md: '60%',
              },
            }}
          >
            {updateData?.modeOfDonation === '2' && (
              <>
                <UpdateCash
                  handleClose={upadteClose}
                  themeColor={donationColorTheme.cash}
                  updateData={updateData}
                  showUpdateBtn={showUpdateBtn}
                />
              </>
            )}
            {updateData?.modeOfDonation === '3' && (
              <>
                <UpdateChe
                  handleClose={upadteClose}
                  themeColor={donationColorTheme.cash}
                  updateData={updateData}
                  showUpdateBtn={showUpdateBtn}
                />
              </>
            )}
            {updateData?.modeOfDonation === '1' && (
              <>
                <UpdateElec
                  handleClose={upadteClose}
                  themeColor={donationColorTheme.cash}
                  updateData={updateData}
                  showUpdateBtn={showUpdateBtn}
                />
              </>
            )}
            {updateData?.modeOfDonation === '4' && (
              <>
                <UpdateTtem
                  handleClose={upadteClose}
                  themeColor={donationColorTheme.cash}
                  updateData={updateData}
                  showUpdateBtn={showUpdateBtn}
                />
              </>
            )}
          </Box>
        </Fade>
      </Modal>

      <ManualDonationTap setopendashboard={setopendashboard} />
      <div style={{ marginLeft: '5rem', marginRight: '1rem' }}>
        <div className="search-header">
          <div className="search-inner-div-reports">
            <div className="Center_main_dic_filetr">
              <label>From Date</label>
              <input
                style={{ width: '250px' }}
                type="date"
                placeholder="From"
                value={datefrom}
                name="datefrom"
                onChange={(e) => {
                  setdatefrom(e.target.value);
                }}
              />
            </div>

            <div className="Center_main_dic_filetr">
              <label>To Date</label>
              <input
                style={{ width: '250px' }}
                type="date"
                placeholder="From"
                value={dateto}
                name="dateto"
                onChange={(e) => {
                  setdateto(e.target.value);
                }}
              />
            </div>
            <div className="Center_main_dic_filetr">
              <label>From Voucher</label>
              <input
                style={{ width: '100%' }}
                type="text"
                placeholder="From"
                value={voucherfrom}
                name="voucherfrom"
                onChange={(e) => {
                  setvoucherfrom(e.target.value);
                }}
              />
            </div>
            <div className="Center_main_dic_filetr">
              <label>To Voucher</label>
              <input
                style={{ width: '100%' }}
                type="text"
                placeholder="From"
                value={voucherto}
                name="voucherto"
                onChange={(e) => {
                  setvoucherto(e.target.value);
                }}
              />
            </div>
            <div className="Center_main_dic_filetr">
              <label>&nbsp;</label>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ 'aria-label': 'search' }}
                  value={searchvalue}
                  name="searchvalue"
                  onChange={(e) => setsearchvalue(e.target.value)}
                />
              </Search>
            </div>

            <div className="Center_main_dic_filetr">
              <label>&nbsp;</label>
              <button onClick={() => filterdata()}>Search</button>
            </div>
            <div className="Center_main_dic_filetr">
              <label>&nbsp;</label>
              <button onClick={() => getall_donation()}>Reset</button>
            </div>
          </div>
          {/* <div></div> */}
        </div>

        <div
          className="search-header-prin"
          style={{
            paddingBottom: '1rem',
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
                  style={{ width: '30px' }}
                />
              </IconButton>
            </Tooltip>
            &nbsp;&nbsp;
            <Tooltip title="Export Pdf File">
              <IconButton>
                <img
                  onClick={() =>
                    ExportPdfmanulElectronic(isData, 'ManualCashReport')
                  }
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
                  onClick={() => handleOpen5()}
                  src={Print}
                  alt=" Print"
                />
              </IconButton>
            </Tooltip>
          </div>
        </div>

        <div className="table-div-maain">
          <Table
            sx={{ minWidth: 650, width: '100%' }}
            aria-label="simple table"
          >
            <TableHead style={{ background: '#FFEEE0' }}>
              <TableRow>
                <TableCell
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '150px',
                  }}
                >
                  Date
                  <Button onClick={() => onSortChange('donation_date')}>
                    <i class={`fa fa-${currentSort}`} />
                  </Button>
                </TableCell>
                <TableCell>
                  ReceiptNo{' '}
                  <Button onClick={() => onSortChange('ReceiptNo')}>
                    <i class={`fa fa-${currentSort1}`} />
                  </Button>
                </TableCell>

                <TableCell>
                  Phone No{' '}
                  <Button onClick={() => onSortChange('phoneNo')}>
                    <i class={`fa fa-${currentSort3}`} />
                  </Button>
                </TableCell>
                <TableCell>
                  Name{' '}
                  <Button onClick={() => onSortChange('name')}>
                    <i class={`fa fa-${currentSort4}`} />
                  </Button>
                </TableCell>
                <TableCell>
                  Address{' '}
                  <Button onClick={() => onSortChange('address')}>
                    <i class={`fa fa-${currentSort5}`} />
                  </Button>
                </TableCell>
                <TableCell>
                  Head/Item{' '}
                  <Button onClick={() => onSortChange('type')}>
                    <i class={`fa fa-${currentSort6}`} />
                  </Button>
                </TableCell>
                <TableCell>
                  Amount{' '}
                  <Button onClick={() => onSortChange('amount')}>
                    <i class={`fa fa-${currentSort7}`} />
                  </Button>
                </TableCell>
                <TableCell>
                  Bank{' '}
                  <Button onClick={() => onSortChange('BankName')}>
                    <i class={`fa fa-${currentSort9}`} />
                  </Button>
                </TableCell>
                <TableCell>
                  ChequeNo{' '}
                  <Button onClick={() => onSortChange('ChequeNo')}>
                    <i class={`fa fa-${currentSort9}`} />
                  </Button>
                </TableCell>
                <TableCell>
                  User{' '}
                  <Button onClick={() => onSortChange('createdBy')}>
                    <i class={`fa fa-${currentSort8}`} />
                  </Button>
                </TableCell>
                <TableCell>
                  Remark{' '}
                  <Button onClick={() => onSortChange('remark')}>
                    <i class={`fa fa-${currentSort9}`} />
                  </Button>
                </TableCell>

                <TableCell>
                  Action <Button>&nbsp;</Button>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableCell>
                <input
                  className="cuolms_search"
                  type="date"
                  onChange={(e) => onSearchByOther(e, 'Date')}
                  placeholder="Search Date"
                />
              </TableCell>
              <TableCell>
                <input
                  className="cuolms_search"
                  type="text"
                  onChange={(e) => onSearchByOther(e, 'Receipt')}
                  placeholder="Search Receipt"
                />
              </TableCell>

              <TableCell>
                <input
                  className="cuolms_search"
                  type="text"
                  onChange={(e) => onSearchByOther(e, 'Phone')}
                  placeholder="Search Phone"
                />
              </TableCell>
              <TableCell>
                <input
                  type="text"
                  className="cuolms_search"
                  onChange={(e) => onSearchByOther(e, 'Name')}
                  placeholder="Name"
                />
              </TableCell>
              <TableCell>
                <input
                  className="cuolms_search"
                  type="text"
                  onChange={(e) => onSearchByOther(e, 'Address')}
                  placeholder="Search Address"
                />
              </TableCell>
              <TableCell>
                <select
                  className="cuolms_search"
                  onChange={(e) => onSearchByOther(e, 'Type')}
                >
                  <option value="">All Head</option>

                  {donationTypes.map((item, idx) => {
                    return <option value={item.type_hi}>{item.type_hi}</option>;
                  })}
                </select>
              </TableCell>
              <TableCell>
                <input
                  className="cuolms_search"
                  type="text"
                  onChange={(e) => onSearchByOther(e, 'Amount')}
                  placeholder="Search Amount"
                />
              </TableCell>
              <TableCell>
                <input
                  className="cuolms_search"
                  type="text"
                  onChange={(e) => onSearchByOther(e, 'Bank')}
                  placeholder="Bank name"
                />
              </TableCell>
              <TableCell>
                <input
                  className="cuolms_search"
                  type="text"
                  onChange={(e) => onSearchByOther(e, 'cheque')}
                  placeholder="Cheque no"
                />
              </TableCell>
              <TableCell>
                <select
                  name="cars"
                  id="cars"
                  className="cuolms_search"
                  onChange={(e) => onSearchByOther(e, 'UserType')}
                >
                  <option value="">All user</option>
                  {emplist &&
                    emplist.map((item, idx) => {
                      return (
                        <option value={item.Username}>{item.Username}</option>
                      );
                    })}
                </select>
              </TableCell>

              <TableCell>
                <input
                  className="cuolms_search"
                  type="text"
                  placeholder="Remark"
                  onChange={(e) => onSearchByOther(e, 'Remark')}
                />
              </TableCell>
              <TableCell>&nbsp;</TableCell>
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
                      <TableCell>
                        {Moment(row.donation_date).format('DD/MM/YYYY')}
                      </TableCell>
                      <TableCell>{row.ReceiptNo}</TableCell>

                      <TableCell>{row.phoneNo}</TableCell>
                      <TableCell>{row.name}</TableCell>
                      <TableCell> {row.address}</TableCell>
                      <TableCell>
                        {row.manualItemDetails.map((row) => {
                          return (
                            <li style={{ listStyle: 'none' }}>{row.type}</li>
                          );
                        })}
                      </TableCell>
                      <TableCell>
                        {row.manualItemDetails.reduce(
                          (n, { amount }) => parseFloat(n) + parseFloat(amount),
                          0,
                        )}
                      </TableCell>
                      <TableCell>
                        {row?.manualItemDetails[0]?.BankName}
                      </TableCell>
                      <TableCell>
                        {row?.manualItemDetails[0]?.ChequeNo}
                      </TableCell>
                      <TableCell>{row?.CreatedBy}</TableCell>
                      <TableCell>
                        {row.manualItemDetails.map((row) => {
                          return (
                            <li style={{ listStyle: 'none' }}>{row.remark} </li>
                          );
                        })}
                      </TableCell>
                      <TableCell>
                        {userrole === 1 && (
                          <Tooltip title="Edit">
                            <img
                              onClick={() => upadteOpen(row)}
                              src={Edit}
                              alt="print"
                              style={{ width: '20px', marginRight: '2px' }}
                            />
                          </Tooltip>
                        )}
                        <Tooltip title="Print">
                          <img
                            onClick={() =>
                              navigation('/admin-panel/printContentmanul', {
                                state: {
                                  data: row,
                                },
                              })
                            }
                            src={Print}
                            alt="print"
                            style={{ width: '20px', marginRight: '2px' }}
                          />
                        </Tooltip>

                        {row.isActive ? (
                          <Tooltip title="Download">
                            <DownloadIcon
                              onClick={() => {
                                printreceipt(row);
                              }}
                            />
                          </Tooltip>
                        ) : (
                          <ClearIcon />
                        )}
                        {userrole === 1 && (
                          <Tooltip title="Delete">
                            <img
                              src={Delete}
                              style={{ width: '20px' }}
                              onClick={() => handleClickOpen3(row.id)}
                              alt="dd"
                            />
                          </Tooltip>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell> &nbsp;</TableCell>
                    <TableCell> &nbsp;</TableCell>
                    <TableCell> &nbsp;</TableCell>
                    <TableCell> &nbsp;</TableCell>
                    <TableCell> &nbsp;</TableCell>
                    <TableCell style={{ fontWeight: 700 }}>
                      {' '}
                      Total Amount
                    </TableCell>
                    <TableCell style={{ fontWeight: 700 }}>
                      <ManualTotal data={isData} />
                    </TableCell>
                    <TableCell> &nbsp;</TableCell>
                    <TableCell> &nbsp;</TableCell>
                    <TableCell> &nbsp;</TableCell>
                  </TableRow>
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
                  rowsPerPageOptions={[50, 100, 150]}
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

export default ManualReports;
