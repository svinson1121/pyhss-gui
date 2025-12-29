import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';
import i18n from '@app/utils/i18n';
import {
  NetworkBandwidthFormatter,
  InputField,
  SelectField,
  SaveButtons,
} from '@components';

import {ApnApi} from '../../services/pyhss';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const ApnAddItem = (props: { open: ReturnType<typeof Boolean>, handleClose: ReturnType<typeof Function>, data: ReturnType<typeof Object>, edit: ReturnType<typeof Boolean> }) => {
  const { open, handleClose, data, edit } = props;
  const [state, setState] = React.useState(data);

   React.useEffect(() => {
       setState(data);
   }, [data]) 
  
  const handleChange = (name: string, value: string) => {
    setState(prevState => ({
        ...prevState,
        [name]: value
    }));
  };

const normalizePayload = (payload: any) => {
    const normalized = { ...payload };

    [
      'pgw_address',
      'sgw_address',
    ].forEach((key) => {
      if (normalized[key] === '') {
        normalized[key] = null;
      }
    });

    return normalized;
  };

  const handleSave = () => {
    const payload = normalizePayload(state);

    if (edit) {
      ApnApi.update(data.apn_id, payload).then(() => {
        handleClose();
      })
    } else {
      ApnApi.create(payload).then(() => {
        handleClose();
      })
    }
  }

  const handleLocalClose = () => {
    handleClose();
  }

  return (
    <React.Fragment>
     <Modal
       open={open}
       onClose={handleLocalClose}
       aria-labelledby="modal-modal-title"
       aria-describedby="modal-modal-description"
     >
       <Box sx={style}>
        <h3>{i18n.t('apn.headAdd', {"mode": (edit?i18n.t('generic.edit'):i18n.t('generic.add'))})}</h3>
        <Box
          component="form"
          noValidate
          autoComplete="off"
        >
          <Grid container rowSpacing={1} spacing={1}>
            <Grid item xs={4}>
              <InputField
                required
                value={state.apn}
                onChange={handleChange}
                id="apn"
                label={i18n.t('inputFields.header.apn')}
              >{i18n.t('inputFields.desc.apn')}</InputField>
            </Grid>
            <Grid item xs={4}>
              <SelectField
                value={state.ip_version}
                onChange={handleChange}
                id="ip_version"
                label={i18n.t('inputFields.header.ipVersion')}
                helper={i18n.t('inputFields.desc.ipVersion')}
                >
                  <MenuItem key={1} value={0}>ipv4</MenuItem>
                  <MenuItem key={2} value={1}>ipv6</MenuItem>
                  <MenuItem key={3} value={2}>ipv4 and ipv6</MenuItem>
                  <MenuItem key={4} value={3}>ipv4 or ipv6</MenuItem>
              </SelectField>
            </Grid>
            <Grid item xs={4}>
              <SelectField
                value={state.nbiot}
                onChange={handleChange}
                id="nbiot"
                label={i18n.t('inputFields.header.nbiot')}
                helper={i18n.t('inputFields.desc.nbiot')}
              >
                <MenuItem value={true}>{i18n.t('generic.yes')}</MenuItem>
                <MenuItem value={false}>{i18n.t('generic.no')}</MenuItem>
              </SelectField>
            </Grid>
            <Grid item xs={12}><h3>{i18n.t('apn.gatewayHead')}</h3></Grid>
            <Grid item xs={6}>
              <InputField
                value={state.pgw_address}
                onChange={handleChange}
                id="pgw_address"
                label={i18n.t('inputFields.header.pgw')}
              >
                {i18n.t('inputFields.desc.pgw')}
              </InputField>
            </Grid>
            <Grid item xs={6}>
              <InputField
                value={state.sgw_address}
                onChange={handleChange}
                id="sgw_address"
                label={i18n.t('inputFields.header.sgw')}
              >
                {i18n.t('inputFields.desc.sgw')}
              </InputField>
            </Grid>
            <Grid item xs={12}><h3>{i18n.t('apn.chargingHead')}</h3></Grid>
            <Grid item xs={6}>
              <InputField
                value={state.charging_characteristics}
                onChange={handleChange}
                id="charging_characteristics"
                label={i18n.t('inputFields.header.chargingCharacteristics')}
              >
                {i18n.t('inputFields.desc.chargingCharacteristics')}
              </InputField>
            </Grid>
            <Grid item xs={6}>
              <InputField
                value={state.charging_rule_list}
                onChange={handleChange}
                id="charging_rule_list"
                label="Charging rule list"
              >
                Comma seperated list of charging rules
              </InputField>
            </Grid>
            <Grid item xs={12}><h3>{i18n.t('apn.qosHead')}</h3></Grid>
            <Grid item xs={3}>
              <SelectField
                value={state.qci}
                onChange={handleChange}
                id="qci"
                label={i18n.t('inputFields.header.qci')}
                helper={i18n.t('inputFields.desc.qci')}
              >
                {Array.from(Array(9), (e, i) => (<MenuItem key={i+1+e} value={i+1}>{i+1}</MenuItem>))}
              </SelectField>
            </Grid>
            <Grid item xs={4}>
              <InputField
                required
                value={state.apn_ambr_ul}
                onChange={handleChange}
                id="apn_ambr_ul"
                label={i18n.t('inputFields.header.ambr_ul')}
              >{i18n.t('inputFields.desc.ambr_ul')} <NetworkBandwidthFormatter data={state.apn_ambr_ul} /></InputField>
            </Grid>
            <Grid item xs={4}>
              <InputField
                required
                value={state.apn_ambr_dl}
                onChange={handleChange}
                id="apn_ambr_dl"
                label={i18n.t('inputFields.header.ambr_dl')}
              >{i18n.t('inputFields.desc.ambr_dl')} <NetworkBandwidthFormatter data={state.apn_ambr_dl} /></InputField>
            </Grid>
            <Grid item xs={12}><h4>{i18n.t('apn.arpHead')}</h4></Grid>
            <Grid item xs={4}>
              <SelectField
                value={state.arp_priority}
                onChange={handleChange}
                id="arp_priority"
                label={i18n.t('inputFields.header.arpPriority')}
                helper={i18n.t('inputFields.desc.arpPriority')}
                >
                  {Array.from(Array(15), (e, i) => (<MenuItem key={i+1+e} value={i+1}>{i+1}</MenuItem>))}
              </SelectField>
            </Grid>
            <Grid item xs={4}>
              <SelectField
                value={state.arp_preemption_capability}
                onChange={handleChange}
                id="arp_preemption_capability"
                label={i18n.t('inputFields.header.arpPreemptionCapability')}
                helper={i18n.t('inputFields.desc.arpPreemptionCapability')}
                >
                  <MenuItem value={true}>{i18n.t('generic.yes')}</MenuItem>
                  <MenuItem value={false}>{i18n.t('generic.no')}</MenuItem>
              </SelectField>
            </Grid>
            <Grid item xs={4}>
              <SelectField
                value={state.arp_preemption_vulnerability}
                onChange={handleChange}
                id="arp_preemption_vulnerability"
                label={i18n.t('inputFields.header.arpPreemptionVulnerability')}
                helper={i18n.t('inputFields.desc.arpPreemptionVulnerability')}
                >
                  <MenuItem value={true}>{i18n.t('generic.yes')}</MenuItem>
                  <MenuItem value={false}>{i18n.t('generic.no')}</MenuItem>
              </SelectField>
            </Grid>
            {state.nbiot && <> 
            <Grid item xs={12}><h3>{i18n.t('apn.nbiotHead')}</h3></Grid>
            <Grid item xs={4}>
              <InputField
                required
                value={state.nidd_scef_id}
                onChange={handleChange}
                id="nidd_scef_id"
                label={i18n.t('inputFields.header.scefId')}
              >{i18n.t('inputFields.desc.scefId')}</InputField>
            </Grid>
            <Grid item xs={4}>
              <InputField
                required
                value={state.nidd_scef_realm}
                onChange={handleChange}
                id="nidd_scef_realm"
                label={i18n.t('inputFields.header.scefRealm')}
              >{i18n.t('inputFields.desc.scefRealm')}</InputField>
            </Grid>
            <Grid item xs={4}>
              <SelectField
                value={state.nidd_mechanism}
                onChange={handleChange}
                id="nidd_mechanism"
                label={i18n.t('inputFields.header.niddMechanism')}
                helper={i18n.t('inputFields.desc.niddMechanism')}
                >
                  <MenuItem value={0}>SGi-BASED-DATA-DELIVERY</MenuItem>
                  <MenuItem value={1}>SCEF-BASED-DATA-DELIVERY</MenuItem>
              </SelectField>
            </Grid>
            <Grid item xs={4}>
              <SelectField
                value={state.nidd_rds}
                onChange={handleChange}
                id="nidd_rds"
                label={i18n.t('inputFields.header.niddRds')}
                helper={i18n.t('inputFields.desc.niddRds')}
                >
                  <MenuItem value={0}>{i18n.t('generic.disabled')}</MenuItem>
                  <MenuItem value={1}>{i18n.t('generic.enabled')}</MenuItem>
              </SelectField>
            </Grid>
            <Grid item xs={4}>
              <SelectField
                value={state.nidd_preferred_data_mode}
                onChange={handleChange}
                id="nidd_preferred_data_mode"
                label={i18n.t('inputFields.header.niddPreferredDataMode')}
                helper={i18n.t('inputFields.desc.niddPreferredDataMode')}
                >
                  <MenuItem value={0}>{i18n.t('inputFields.options.niddPreferredDataMode.0')}</MenuItem>
                  <MenuItem value={1}>{i18n.t('inputFields.options.niddPreferredDataMode.1')}</MenuItem>
              </SelectField>
            </Grid>
          </>}
          </Grid>
         </Box>
         <SaveButtons onClickClose={handleLocalClose} onClickSave={handleSave} />
       </Box>
     </Modal>

    </React.Fragment>
  );
}

export default ApnAddItem;
