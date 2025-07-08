/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import {ContentHeader, ImsSubscriberItem, ImsSubscriberAddModal} from '@components';
import {ImsSubscriberApi} from "../services/pyhss";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import i18n from '@app/utils/i18n';

const imsSubscriberTemplate = {
  "msisdn": "",
  "msisdn_list": "",
  "imsi": "",
  "ifc_path": "default_ifc.xml",
  "sh_profile": "default_sh_user_data.xml",
  "pcscf": "",
  "pcscf_realm": "",
  "pcscf_peer": "",
  "scscf": "",
  "scscf_realm": "",
  "scscf_peer": ""
}

const IMSSubscriber = () => {
  const [dialogData, setDialogData] = React.useState(imsSubscriberTemplate);
  const [editMode, setEditMode] = React.useState(false);
  const [openAdd, setOpenAdd] = React.useState(false);
  const [subscribers, setSubscribers] = React.useState([]);
  const [search, setSearch] = React.useState("");

  React.useEffect(() => {
    ImsSubscriberApi.getAll().then((data => {
        setSubscribers(data.data)
    }))
  }, []);

  const onSearchHandler = event => {
   setSearch(event.target.value);
  };
  const refresh = () => {
    ImsSubscriberApi.getAll().then((data => {
        setSubscribers(data.data)
    }))
  }

  const handleDelete = (id) => {
    ImsSubscriberApi.delete(id).then((data) => {
      console.log(id, data);
      refresh();
    })
  }

  const handleAdd = () => {
    setEditMode(false);
    setOpenAdd(true);
  }
  const handleAddClose = () => {
    setOpenAdd(false);
    setDialogData(imsSubscriberTemplate)
    refresh();
  }
  const openEdit = (row) => {
    setEditMode(true);
    setDialogData(row);
    setOpenAdd(true);
  }

  return (
    <div>
      <ContentHeader title="IMS Subscribers" />
      <section className="content">
        <div className="container-fluid">
          <div className="card">
            <TextField id="search-field" label={i18n.t('generic.search')} variant="outlined"  onChange={onSearchHandler} value={search} />
          </div>
          <div className="card">
            <div className="card-body">
                <TableContainer component={Paper}>
                  <Table aria-label="collapsible table">
                    <TableHead>
                      <TableRow>
                        <TableCell/>
                        <TableCell>{i18n.t('inputFields.header.imsi')}</TableCell>
                        <TableCell/>
                        <TableCell>{i18n.t('inputFields.header.msisdn')}</TableCell>
                        <TableCell>{i18n.t('inputFields.header.ifc')}</TableCell>
                        <TableCell>{i18n.t('inputFields.header.sh')}</TableCell>
                        <TableCell>{i18n.t('generic.lastModified')}</TableCell>
                        <TableCell/>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {subscribers.filter(row => {
                          if (search === "") return row;
                          else if (row.imsi.includes(search)) return row;
                          else if (row.msisdn.includes(search)) return row;
                        }).map((row) => (
                        <ImsSubscriberItem key={row.ims_subscriber_id} row={row} deleteCallback={handleDelete} openEditCallback={openEdit} />
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
        <ImsSubscriberAddModal open={openAdd} handleClose={handleAddClose} data={dialogData} edit={editMode} />
      </section>
    </div>
  );
};

export default IMSSubscriber;
