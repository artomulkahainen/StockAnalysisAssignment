import React, { useEffect, useState } from 'react';

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
    const bigVolumes = [];
    const bigStockChanges = [];

    // FIND BIGGEST VOLUMES
    data.forEach((row, index) => {
      if (index < 2) {
        console.log(parseInt(row[2]));
        bigVolumes.push(parseInt(row[2]));
      } else {
        bigVolumes.forEach((listElement, i) => {
          if (listElement < parseInt(row[2])) {
            bigVolumes.pop(i);
            bigVolumes.push(parseInt(row[2]));
          }
        });
      }
    });

    // FIND BIGGEST STOCK CHANGES
    data.forEach((row, index) => {
      const closePrice = parseFloat(row[1].slice(2));
      const openPrice = parseFloat(row[3].slice(2));

      if (index < 2) {
        bigStockChanges.push(
          closePrice < openPrice
            ? (1 - closePrice / openPrice).toFixed(3)
            : (1 - openPrice / closePrice).toFixed(3)
        );
      }
    });
  };

  return (
    <div>
      {longestBullishTrend && (
        <p>{`Longest bullish trend: ${longestBullishTrend} days in a row!`}</p>
      )}
    </div>
  );
};

export default Statistics;
