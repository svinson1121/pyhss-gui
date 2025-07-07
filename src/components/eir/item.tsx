import React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import i18n from '@app/utils/i18n';
import {DeleteDialog, NetworkBandwidthFormatter} from "@components";

const EirItem = (props: { row: ReturnType<typeof Object>, deleteCallback: ReturnType<typeof any>, openEditCallback: ReturnType<typeof any> }) => {
  const { row, deleteCallback, openEditCallback } = props;
  const [open, setOpen] = React.useState(false);


  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.apn_id}
        </TableCell>
        <TableCell component="th" scope="row">
          {row.apn}
        </TableCell>
        <TableCell>{row.nbiot?'Yes':'No'}</TableCell>
        <TableCell>
          <Button onClick={() => openEditCallback(row)}><i className="fas fa-edit"></i></Button>
          <DeleteDialog id={row.apn_id} callback={deleteCallback} />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                {i18n.t('generic.details')} 
              </Typography>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>{i18n.t('inputFields.header.ambr_dl')}</TableCell>
                    <TableCell>{i18n.t('inputFields.header.ambr_ul')}</TableCell>
                    <TableCell>{i18n.t('inputFields.header.chargingCharacteristics')}</TableCell>
                    <TableCell>{i18n.t('inputFields.header.arpPriority')}</TableCell>
                    <TableCell>{i18n.t('inputFields.header.arpPreemptionVulnerability')}</TableCell>
                    <TableCell>{i18n.t('inputFields.header.arpPreemptionCapability')}</TableCell>
                    <TableCell>{i18n.t('generic.lastModified')}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow key="arp_preemption_capability">
                      <TableCell><NetworkBandwidthFormatter data={row.apn_ambr_dl} /></TableCell>
                      <TableCell><NetworkBandwidthFormatter data={row.apn_ambr_ul} /></TableCell>
                      <TableCell>{row.charging_characteristics}</TableCell>
                      <TableCell>{row.arp_priority}</TableCell>
                      <TableCell>{(row.arp_preemption_vulnerability?i18n.t('generic.yes'):i18n.t('generic.no'))}</TableCell>
                      <TableCell>{(row.arp_preemption_capability?i18n.t('generic.yes'):i18n.t('generic.no'))}</TableCell>
                      <TableCell>{row.last_modified}</TableCell>
                    </TableRow>
                </TableBody>
              </Table>
            </Box>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                {i18n.t('apn.chargingRulesHead')} 
              </Typography>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>{i18n.t('inputFields.header.name')}</TableCell>
                    <TableCell>{i18n.t('inputFields.header.qci')}</TableCell>
                    <TableCell>MBR/GBR DL</TableCell>
                    <TableCell>MBR/GBR UL</TableCell>
                    <TableCell>{i18n.t('inputFields.header.precedence')}</TableCell>
                    <TableCell>{i18n.t('inputFields.header.arpPriority')}</TableCell>
                    <TableCell>{i18n.t('inputFields.header.arpPreemptionVulnerability')}</TableCell>
                    <TableCell>{i18n.t('inputFields.header.arpPreemptionCapability')}</TableCell>
                    <TableCell>{i18n.t('generic.lastModified')}</TableCell>
                  </TableRow>
                </TableHead>
              </Table>
            </Box>
            {row.nbiot &&
            <Box sx={{ margin: 1}}>
              <Typography variant="h6" gutterBottom component="div">
                NB-IoT 
              </Typography>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>nidd_scef_id</TableCell>
                    <TableCell>nidd_scef_realm</TableCell>
                    <TableCell>nidd_mechanism</TableCell>
                    <TableCell>nidd_rds</TableCell>
                    <TableCell>nidd_preferred_data_mode</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>{row.nidd_scef_id}</TableCell>
                    <TableCell>{row.nidd_scef_realm}</TableCell>
                    <TableCell>{row.nidd_mechanism}</TableCell>
                    <TableCell>{row.nidd_rds}</TableCell>
                    <TableCell>{row.nidd_preferred_data_mode}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
            }
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default EirItem;
