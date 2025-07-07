import React from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import { DeleteDialog } from '@components';

const EirItem = (props: { row: ReturnType<typeof Object>, deleteCallback: ReturnType<typeof any>, openEditCallback: ReturnType<typeof any> }) => {
  const { row, deleteCallback, openEditCallback } = props;
  const regex_mode = ['exact matching','loose matching'];
  const match_response_code = ['Whitelist','Blacklist','Greylist'];

  return (
    <React.Fragment>
      <TableRow>
        <TableCell component="th" scope="row">
        </TableCell>
	<TableCell>{row.eir_id}</TableCell>
        <TableCell>{row.imei}</TableCell>
        <TableCell>{row.imsi}</TableCell>
        <TableCell>{regex_mode[row.regex_mode]}</TableCell>
	<TableCell>{match_response_code[row.match_response_code]}</TableCell>
        <TableCell>
          <Button onClick={() => openEditCallback(row)}><i className="fas fa-edit"></i></Button>
          <DeleteDialog id={row.tft_id} callback={deleteCallback}/>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default EirItem;
