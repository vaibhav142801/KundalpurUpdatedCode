import React, { useEffect } from 'react';

function AllTotal({ data }) {
  let totalAmount = 0;
  if (data) {
    data &&
      data.map((item, inx) => {
        if (item?.manual_cash_TOTAL_AMOUNT) {
          totalAmount =
            totalAmount + parseFloat(item?.manual_cash_TOTAL_AMOUNT);
        }

        if (item?.electric_cash_TOTAL_AMOUNT) {
          totalAmount =
            totalAmount + parseFloat(item?.electric_cash_TOTAL_AMOUNT);
        }

        if (item?.electric_cheque_TOTAL_AMOUNT) {
          totalAmount =
            totalAmount + parseFloat(item?.electric_cheque_TOTAL_AMOUNT);
        }

        if (item?.manual_cheque_TOTAL_AMOUNT) {
          totalAmount =
            totalAmount + parseFloat(item?.manual_cheque_TOTAL_AMOUNT);
        }

        if (item?.electric_bank_TOTAL_AMOUNT) {
          totalAmount =
            totalAmount + parseFloat(item?.electric_bank_TOTAL_AMOUNT);
        }

        if (item?.manual_bank_TOTAL_AMOUNT) {
          totalAmount =
            totalAmount + parseFloat(item?.manual_bank_TOTAL_AMOUNT);
        }

        if (item?.manual_item_TOTAL_AMOUNT) {
          totalAmount =
            totalAmount + parseFloat(item?.manual_item_TOTAL_AMOUNT);
        }

        if (item?.electric_item_TOTAL_AMOUNT) {
          totalAmount =
            totalAmount + parseFloat(item?.electric_item_TOTAL_AMOUNT);
        }

        if (item?.cheque) {
          totalAmount = totalAmount + parseFloat(item?.cheque);
        }

        if (item?.online) {
          totalAmount = totalAmount + parseFloat(item?.online);
        }
      });
  }

  return (
    <>
      <>{totalAmount}</>
    </>
  );
}

export default AllTotal;
