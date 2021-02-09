import React from 'react';
import Table from 'react-bootstrap/Table';
import SpinnerComponent from './SpinnerComponent';

const TableComponent = ({ data, currentPage }) => {
  return data ? (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>{data[0][0]}</th>
          <th>{data[0][1]}</th>
          <th>{data[0][2]}</th>
          <th>{data[0][3]}</th>
          <th>{data[0][4]}</th>
          <th>{data[0][5]}</th>
        </tr>
      </thead>
      <tbody>
        {data
          .filter((el, index) => index !== 0)
          .map((row, index) => (
            <tr key={index}>
              <td>{row[0].replaceAll('/', ' / ')}</td>
              <td>{row[1].replace('$', '$ ')}</td>
              <td>{row[2]}</td>
              <td>{row[3].replace('$', '$ ')}</td>
              <td>{row[4].replace('$', '$ ')}</td>
              <td>{row[5].replace('$', '$ ')}</td>
            </tr>
          ))}
      </tbody>
    </Table>
  ) : (
    <SpinnerComponent />
  );
};

export default TableComponent;
