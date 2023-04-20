import React, { useEffect } from 'react';

function Cashtotal({ data }) {
  let totalAmount = 0;
  if (data) {
    data &&
      data.map((item, inx) => {
        if (item.manual_cash_TOTAL_AMOUNT) {
          totalAmount = totalAmount + parseFloat(item.manual_cash_TOTAL_AMOUNT);
        }

        if (item.electric_cash_TOTAL_AMOUNT) {
          totalAmount =
            totalAmount + parseFloat(item.electric_cash_TOTAL_AMOUNT);
        }
      });
  }

  return (
    <>
      <>{totalAmount}</>
    </>
  );
}

export default Cashtotal;
