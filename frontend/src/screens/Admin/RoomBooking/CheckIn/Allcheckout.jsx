import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { backendApiUrl } from '../../../../config/config';
import { useNavigate } from 'react-router-dom';
import './Allcheckout.css';
function Allcheckout({ data, bookingid }) {
  const navigation = useNavigate();
  const [isdata, setisData] = useState('');
  useEffect(() => {
    let particularData = data?.filter((item) => {
      return item?.booking_id === bookingid;
    });
    setisData(particularData);

    console.log(bookingid, data);
  }, []);

  const handlesubmit = async () => {
    navigation('/admin-panel/AllChoutRecript', {
      state: {
        checkoutdata: isdata,
      },
    });
    // try {
    //   axios.defaults.headers.post[
    //     'Authorization'
    //   ] = `Bearer ${sessionStorage.getItem('token')}`;

    //   const res = await axios.post(`${backendApiUrl}room/checkOut`, {
    //     id: isdata[0]?.booking_id,
    //     checkoutDate: new Date(),
    //     // advanceAmount: data?.advanceAmount,
    //   });

    //   console.log('rework', res?.data?.data?.status);

    //   if (res.data.data.message) {
    //     navigation('/admin-panel/AllChoutRecript', {
    //       state: {
    //         checkoutdata: isdata,
    //       },
    //     });
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
  };
  return (
    <>
      <div
      // style={{
      //   display: 'flex',
      //   justifyContent: 'center',
      //   alignItems: 'center',
      // }}
      >
        <p>
          Dharamshala Name :- &nbsp;<spna>{data[0]?.dharmasala?.name}</spna>
        </p>
        <p>Room List</p>
        {isdata &&
          isdata.map((item) => {
            return <p>{item?.RoomNo},</p>;
          })}
      </div>
      <button
        style={{
          width: '5rem',
        }}
        className="chaneRoom"
        onClick={() => handlesubmit()}
      >
        Checkout
      </button>
    </>
  );
}

export default Allcheckout;
