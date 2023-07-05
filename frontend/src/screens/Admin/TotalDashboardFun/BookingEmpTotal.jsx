import React from 'react';

function BookingEmpTotal({ data }) {
  console.log('book calculate total', data);

  let totalAmount = 0;
  if (data) {
    data &&
      data.map((item, inx) => {
        if (item?.online) {
          totalAmount = totalAmount + parseFloat(item?.online);
        }

        if (item?.cash) {
          totalAmount = totalAmount + parseFloat(item?.cash);
        }
      });
  }

  return (
    <>
      <span>₹{totalAmount}</span>
    </>
  );
}

export default BookingEmpTotal;
