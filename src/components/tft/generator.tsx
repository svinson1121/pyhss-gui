import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';

import {SelectField, InputField} from '@components';
import i18n from '@app/utils/i18n';



const TftGenerator = (props: {
  onGenerate: Function
}) => {
  const { onGenerate } = props;

  const [action, setAction] = useState('');
  const [direction, setDirection] = useState('');
  const [protocol, setProtocol] = useState('');
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [selectedOption, setSelectedOption] = useState('');

  const generateFilter = () => {
    const filterRule = `${action}${direction ? ' ' + direction : ''} ${protocol} from ${source} to ${destination}`;
    onGenerate(filterRule); 
  };

  const clearGenerator = () => {
    setDestination('');
    setSource('');
    setDirection('');
    setProtocol('');
    setAction('');
  }

  return (
    <React.Fragment>
      <Box
        component="form"
        noValidate
        autoComplete="off"
      >
        <Grid container rowSpacing={1} spacing={1}>
          <Grid item xs={12}>&nbsp;</Grid>
          <Grid item xs={10}><h3>TFT Rule Generator</h3></Grid>
          <Grid item xs={2}>
            <Button onClick={clearGenerator}>Clear&nbsp; <i className="fas fa-broom"></i></Button>
            <Button onClick={generateFilter} variant="contained">Generate&nbsp;<i className="fas fa-arrow-up"></i></Button>
          </Grid>
          <Grid item xs={3}>
            <SelectField
              required
              value={action}
              onChange={(name, value) => setAction(value)}
              id="action"
              label="Action"
              helper=""
            >
              <MenuItem value="permit">permit</MenuItem>
              <MenuItem value="deny">deny</MenuItem>
            </SelectField> 
          </Grid>
          <Grid item xs={3}>
            <SelectField
              required
              value={direction}
              onChange={(name, value) => setDirection(value)}
              id="direction"
              label="Direction"
              helper=""
            >
              <MenuItem value="">any</MenuItem>
              <MenuItem value="in">in</MenuItem>
              <MenuItem value="out">out</MenuItem>
            </SelectField> 
          </Grid>
          <Grid item xs={3}>
            <SelectField
              required
              value={protocol}
              onChange={(name, value) => setProtocol(value)}
              id="protocol"
              label="Protocol"
              helper=""
            >
              <MenuItem value="ip">ip (any)</MenuItem>
              <MenuItem value="6">tcp</MenuItem>
              <MenuItem value="17">udp</MenuItem>
              <MenuItem value="1">icmp</MenuItem>
            </SelectField> 
          </Grid>
          <Grid item xs={5}>
            <InputField
              required
              label="Source"
              id="source"
              onChange={(name, value) => setSource(value)}
              value={source}
            >Source IP (CIDR or any)+(port or low-high port range)</InputField>
          </Grid>
          <Grid item xs={5}>
            <InputField
              required
              label="Destination"
              id="destination"
              onChange={(name, value) => setDestination(value)}
              value={destination}
            >Destination IP (CIDR or any)+(port or low-high port range)</InputField>
          </Grid>
        </Grid>
       </Box>
    </React.Fragment>
  );
}

export default TftGenerator;
