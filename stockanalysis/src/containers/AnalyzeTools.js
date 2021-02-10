import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import ButtonComponent from '../components/ButtonComponent';
import Statistics from '../components/Statistics';
import dayjs from 'dayjs';

const AnalyzeTools = ({ show, close, data }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [dayObjects, setDayObjects] = useState([]);
  const [statisticsData, setStatisticsData] = useState([]);

  /*const createDayObjectsFromData = () => {
    return setStatisticsData(
      data
        .filter((row, index) => index === 1)
        .map((row) => dayjs(row[0], 'MM/DD/YYYY'))
        .filter(
          (date) => date.isBefore(dayObjects[1]) && date.isAfter(dayObjects[0])
        )
    );
  };*/

  const createDayObjects = () => {
    dayObjects.length > 0 && setDayObjects([]);

    let objects = [
      dayjs(startDate, 'MM/DD/YYYY'),
      dayjs(endDate, 'MM/DD/YYYY')
    ];

    objects.forEach((object) => {
      if (isNaN(object.$D)) {
        objects = [];
      }
    });

    objects.length > 0 &&
      objects[0].isBefore(objects[1]) &&
      setDayObjects(objects);
  };

  return (
    <Modal show={show} onHide={close}>
      <Modal.Header closeButton>Analyze Tools</Modal.Header>
      <Modal.Body>
        <p>Insert start and end date to get deeper statistics</p>
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text>Start date and end date</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            placeholder="MM/DD/YYYY"
            onChange={(event) => setStartDate(event.target.value)}
          />
          <FormControl
            placeholder="MM/DD/YYYY"
            onChange={(event) => setEndDate(event.target.value)}
          />
        </InputGroup>
        <ButtonComponent name="Calculate" click={createDayObjects} />
        {dayObjects.length > 0 && (
          <Statistics dayObjects={dayObjects} data={data} />
        )}
      </Modal.Body>
    </Modal>
  );
};

export default AnalyzeTools;
