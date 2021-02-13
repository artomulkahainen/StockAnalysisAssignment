import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import ButtonComponent from '../components/ButtonComponent';
import Statistics from './Statistics';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';

const AnalyzeTools = ({ show, close, data }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [statisticsData, setStatisticsData] = useState(null);

  const createStatisticsData = () => {
    dayjs.extend(isBetween);
    setStatisticsData(null);

    // CONVERT STARTDATE AND ENDDATE INTO DAYJS OBJECTS
    let objects = [
      dayjs(startDate, 'MM/DD/YYYY'),
      dayjs(endDate, 'MM/DD/YYYY')
    ];

    // CHECK IF ANY OBJECT IS NAN
    objects.forEach((object) => {
      if (isNaN(object.$D)) {
        objects = null;
      }
    });

    // IF OBJECTS ARE VALID AND START DATE IS BEFORE END DATE,
    // FILTER DATA TO HAVE ONLY DAYS BETWEEN GIVEN START DATE AND END DATE
    objects &&
      objects[0].isBefore(objects[1]) &&
      setStatisticsData(
        data
          .filter(
            (row, index) =>
              index !== 0 &&
              dayjs(row[0], 'MM/DD/YYYY').isBetween(
                objects[0].subtract(1, 'day'),
                objects[1].add(1, 'day')
              )
          )
          .slice()
          .reverse()
      );
  };

  return (
    <Modal
      show={show}
      onHide={() => {
        setStatisticsData(null);
        setStartDate('');
        setEndDate('');
        close();
      }}
    >
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
        <ButtonComponent
          name="Calculate"
          click={createStatisticsData}
          disabled={statisticsData}
        />
        {statisticsData && <Statistics data={statisticsData} />}
      </Modal.Body>
    </Modal>
  );
};

export default AnalyzeTools;
