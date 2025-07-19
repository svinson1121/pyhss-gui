/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState} from 'react';
import {ContentHeader, RoamingRuleItem, RoamingRuleAddModal} from '@components';
import {RoamingRuleApi, RoamingNetworkApi} from "../services/pyhss"
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

const roamingRuleTemplate = {
  "roaming_rule_id": null,
  "roaming_network_id": null,
  "allow": true,
  "enabled": true
}

const RoamingRule = () => {
  const [items, setItems] = useState([]);
  const [openAdd, setOpenAdd] = useState(false);
  const [dialogData, setDialogData] = useState(roamingRuleTemplate);
  const [editMode, setEditMode] = useState(false);
  const [network, setNetwork] = useState([]);

  React.useEffect(() => {
    RoamingNetworkApi.getAll().then((data => {
      setNetwork(data.data);
      RoamingRuleApi.getAll().then((data => {
        setItems(data.data)
      }));
    }))
  }, []);

  const refresh = () => {
    RoamingRuleApi.getAll().then((data => {
      setItems(data.data)
    }));
  }

  const handleDelete = (id) => {
    RoamingRuleApi.delete(id).then((data) => {
      refresh();
    })
  }

  const handleAdd = () => {
    setEditMode(false);
    setOpenAdd(true);
  }
  const handleAddClose = () => {
    setDialogData(roamingRuleTemplate);
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
      <ContentHeader title="Roaming Rules" />
      <section className="content">
        <div className="container-fluid">
          <div className="card">
            <div className="card-body">
                <TableContainer component={Paper}>
                  <Table aria-label="collapsible table">
                    <TableHead>
                      <TableRow>
                        <TableCell>{i18n.t('inputFields.header.id')}</TableCell>
                        <TableCell>{i18n.t('generic.network')}</TableCell>
                        <TableCell>{i18n.t('generic.allowed')}</TableCell>
                        <TableCell>{i18n.t('generic.enabled')}</TableCell>
                        <TableCell/>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {items.map((row) => (
                        <RoamingRuleItem key={row.roaming_rule_id} row={row} deleteCallback={handleDelete} openEditCallback={openEdit} network={network} />
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
        <RoamingRuleAddModal open={openAdd} handleClose={handleAddClose}  data={dialogData} edit={editMode} />
      </section>
    </div>
  );
};

export default RoamingRule;
