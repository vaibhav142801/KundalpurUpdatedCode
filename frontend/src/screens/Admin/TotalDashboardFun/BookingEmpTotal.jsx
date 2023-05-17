import React from 'react';

function BookingEmpTotal({ data }) {
  console.log('book calculate total', data);

  let totalAmount = 0;
  if (data) {
    data &&
      data.map((item, inx) => {
        if (item?.bank) {
          totalAmount = totalAmount + parseFloat(item?.bank);
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
