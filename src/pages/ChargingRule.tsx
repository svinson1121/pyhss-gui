/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState} from 'react';
import {ContentHeader, ChargingRuleItem, ChargingRuleAddItem} from '@components';
import {ChargingRuleApi} from "../services/pyhss"
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

const charging_ruleTemplate = {
  "rule_name": "",
  "qci": 0,
  "arp_priority": 0,
  "arp_preemption_capability": false,
  "arp_preemption_vulnerability": false,
  "mbr_dl": 0,
  "mbr_ul": 0,
  "gbr_dl": 0,
  "gbr_ul": 0,
  "tft_group_id": 0,
  "precedence": 0,
  "rating_group": 0
}

const ChargingRule = () => {
  const [items, setItems] = useState([]);
  const [openAdd, setOpenAdd] = useState(false);
  const [dialogData, setDialogData] = useState(charging_ruleTemplate);
  const [editMode, setEditMode] = useState(false);

  React.useEffect(() => {
    ChargingRuleApi.getAll().then((data => {
      setItems(data.data)
    }));
  }, []);

  const refresh = () => {
    ChargingRuleApi.getAll().then((data => {
      setItems(data.data)
    }));
  }

  const handleDelete = (id) => {
    ChargingRuleApi.delete(id).then((data) => {
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
    setDialogData(charging_ruleTemplate);
    refresh();
  }
  const openEdit = (row) => {
    setEditMode(true);
    setDialogData(row);
    setOpenAdd(true);
  }

  return (
    <div>
      <ContentHeader title="Charging Rules" />
      <section className="content">
        <div className="container-fluid">
          <div className="card">
            <div className="card-body">
                <TableContainer component={Paper}>
                  <Table aria-label="collapsible table">
                    <TableHead>
                      <TableRow>
                        <TableCell>{i18n.t('inputFields.header.name')}</TableCell>
                        <TableCell>{i18n.t('inputFields.header.id')}</TableCell>
                        <TableCell>{i18n.t('inputFields.header.qci')}</TableCell>
                        <TableCell>{i18n.t('inputFields.header.tftGroup')}</TableCell>
                        <TableCell>{i18n.t('inputFields.header.mbr_dl')}</TableCell>
                        <TableCell>{i18n.t('inputFields.header.mbr_ul')}</TableCell>
                        <TableCell>{i18n.t('inputFields.header.gbr_dl')}</TableCell>
                        <TableCell>{i18n.t('inputFields.header.gbr_ul')}</TableCell>
                        <TableCell>{i18n.t('inputFields.header.arpPriority')}</TableCell>
                        <TableCell>{i18n.t('inputFields.header.arpPreemptionCapability')}</TableCell>
                        <TableCell>{i18n.t('inputFields.header.arpPreemptionVulnerability')}</TableCell>
                        <TableCell>{i18n.t('inputFields.header.precedence')}</TableCell>
                        <TableCell>{i18n.t('inputFields.header.ratingGroup')}</TableCell>
                        <TableCell>{i18n.t('generic.lastModified')}</TableCell>
                        <TableCell/>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {items.map((row) => (
                        <ChargingRuleItem key={row.tft_id} row={row} deleteCallback={handleDelete} openEditCallback={openEdit} />
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
        <ChargingRuleAddItem open={openAdd} handleClose={handleAddClose} data={dialogData} edit={editMode} />
      </section>
    </div>
  );
};

export default ChargingRule;
