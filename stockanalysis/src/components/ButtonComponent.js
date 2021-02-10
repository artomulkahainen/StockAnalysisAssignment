import React from 'react';
import Button from 'react-bootstrap/Button';

const ButtonComponent = ({ name, click }) => (
  <div
    style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 10 }}
  >
    <Button variant="info" onClick={click}>
      {name}
    </Button>
  </div>
);

export default ButtonComponent;
