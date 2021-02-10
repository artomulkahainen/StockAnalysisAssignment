import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import TableComponent from './components/TableComponent';
import Papa from 'papaparse';
import HeadlineComponent from './components/HeadlineComponent';
import PaginationComponent from './components/PaginationComponent';
import csvData from './data/csvData';
import AnalyzeTools from './containers/AnalyzeTools';
import ButtonComponent from './components/ButtonComponent';

const App = () => {
  const [data, setData] = useState(null);
  const [rows, setRows] = useState(null);
  const [totalPages, setTotalPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showAnalyzeTools, setShowAnalyzeTools] = useState(false);

  useEffect(() => {
    const dataFetch = () => {
      const parse = Papa.parse(csvData, { delimiter: '', newline: '' });
      return parse.data;
    };

    setData(dataFetch);
  }, []);

  useEffect(() => {
    // After the data fetch, show first ten rows (plus the headlines) and calculate the count of pages
    data && setRows(data.filter((row, index) => index < 11));
    data && setTotalPages(Math.ceil((data.length - 1) / 10));
  }, [data]);

  const changePage = (page) => {
    data && setCurrentPage(page);

    // Always take ten new values to show
    let rowsToPickupTo = page * 10;

    // Show new rows based on the current page. Always pick the first row, coz it contains the headlines
    data &&
      setRows(
        data.filter(
          (row, index) =>
            index === 0 ||
            (index > rowsToPickupTo - 10 && index <= rowsToPickupTo)
        )
      );
  };

  const toggleAnalyzeTools = () => {
    setShowAnalyzeTools(!showAnalyzeTools);
  };

  return (
    <Container>
      <HeadlineComponent title="STOCK ANALYSIS ASSIGNMENT" />
      <ButtonComponent click={toggleAnalyzeTools} name="Analyze Tools" />
      <TableComponent data={rows} />
      {totalPages > 1 && (
        <PaginationComponent
          currentPage={currentPage}
          changePage={changePage}
          totalPages={totalPages}
        />
      )}
      <AnalyzeTools
        show={showAnalyzeTools}
        close={toggleAnalyzeTools}
        data={data}
      />
    </Container>
  );
};

export default App;
