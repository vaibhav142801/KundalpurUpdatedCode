// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { backendApiUrl } from '../../../../config/config';
import { serverInstance } from '../../../../API/ServerInstance';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import Swal from 'sweetalert2';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {
  CustomInput,
  CustomInputLabel,
  CustomTableInput,
} from '../../Donation/Donation/common';
import TotalAmountRow from '../../Donation/Donation/common/TotalAmountRow';
import TotalpayAmountRow from './TotalpayAmountRow';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { useNavigate } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';
import { ReactTransliterate } from 'react-transliterate';
import CircularProgress from '@material-ui/core/CircularProgress';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
const paymode = [
  {
    id: 1,
    type: 'online',
  },
  {
    id: 2,
    type: 'offline',
  },
];
const Addboli = ({
  handleClose,
  themeColor,
  updateData,
  showUpdateBtn,
  receiptNo,
  donationTypes,
}) => {
  const navigation = useNavigate();
  const { t, i18n } = useTranslation();
  const theme = createTheme({
    typography: {
      fontFamily: 'Poppins',
    },
    palette: {
      primary: {
        main: themeColor,
      },
    },
  });

  const custumstyle = {
    width: '100%',
    borderRadius: 6,
    position: 'relative',
    backgroundColor: '#fcfcfb',
    border: '1px solid #C8C6D3',
    fontSize: 14,
    padding: 9.5,
  };

  const custommStyleInputTable = {
    width: '100%',
    position: 'relative',

    border: '1px solid #C8C6D3',
    fontSize: 14,
    padding: 9.5,
  };
  const [role, setrole] = useState('');
  const [hindiremark, sethindiremark] = useState('');
  // const [donationTypes, setDonationTypes] = useState([]);
  // const [receiptNo, setReceiptNo] = useState('');
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [newMember, setNewMember] = useState(false);
  const [mobileNo, setMobileNo] = useState('');
  const [genderp, setgenderp] = useState('');
  const [genderp1, setgenderp1] = useState('');
  const [fetchuserdetail, setfetchuserdetail] = useState(true);
  const [showloader, setshowloader] = useState(false);
  const [donationItems, setDonationItems] = useState([
    {
      type: '',
      amount: '',
      payamount: '',
      remark: '',
      pmode: '',
    },
  ]);

  console.log('from cash ', donationItems, receiptNo);
  function addDonationItem() {
    setDonationItems([
      ...donationItems,
      {
        type: '',
        amount: '',
        payamount: '',
        remark: '',
        pmode: '',
      },
    ]);
  }
  function removeDonationItem(item) {
    setDonationItems(
      donationItems.filter((donationItem) => donationItem !== item),
    );
  }

  function handleDonationItemUpdate(originalDonationItem, key, value) {
    setDonationItems(
      donationItems.map((donationItem) =>
        donationItem === originalDonationItem
          ? {
              ...donationItem,
              [key]: value,
            }
          : donationItem,
      ),
    );
  }

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

  var date = today.toISOString().substring(0, 10);
  const [donationDate, setDonationDate] = useState(showUpdateBtn ? '' : date);

  const [donationTime, setDonationTime] = useState(
    showUpdateBtn
      ? ''
      : today.toLocaleTimeString('it-IT', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        }),
  );
  const getDonatedUserDetails = () => {
    serverInstance(`admin/getuser-by-num?mobile=${mobileNo}`, 'get').then(
      (res) => {
        if (res.status) {
          setFullName(res.data.name);
          setAddress(res.data.address);
          setgenderp(res.data.gender);
        }
      },
    );
  };

  if (showUpdateBtn) {
  } else {
    if (mobileNo.length === 10 && fetchuserdetail === true) {
      getDonatedUserDetails();
      setfetchuserdetail(false);
    }
  }

  const addCashDonation = async (e) => {
    setshowloader(true);
    axios.defaults.headers.post[
      'Authorization'
    ] = `Bearer ${sessionStorage.getItem('token')}`;
    axios.defaults.headers.put[
      'Authorization'
    ] = `Bearer ${sessionStorage.getItem('token')}`;
    e.preventDefault();
    if (showUpdateBtn) {
      if (fullName && donationItems[0].amount && donationItems[0].type) {
        const res = await axios.put(`${backendApiUrl}user/edit-cash-donation`, {
          id: updateData?.id,
          name: fullName,
          gender: newMember ? genderp1 : genderp,
          phoneNo: mobileNo,
          address: address,
          new_member: newMember,
          modeOfDonation: 2,
          donation_date: donationDate,
          donation_time: donationTime,
          donation_item: donationItems,
        });

        if (res.data.status === true) {
          handleClose();
          setshowloader(false);
        } else {
          Swal.fire('Error!', 'Somthing went wrong!!', 'error');
        }
      }
    } else {
      if (fullName && donationItems[0].amount && donationItems[0].type) {
        try {
        } catch (error) {}
        const res = await axios.post(`${backendApiUrl}user/add-elecDonation`, {
          name: fullName,
          gender: newMember ? genderp1 : genderp,
          phoneNo: mobileNo,
          address: address,
          new_member: newMember,
          modeOfDonation: 2,
          donation_date: donationDate,
          donation_time: donationTime,
          donation_item: donationItems,
        });

        let totalamount = donationItems?.amount
          ? donationItems?.amount
          : donationItems &&
            donationItems.reduce(
              (n, { amount }) => parseFloat(n) + parseFloat(amount),
              0,
            );

        if (res.data.status === true) {
          handleClose();
          setshowloader(false);
          navigation('/reciept', {
            state: {
              userdata: res.data.data.message.data,
            },
          });
          console.log(res.data.data.message.data.ReceiptNo);
          sendsms(totalamount, res.data.data.message.data.ReceiptNo);
        } else {
          Swal.fire('Error!', 'Somthing went wrong!!', 'error');
        }
      }
    }
  };

  const sendsms = async (totalamount, ReceiptNo) => {
    try {
      axios.defaults.headers.post[
        'Authorization'
      ] = `Bearer ${sessionStorage.getItem('token')}`;
      const res = await axios.post(`${backendApiUrl}user/sms`, {
        mobile: mobileNo,
        amount: totalamount,
        rno: ReceiptNo,
      });
    } catch (error) {}
  };

  const hasHindiCharacters = (str) => {
    return (
      str.split('').filter(function (char) {
        var charCode = char.charCodeAt();
        return charCode >= 2309 && charCode <= 2361;
      }).length > 0
    );
  };

  useEffect(() => {
    // getall_donatiions();
    if (updateData) {
      setAddress(updateData?.address);
      setFullName(updateData?.name);
      setMobileNo(updateData?.phoneNo);
      setDonationItems(updateData?.elecItemDetails);
      setDonationTime(updateData?.donation_time);
      var today = new Date(updateData?.donation_date);
      var date = today.toISOString().substring(0, 10);

      setDonationDate(date);
    }
    setrole(Number(sessionStorage.getItem('userrole')));
  }, []);

  return (
    <Box>
      <ThemeProvider theme={theme}>
        <form onSubmit={addCashDonation}>
          <Typography variant="h6" color={'primary'} align="center">
            {showUpdateBtn ? 'Update Boli' : 'Add Boli'}
          </Typography>
          <Typography variant="body2" color="primary" align="right">
            {currDate} / {currTime}
          </Typography>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              my: 2,
            }}
          >
            <Typography variant="body1">Change language:</Typography>

            <Button
              variant={newMember ? 'outlined' : 'contained'}
              sx={{
                borderColor: '#C8C8C8',
                fontSize: 12,
                minWidth: 100,
                padding: 0.5,
                color: newMember ? '#656565' : '#fff',
              }}
              onClick={() => setNewMember(false)}
            >
              Hindi
            </Button>
            <Button
              onClick={() => setNewMember(true)}
              variant={newMember ? 'contained' : 'outlined'}
              sx={{
                borderColor: '#C8C8C8',
                fontSize: 12,
                minWidth: 100,
                padding: 0.5,
                color: newMember ? '#fff' : '#656565',
              }}
            >
              English
            </Button>
          </Box>
          <Grid container rowSpacing={2} columnSpacing={5}>
            <Grid item xs={6} md={3}>
              <CustomInputLabel htmlFor="donation-date">Date</CustomInputLabel>
              <CustomInput
                disabled={role === 3 ? true : false}
                type="date"
                id="donation-date"
                value={donationDate}
                onChange={(event) => {
                  setDonationDate(
                    new Date(event.target.value).toISOString().substring(0, 10),
                  );
                }}
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <CustomInputLabel htmlFor="donation-time">Time</CustomInputLabel>
              <CustomInput
                disabled={role === 3 ? true : false}
                type="time"
                id="donation-time"
                value={donationTime}
                onChange={(event) => {
                  setDonationTime(event.target.value);
                }}
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <CustomInputLabel htmlFor="donation-date">
                Mobile No
              </CustomInputLabel>
              <CustomInput
                disabled={role === 3 ? true : false}
                type="text"
                id="donation-date"
                // value={donationDate}
                // onChange={(event) => {
                //   setDonationDate(
                //     new Date(event.target.value).toISOString().substring(0, 10),
                //   );
                // }}
                placeholder="Enter Mobile No"
              />
            </Grid>

            <Grid item xs={6} md={3}>
              <CustomInputLabel htmlFor="donation-date">Email</CustomInputLabel>
              <CustomInput
                disabled={role === 3 ? true : false}
                type="text"
                id="donation-date"
                // value={donationDate}
                // onChange={(event) => {
                //   setDonationDate(
                //     new Date(event.target.value).toISOString().substring(0, 10),
                //   );
                // }}
                placeholder="Enter Email"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              {!newMember ? (
                <>
                  Full Name
                  <ReactTransliterate
                    style={custumstyle}
                    id="full-name"
                    required
                    value={fullName}
                    onChangeText={(fullName) => {
                      setFullName(fullName);
                    }}
                    onChange={(e) => setFullName(e.target.value)}
                    lang="hi"
                    placeholder="Enter Address"
                  />
                </>
              ) : (
                <>
                  Full Name
                  <CustomInput
                    id="full-name"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter Address"
                  />
                </>
              )}
            </Grid>
            <Grid item xs={12} md={6}>
              {!newMember ? (
                <>
                  Address
                  <ReactTransliterate
                    style={custumstyle}
                    id="full-name"
                    required
                    value={fullName}
                    onChangeText={(fullName) => {
                      setFullName(fullName);
                    }}
                    onChange={(e) => setFullName(e.target.value)}
                    lang="hi"
                    placeholder="Enter Address"
                  />
                </>
              ) : (
                <>
                  Address
                  <CustomInput
                    id="full-name"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter Address"
                  />
                </>
              )}
            </Grid>

            <Grid item xs={12} md={6}>
              <CustomInputLabel required htmlFor="address">
                Boli Amount
              </CustomInputLabel>

              <CustomInput
                required
                disabled={true}
                id="address"
                value={
                  donationItems?.reduce(
                    (n, { amount }) => parseFloat(n) + parseFloat(amount),
                    0,
                  )
                    ? donationItems?.reduce(
                        (n, { amount }) => parseFloat(n) + parseFloat(amount),
                        0,
                      )
                    : '0'
                }
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter Initail Amount"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <CustomInputLabel required htmlFor="address">
                Pending Amount
              </CustomInputLabel>

              <CustomInput
                required
                id="address"
                value={
                  donationItems?.reduce(
                    (n, { amount }) => parseFloat(n) + parseFloat(amount),
                    0,
                  )
                    ? donationItems?.reduce(
                        (n, { amount }) => parseFloat(n) + parseFloat(amount),
                        0,
                      ) -
                      donationItems?.reduce(
                        (n, { payamount }) =>
                          parseFloat(n) + parseFloat(payamount),
                        0,
                      )
                    : '0'
                }
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter Pending Amount"
              />
            </Grid>
          </Grid>
          <TableContainer
            sx={{
              mt: 4,
            }}
          >
            <Table
              stickyHeader
              sx={{
                border: '1px solid #C4C4C4',
                '& th': {
                  padding: 0,
                  fontSize: 14,
                  fontWeight: 500,
                  backgroundColor: '#E4E3E3',
                  color: '#05313C',
                  outline: '1px solid #C4C4C4',
                },
                '& td': {
                  padding: 0,
                  fontSize: 14,
                },
              }}
              aria-label="customized table"
            >
              <TableHead>
                <TableRow>
                  <TableCell style={{ width: '20%' }}>
                    <Box
                      sx={{
                        paddingInline: '10px',
                        minWidth: 200,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      Boli Head*
                      <IconButton aria-label="add" size="small">
                        <AddBoxIcon color="primary" onClick={addDonationItem} />
                      </IconButton>
                    </Box>
                  </TableCell>
                  <TableCell align="center">Boli Amount*</TableCell>
                  <TableCell align="center">Pay Amount*</TableCell>
                  <TableCell align="center">Payment Date</TableCell>
                  <TableCell style={{ width: '10%' }} align="center">
                    Pay Mode
                  </TableCell>
                  {donationItems[0]?.pmode === 'online' && (
                    <>
                      <TableCell align="center">Bank Name</TableCell>
                      <TableCell align="center">Transaction Id</TableCell>
                    </>
                  )}

                  <TableCell align="center">Mark Paid</TableCell>
                  <TableCell align="center">Remark</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {donationItems.map((item, idx) => (
                  <TableRow key={idx}>
                    <TableCell
                      style={{
                        paddingInline: 8,
                      }}
                    >
                      <Select
                        required
                        sx={{
                          width: '100%',
                          fontSize: 14,
                          '& .MuiSelect-select': {
                            padding: '1px',
                          },
                        }}
                        value={item.type}
                        onChange={(e) =>
                          handleDonationItemUpdate(item, 'type', e.target.value)
                        }
                        displayEmpty
                      >
                        <MenuItem
                          sx={{
                            fontSize: 14,
                          }}
                          value={''}
                        >
                          Please select
                        </MenuItem>
                        {donationTypes &&
                          donationTypes.map((item, idx) => {
                            return (
                              <MenuItem
                                sx={{
                                  fontSize: 14,
                                }}
                                key={item.id}
                                value={item.type_hi}
                              >
                                {item.type_hi}
                              </MenuItem>
                            );
                          })}
                      </Select>
                    </TableCell>

                    <TableCell align="center">
                      <CustomTableInput
                        required
                        type="number"
                        value={item.amount}
                        onChange={(e) =>
                          handleDonationItemUpdate(
                            item,
                            'amount',
                            e.target.value,
                          )
                        }
                      />
                    </TableCell>
                    <TableCell align="center">
                      <CustomTableInput
                        required
                        type="number"
                        value={item.payamount}
                        onChange={(e) =>
                          handleDonationItemUpdate(
                            item,
                            'payamount',
                            e.target.value,
                          )
                        }
                      />
                    </TableCell>
                    <TableCell align="center">
                      <CustomTableInput
                        required
                        type="date"
                        value={item.amount}
                        onChange={(e) =>
                          handleDonationItemUpdate(
                            item,
                            'amount',
                            e.target.value,
                          )
                        }
                      />
                    </TableCell>
                    <TableCell
                      style={{
                        paddingInline: 8,
                      }}
                    >
                      <Select
                        required
                        sx={{
                          width: '100%',
                          fontSize: 14,
                          '& .MuiSelect-select': {
                            padding: '1px',
                          },
                        }}
                        value={item.pmode}
                        onChange={(e) =>
                          handleDonationItemUpdate(
                            item,
                            'pmode',
                            e.target.value,
                          )
                        }
                        displayEmpty
                      >
                        <MenuItem
                          sx={{
                            fontSize: 14,
                          }}
                          value={''}
                        >
                          Please select
                        </MenuItem>
                        {paymode &&
                          paymode.map((item, idx) => {
                            return (
                              <MenuItem
                                sx={{
                                  fontSize: 14,
                                }}
                                key={item.id}
                                value={item.type}
                              >
                                {item.type}
                              </MenuItem>
                            );
                          })}
                      </Select>
                    </TableCell>
                    {donationItems[0]?.pmode === 'online' && (
                      <>
                        <TableCell align="center">
                          <CustomTableInput
                            required
                            type="number"
                            value={item.amount}
                            onChange={(e) =>
                              handleDonationItemUpdate(
                                item,
                                'amount',
                                e.target.value,
                              )
                            }
                          />
                        </TableCell>
                        <TableCell align="center">
                          <CustomTableInput
                            required
                            type="number"
                            value={item.amount}
                            onChange={(e) =>
                              handleDonationItemUpdate(
                                item,
                                'amount',
                                e.target.value,
                              )
                            }
                          />
                        </TableCell>
                      </>
                    )}
                    <TableCell align="center">
                      <input
                        required
                        type="checkbox"
                        value={item.amount}
                        onChange={(e) =>
                          handleDonationItemUpdate(
                            item,
                            'amount',
                            e.target.value,
                          )
                        }
                      />
                    </TableCell>
                    <TableCell align="center">
                      {!newMember ? (
                        <>
                          {showUpdateBtn ? (
                            <>
                              <div
                                className="centerMain_remove_item"
                                style={{ width: '35%' }}
                              >
                                <ReactTransliterate
                                  style={custommStyleInputTable}
                                  value={item.remark}
                                  onChangeText={(item) => {
                                    handleDonationItemUpdate(
                                      item,
                                      'remark',
                                      e.target.value,
                                    );
                                  }}
                                  onChange={(e) =>
                                    handleDonationItemUpdate(
                                      item,
                                      'remark',
                                      e.target.value,
                                    )
                                  }
                                  lang="hi"
                                />
                                <div className="centerMain_remove_item_overLay">
                                  {idx > 0 && (
                                    <IconButton
                                      sx={{
                                        padding: '4px',
                                      }}
                                      onClick={() => removeDonationItem(item)}
                                    >
                                      <RemoveCircleOutlineIcon
                                        color="primary"
                                        fontSize="small"
                                      />
                                    </IconButton>
                                  )}
                                </div>
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="centerMain_remove_item">
                                <ReactTransliterate
                                  style={custommStyleInputTable}
                                  value={item.remark}
                                  onChangeText={(hindiremark) => {
                                    sethindiremark(hindiremark);
                                  }}
                                  onChange={(e) =>
                                    handleDonationItemUpdate(
                                      item,
                                      'remark',
                                      e.target.value,
                                    )
                                  }
                                  lang="hi"
                                />
                                <div className="centerMain_remove_item_overLay">
                                  {idx > 0 && (
                                    <IconButton
                                      sx={{
                                        padding: '4px',
                                      }}
                                      onClick={() => removeDonationItem(item)}
                                    >
                                      <RemoveCircleOutlineIcon
                                        color="primary"
                                        fontSize="small"
                                      />
                                    </IconButton>
                                  )}
                                </div>
                              </div>
                            </>
                          )}
                        </>
                      ) : (
                        <>
                          <CustomTableInput
                            value={item.remark}
                            onChange={(e) =>
                              handleDonationItemUpdate(
                                item,
                                'remark',
                                e.target.value,
                              )
                            }
                            endAdornment={
                              idx > 0 && (
                                <InputAdornment position="start">
                                  <IconButton
                                    sx={{
                                      padding: '4px',
                                    }}
                                    onClick={() => removeDonationItem(item)}
                                  >
                                    <RemoveCircleOutlineIcon
                                      color="primary"
                                      fontSize="small"
                                    />
                                  </IconButton>
                                </InputAdornment>
                              )
                            }
                          />
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                ))}

                <TotalAmountRow donationItems={donationItems} />
              </TableBody>
            </Table>
          </TableContainer>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              gap: 3,
              mt: 2,
            }}
          >
            {showUpdateBtn ? (
              <Button
                sx={{
                  textTransform: 'none',
                  paddingX: 5,
                  boxShadow: 'none',
                }}
                variant="contained"
                type="submit"
              >
                {showloader ? (
                  <CircularProgress
                    style={{
                      width: '21px',
                      height: '21px',
                      color: 'white',
                    }}
                  />
                ) : (
                  'Update'
                )}
              </Button>
            ) : (
              <Button
                sx={{
                  textTransform: 'none',
                  paddingX: 5,
                  boxShadow: 'none',
                }}
                variant="contained"
                type="submit"
              >
                {showloader ? (
                  <CircularProgress
                    style={{
                      width: '21px',
                      height: '21px',
                      color: 'white',
                    }}
                  />
                ) : (
                  'Save'
                )}
              </Button>
            )}

            <Button
              sx={{
                textTransform: 'none',
                paddingX: 5,
              }}
              variant="contained"
              color="error"
              onClick={handleClose}
              type="button"
            >
              Cancel
            </Button>
          </Box>
        </form>
      </ThemeProvider>
    </Box>
  );
};
export default Addboli;
