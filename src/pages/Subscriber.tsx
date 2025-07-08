/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import {ContentHeader, SubscriberItem, SubscriberAddModal} from '@components';
import {SubscriberApi} from "../services/pyhss";
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

const subscriberTemplate = {
  "imsi": "",
  "enabled": true,
  "auc_id": 0,
  "default_apn": 0,
  "apn_list": "",
  "msisdn": "",
  "ue_ambr_dl": 0,
  "ue_ambr_ul": 0,
  "nam": 0,
  "subscribed_rau_tau_timer": 600,
  "serving_mme": "",
  "serving_mme_realm": "",
  "serving_mme_peer": ""
}

const Subscriber = () => {
  const [dialogData, setDialogData] = React.useState(subscriberTemplate);
  const [openAdd, setOpenAdd] = React.useState(false);
  const [editMode, setEditMode] = React.useState(false);
  const [subscribers, setSubscribers] = React.useState([]);
  const [search, setSearch] = React.useState("");

  React.useEffect(() => {
    SubscriberApi.getAll().then((data => {
        setSubscribers(data.data)
    }))
  }, []);

  const onSearchHandler = event => {
   setSearch(event.target.value);
  };

  const refresh = () => {
    SubscriberApi.getAll().then((data => {
        setSubscribers(data.data)
    }))
  }

  const handleDelete = (id: number) => {
    SubscriberApi.delete(id).then((data) => {
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
    setDialogData(subscriberTemplate);
    refresh();
  }
  const openEdit = (row) => {
    setEditMode(true);
    setDialogData(row);
    setOpenAdd(true);
  }

  return (
    <div>
      <ContentHeader title="Subscribers" />
      <section className="content">
        <div className="container-fluid">
          <div className="card">
            <TextField id="search-field" label="Search" variant="outlined"  onChange={onSearchHandler} value={search} />
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
                        <TableCell>{i18n.t('inputFields.header.auc')}</TableCell>
                        <TableCell>{i18n.t('generic.enabled')}</TableCell>
                        <TableCell>{i18n.t('inputFields.header.roaming')}</TableCell>
                        <TableCell>{i18n.t('inputFields.header.msisdn')}</TableCell>
                        <TableCell>{i18n.t('inputFields.header.apnDefault')}</TableCell>
                        <TableCell>{i18n.t('inputFields.header.ambr_dl')}</TableCell>
                        <TableCell>{i18n.t('inputFields.header.ambr_ul')}</TableCell>
                        <TableCell>{i18n.t('inputFields.header.tuaTimer')}</TableCell>
                        <TableCell/>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {subscribers.filter(row => {
                          if (search === "") return row;
                          else if (row.imsi.includes(search)) return row; 
                          else if (row.msisdn.includes(search)) return row; 
                        }).map((row) => (
                        <SubscriberItem key={row.subscriber_id} row={row} deleteCallback={handleDelete} openEditCallback={openEdit}/>
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
        <SubscriberAddModal open={openAdd} handleClose={handleAddClose} data={dialogData} edit={editMode} />
      </section>
    </div>
  );
};

export default Subscriber;
