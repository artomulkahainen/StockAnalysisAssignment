import React from 'react';
import Modal from 'react-bootstrap/Modal';

const AnalyzeTools = ({ show, close, data }) => {
  return (
    <Modal show={show} onHide={close}>
      <Modal.Header closeButton>HELLUREI</Modal.Header>
      <Modal.Body>
        <p>Tääl mä oon</p>
      </Modal.Body>
    </Modal>
  );
};

export default AnalyzeTools;
