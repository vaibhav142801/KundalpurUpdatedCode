import React, { useEffect } from 'react';

function ElecTotal({ data }) {
  let totalAmount = 0;
  if (data) {
    data &&
      data.map((item, inx) => {
        if (item?.electric_bank_TOTAL_AMOUNT) {
          totalAmount =
            totalAmount + parseFloat(item.electric_bank_TOTAL_AMOUNT);
        }

        if (item.manual_bank_TOTAL_AMOUNT) {
          totalAmount = totalAmount + parseFloat(item.manual_bank_TOTAL_AMOUNT);
        }
      });
  }

  return (
    <>
      <span>{totalAmount}</span>
    </>
  );
}

export default ElecTotal;
