import React from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { Converter, hiIN } from 'any-number-to-words';

const ElectronicTotal = ({ data }) => {
  let totalAmount = 0;
  if (data) {
    data &&
      data.map((item, inx) => {
        if (item.isActive === true) {
          totalAmount =
            totalAmount +
            item.elecItemDetails.reduce(
              (n, { amount }) => Number(n) + parseFloat(amount),
              0,
            );
        }
      });
  }
  const converter = new Converter(hiIN);
  return (
    <>
      <span>{'₹' + Math.floor(totalAmount) + '/-'}</span>
    </>
  );
};

export default ElectronicTotal;
