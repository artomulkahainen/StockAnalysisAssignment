import React from 'react';
import Table from 'react-bootstrap/Table';
import SpinnerComponent from './SpinnerComponent';

const TableComponent = ({ data }) => {
  return data ? (
    <Table striped bordered hover>
      <thead>
        <tr>
          {data
            .filter((row, index) => index === 0)
            .map((row) =>
              row.map((headline, index) => <th key={index}>{headline}</th>)
            )}
        </tr>
      </thead>
      <tbody>
        {data
          .filter((row, index) => index !== 0)
          .map((row, index) => (
            <tr key={index}>
              {row.map((value, i) => (
                <td key={i}>
                  {value.replaceAll('/', ' / ').replaceAll('$', '$ ')}
                </td>
              ))}
            </tr>
          ))}
      </tbody>
    </Table>
  ) : (
    <SpinnerComponent />
  );
};

export default TableComponent;
