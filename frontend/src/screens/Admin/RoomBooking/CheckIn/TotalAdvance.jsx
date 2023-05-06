import React from 'react';

function TotalAdvance({ data }) {
  let totalAmount = 0;
  if (data) {
    data &&
      data.map((item, inx) => {
        totalAmount = totalAmount + parseInt(item?.advanceAmount);
      });
  }

  return (
    <>
      <span>{'₹' + totalAmount}</span>
    </>
  );
}

export default TotalAdvance;
