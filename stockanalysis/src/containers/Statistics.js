import React, { useEffect, useState } from 'react';

const Statistics = ({ data }) => {
  const [longestBullishTrend, setLongestBullishTrend] = useState(null);

  useEffect(() => {
    bullishTrend();
  }, [data]);

  const bullishTrend = () => {
    let longest = 0;
    let currentLongest = 0;
    let previousRow = null;

    data
      .slice()
      .reverse()
      .forEach((row, index) => {
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

  return (
    <div>
      {longestBullishTrend && (
        <p>{`Longest bullish trend: ${longestBullishTrend} days in a row!`}</p>
      )}
    </div>
  );
};

export default Statistics;
