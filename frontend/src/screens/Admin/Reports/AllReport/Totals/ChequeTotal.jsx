import React, { useEffect } from 'react';

function ChequeTotal({ data }) {
  let totalAmount = 0;
  if (data) {
    data &&
      data.map((item, inx) => {
        if (item?.electric_cheque_TOTAL_AMOUNT) {
          totalAmount =
            totalAmount + parseFloat(item?.electric_cheque_TOTAL_AMOUNT);
        }
      });
  }

  if (data) {
    data &&
      data.map((item, inx) => {
        if (item?.manual_cheque_TOTAL_AMOUNT) {
          totalAmount =
            totalAmount + parseFloat(item?.manual_cheque_TOTAL_AMOUNT);
        }
      });
  }

  return (
    <>
      <>{totalAmount}</>
    </>
  );
}

export default ChequeTotal;
