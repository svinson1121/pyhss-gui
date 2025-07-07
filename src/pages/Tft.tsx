/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState} from 'react';
import {ContentHeader, TftItem, TftAddItem} from '@components';
import {TftApi} from "../services/pyhss"
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import i18n from '@app/utils/i18n';

const tftTemplate = {
  "tft_group_id": 1,
  "tft_string": "",
  "direction": 0
}

const Tft = () => {
  const [items, setItems] = useState([]);
  const [openAdd, setOpenAdd] = useState(false);
  const [dialogData, setDialogData] = useState(tftTemplate);
  const [editMode, setEditMode] = useState(false);

  React.useEffect(() => {
    TftApi.getAll().then((data => {
      setItems(data.data)
    }));
  }, []);

  const refresh = () => {
    TftApi.getAll().then((data => {
      setItems(data.data)
    }));
  }

  const handleDelete = (id) => {
    TftApi.delete(id).then((data) => {
      console.log(id, data);
      refresh();
    })
  }

  const handleAdd = () => {
    setOpenAdd(true);
  }
  const handleAddClose = () => {
    setOpenAdd(false);
    refresh();
  }
  const openEdit = (row) => {
    setEditMode(true);
    setDialogData(row);
    setOpenAdd(true);
  }

  return (
    <div>
      <ContentHeader title="Traffic Flow Template" />
      <section className="content">
        <div className="container-fluid">
          <div className="card">
            <div className="card-body">
                <TableContainer component={Paper}>
                  <Table aria-label="collapsible table">
                    <TableHead>
                      <TableRow>
                        <TableCell>{i18n.t('inputFields.header.tftGroup')}</TableCell>
                        <TableCell>{i18n.t('inputFields.header.rule')}</TableCell>
                        <TableCell>{i18n.t('inputFields.header.direction')}</TableCell>
                        <TableCell>{i18n.t('generic.lastModified')}</TableCell>
                        <TableCell/>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {items.map((row) => (
                        <TftItem key={row.tft_id} row={row} deleteCallback={handleDelete} openEditCallback={openEdit} />
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
            </div>
          </div>
        </div>
        <SpeedDial
          ariaLabel="Add"
          sx={{ position: 'absolute', bottom: 80, right: 16 }}
          icon={<SpeedDialIcon />}
          onClick={() => handleAdd()}
          open={openAdd}
        />
        <TftAddItem open={openAdd} handleClose={handleAddClose}  data={dialogData} edit={editMode} />
      </section>
    </div>
  );
};

export default Tft;
