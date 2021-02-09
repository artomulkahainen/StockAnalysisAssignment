import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import TableComponent from './components/TableComponent';
import Papa from 'papaparse';
import HeadlineComponent from './components/HeadlineComponent';
import PaginationComponent from './components/PaginationComponent';
import csvData from './data/csvData';

const App = () => {
  const [data, setData] = useState(null);
  const [rows, setRows] = useState(null);
  const [totalPages, setTotalPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const dataFetch = () => {
      const parse = Papa.parse(csvData, { delimiter: '', newline: '' });
      return parse.data;
    };

    setData(dataFetch);
  }, []);

  useEffect(() => {
    data && setRows(data.filter((row, index) => index < 11));
    data && setTotalPages(Math.ceil((data.length - 1) / 10));
  }, [data]);

  const changePage = (page) => {
    let rowsToPickupTo = page * 6;

    data && setCurrentPage(page);
    data &&
      setRows(
        data.filter(
          (row, index) =>
            index === 0 ||
            (index > rowsToPickupTo - 6 && index < rowsToPickupTo)
        )
      );
  };

  return (
    <Container>
      <HeadlineComponent title="STOCK ANALYSIS ASSIGNMENT" />
      <TableComponent data={rows} />
      {totalPages > 1 && (
        <PaginationComponent
          currentPage={currentPage}
          changePage={changePage}
          totalPages={totalPages}
        />
      )}
    </Container>
  );
};

export default App;
