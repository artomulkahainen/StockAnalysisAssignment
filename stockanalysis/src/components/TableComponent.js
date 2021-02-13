import React from 'react';
import Table from 'react-bootstrap/Table';
import SpinnerComponent from './SpinnerComponent';

const TableComponent = ({ data, size }) => {
  return data ? (
    <Table striped bordered hover size={size}>
      <thead>
        <tr>
          {data
            .filter((_, index) => index === 0)
            .map((row) =>
              row.map((headline, index) => <th key={index}>{headline}</th>)
            )}
        </tr>
      </thead>
      <tbody>
        {data
          .filter((_, index) => index !== 0)
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
