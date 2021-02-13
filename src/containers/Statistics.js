import React, { useEffect, useState } from 'react';
import TableComponent from '../components/TableComponent';

const Statistics = ({ data }) => {
  const [longestBullishTrend, setLongestBullishTrend] = useState(null);
  const [biggestVolumesStockChanges, setBiggestVolumesStockChanges] = useState(
    null
  );

  useEffect(() => {
    calculateBullishTrend();
    calculateBiggestVolumesAndStockChanges();
  }, [data]);

  const calculateBullishTrend = () => {
    let longest = 0;
    let currentLongest = 0;
    let previousRow = null;

    data.forEach((row, index) => {
      // ALWAYS ASSIGN FIRST ROW TO VARIABLES
      if (index === 0) {
        previousRow = parseFloat(row[1].slice(2));
        return;
      }

      if (parseFloat(row[1].slice(2)) > previousRow) {
        currentLongest++;
      } else {
        if (longest < currentLongest) {
          longest = currentLongest;
        }
        currentLongest = 0;
      }

      previousRow = parseFloat(row[1].slice(2));
    });

    setLongestBullishTrend(longest);
  };

  const calculateBiggestVolumesAndStockChanges = () => {
    let biggestVolumeRow = null;
    let biggestVolumeRowsStockChange = null;
    let biggestStockChangeRow = null;
    let biggestStockChange = null;

    // FIND BIGGEST VOLUME AND BIGGEST STOCK CHANGE
    data.forEach((row, index) => {
      const closePrice = parseFloat(row[1].slice(2));
      const openPrice = parseFloat(row[3].slice(2));

      // ALWAYS ASSIGN FIRST ROW TO VARIABLES
      if (index === 0) {
        biggestStockChangeRow = row;
        biggestVolumeRow = row;
        biggestStockChange =
          closePrice < openPrice
            ? (1 - closePrice / openPrice).toFixed(3)
            : (1 - openPrice / closePrice).toFixed(3);
        biggestVolumeRowsStockChange = biggestStockChange;
      } else {
        // IF CURRENT ROW HAS BIGGER VOLUME THAN THE CURRENT BIGGEST VOLUME
        // ASSIGN IT AS BIGGEST VOLUME ROW
        if (parseInt(biggestVolumeRow[2]) < parseInt(row[2]))
          biggestVolumeRow = row;

        const currentRowStockChange =
          closePrice < openPrice
            ? (1 - closePrice / openPrice).toFixed(3)
            : (1 - openPrice / closePrice).toFixed(3);

        // ALSO ASSIGN THE BIGGEST VOLUME'S STOCK CHANGE TO VARIABLE
        // FOR SORTING THE ARRAY LATER
        biggestVolumeRowsStockChange = currentRowStockChange;

        if (biggestStockChange < currentRowStockChange) {
          biggestStockChange = currentRowStockChange;
          biggestStockChangeRow = row;
        }
      }
    });

    // CREATE ARRAY FOR CHOSEN ROWS AND SORT THEM BY TRADING VOLUME
    // IF TRADING VOLUMES ARE EVEN, SORT THEM BY STOCK CHANGE PERCENTAGE
    const rowsArray = [biggestVolumeRow, biggestStockChangeRow].sort((a, b) =>
      parseInt(a[2]) < parseInt(b[2])
        ? true
        : parseInt(a[2]) > parseInt(b[2])
        ? false
        : biggestVolumeRowsStockChange < biggestStockChange
    );

    rowsArray.unshift(['Date', 'Close/Last', 'Volume', 'Open', 'High', 'Low']);

    setBiggestVolumesStockChanges(rowsArray);
  };

  return (
    <div>
      {longestBullishTrend && (
        <p>{`Longest bullish trend: ${longestBullishTrend} days in a row!`}</p>
      )}
      <p>Biggest volumes and stock changes on these days:</p>
      <TableComponent size="sm" data={biggestVolumesStockChanges} />
    </div>
  );
};

export default Statistics;
