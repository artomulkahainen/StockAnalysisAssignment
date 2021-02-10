import React from 'react';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';

const Statistics = ({ dayObjects, data }) => {
  const validDays = () => {
    dayjs.extend(isBetween);

    const validData = data.filter(
      (row, index) =>
        index !== 0 &&
        dayjs(row[0], 'MM/DD/YYYY').isBetween(
          dayObjects[0] - 1,
          dayObjects[1] + 1
        )
    );

    console.log(validData);
  };

  return (
    <div>
      <button onClick={() => validDays()}>PAINA</button>
    </div>
  );
};

export default Statistics;
