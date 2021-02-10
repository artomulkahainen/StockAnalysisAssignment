import React from 'react';
import Pagination from 'react-bootstrap/Pagination';

const PaginationComponent = ({ currentPage, changePage, totalPages }) => (
  <div style={{ display: 'flex', justifyContent: 'center' }}>
    <Pagination>
      <Pagination.First
        onClick={() => changePage(1)}
        disabled={currentPage === 1}
      />
      <Pagination.Prev
        onClick={() => changePage(currentPage - 1)}
        disabled={currentPage === 1}
      />
      {currentPage > 3 && <Pagination.Ellipsis disabled />}

      {currentPage > 2 && (
        <Pagination.Item onClick={() => changePage(currentPage - 2)}>
          {currentPage - 2}
        </Pagination.Item>
      )}
      {currentPage > 1 && (
        <Pagination.Item onClick={() => changePage(currentPage - 1)}>
          {currentPage - 1}
        </Pagination.Item>
      )}
      <Pagination.Item active>{currentPage}</Pagination.Item>
      {currentPage < totalPages && (
        <Pagination.Item onClick={() => changePage(currentPage + 1)}>
          {currentPage + 1}
        </Pagination.Item>
      )}
      {currentPage < totalPages - 1 && (
        <Pagination.Item onClick={() => changePage(currentPage + 2)}>
          {currentPage + 2}
        </Pagination.Item>
      )}

      {currentPage < totalPages - 2 && <Pagination.Ellipsis disabled />}
      <Pagination.Next
        disabled={currentPage === totalPages}
        onClick={() => changePage(currentPage + 1)}
      />
      <Pagination.Last
        disabled={currentPage === totalPages}
        onClick={() => changePage(totalPages)}
      />
    </Pagination>
  </div>
);

export default PaginationComponent;
