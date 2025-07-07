import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';
import i18n from '@app/utils/i18n';
import {InputField, SelectField} from '@components';


const AucAddItem = (props: { 
  onChange: any,
  state: any,
  forceKeys: boolean, 
  edit: boolean, 
  onError?: ReturnType<typeof Function>
}) => {

  const { onChange, state, forceKeys, edit, onError=() => {} } = props;
  const [errors, setErrors ] = React.useState({'imsi':'','ki':'','iccid':'','opc':''})

  React.useEffect(() => {
    onValidate('imsi', state.imsi);
    onValidate('iccid', state.iccid);
    if (!edit) {
      onValidate('ki', state.ki);
      onValidate('opc', state.opc);
    }
  }, [state]);

  const setError = (name: string,value: string) => {
    setErrors(prevState => ({
        ...prevState,
        [name]: value
    }));
  }

  const onValidate = (field: string, value: string) => {
    let error = ""
    if (field==='imsi' && value === '')
      error = i18n.t('validator.required');
    else if (field==='imsi' && !/^\d*$/.test(value))
      error = i18n.t('validator.onlyNumbers'); 
    else if (field==='imsi' && value.length < 15)
      error = i18n.t('validator.toShort');
    else if (field==='imsi' && value.length > 0 && value.length > 15)
      error = i18n.t('validator.toLong');

    if (field==='iccid' && value === '')
      error = i18n.t('validator.required');
    else if (field==='iccid' && !/^\d*$/.test(value))
      error = i18n.t('validator.onlyNumbers'); 
    else if (field==='iccid' && value.length > 0 && value.length < 18)
      error = i18n.t('validator.toShort');
    else if (field==='iccid' && value.length > 0 && value.length > 20)
      error = i18n.t('validator.toLong');

    if (!edit || forceKeys) {
      if (field==='ki' && value === '')
        error = i18n.t('validator.required');
      else if (field==='ki' && !/^[0-9A-Fa-f]*$/.test(value))
        error = i18n.t('onlyHex'); 
      else if (field==='ki' && value.length < 32)
        error = i18n.t('validator.toShort');
      else if (field==='ki' && value.length > 32)
        error = i18n.t('validator.toLong'); 

      if (field==='opc' && value === '')
        error = i18n.t('validator.required');
      else if (field==='opc' && !/^[0-9A-Fa-f]*$/.test(value))
        error = i18n.t('onlyHex'); 
      else if (field==='opc' && value.length < 32)
        error = i18n.t('validator.toShort');
      else if (field==='opc' && value.length > 32)
        error = i18n.t('validator.toLong'); 
    }

    setError(field, error);

    if (error!=='' || Object.values(errors).filter((a)=>a!=='').length > 0)
      onError(true);
    else
      onError(false);
  }

  const onChangeLocal = (name: string, value: string) => {
    onValidate(name, value);
    onChange(name, value);
  }

  return (
    <React.Fragment>
            <Grid container spacing={1} rowSpacing={1}>
              <Grid item xs={3}>
                <InputField
                  error={errors.imsi}
                  value={state.imsi}
                  onChange={onChangeLocal}
                  id="imsi"
                  label={i18n.t('inputFields.header.imsi')}
                >{i18n.t('inputFields.desc.imsi')}</InputField>
              </Grid>
              {(!edit || forceKeys) && <Grid item xs={3}>
                <InputField
                  value={state.ki}
                  error={errors.ki}
                  onChange={onChangeLocal}
                  id="ki"
                  label={i18n.t('inputFields.header.ki')}
                >{i18n.t('inputFields.desc.ki')}</InputField>
              </Grid>}
              {(!edit || forceKeys) && <Grid item xs={3}>
                <InputField
                  error={errors.opc}
                  value={state.opc}
                  onChange={onChangeLocal}
                  id="opc"
                  label={i18n.t('inputFields.header.opc')}
                >{i18n.t('inputFields.desc.opc')}</InputField>
              </Grid>}
              <Grid item xs={3}>
                <InputField
                  value={state.iccid}
                  error={errors.iccid}
                  onChange={onChangeLocal}
                  id="iccid"
                  label={i18n.t('inputFields.header.iccid')}
                >{i18n.t('inputFields.desc.iccid')}</InputField>
              </Grid>
              <Grid item xs={2}>
                <SelectField
                  value={state.esim}
                  onChange={onChangeLocal}
                  id="esim"
                  label={i18n.t('inputFields.header.esim')}
                  helper={i18n.t('inputFields.desc.esim')}
                >
                  <MenuItem value={true}>{i18n.t('generic.yes')}</MenuItem>
                  <MenuItem value={false}>{i18n.t('generic.no')}</MenuItem>
                </SelectField>
              </Grid>
              <Grid item xs={3}>
                <InputField
                  value={state.sim_vendor}
                  onChange={onChangeLocal}
                  id="sim_vendor"
                  label={i18n.t('inputFields.header.simVendor')}
                >{i18n.t('inputFields.desc.simVendor')}</InputField>
              </Grid>
              <Grid item xs={3}>
                <InputField
                  value={state.batch_name}
                  onChange={onChangeLocal}
                  id="batch_name"
                  label={i18n.t('inputFields.header.batch')}
                >{i18n.t('inputFields.desc.batch')}</InputField>
              </Grid>
              <Grid item xs={3}>
                <InputField
                  value={state.amf}
                  onChange={onChangeLocal}
                  id="amf"
                  label={i18n.t('inputFields.header.amf')}
                >{i18n.t('inputFields.desc.amf')}</InputField>
              </Grid>
              {state.esim === true && <Grid item xs={5}>
                <InputField
                  value={state.lpa}
                  onChange={onChangeLocal}
                  id="lpa"
                  label={i18n.t('inputFields.header.lpa')}
                >{i18n.t('inputFields.desc.lpa')}</InputField>
              </Grid>}
              <Grid item xs={12}><h3>User info</h3></Grid>
              <Grid item xs={3}>
                <InputField
                  value={state.pin1}
                  onChange={onChangeLocal}
                  id="pin1"
                  label={i18n.t('inputFields.header.pin1')}
                >{i18n.t('inputFields.desc.pin1')}</InputField>
              </Grid>
              <Grid item xs={3}>
                <InputField
                  value={state.puk1}
                  onChange={onChangeLocal}
                  id="puk1"
                  label={i18n.t('inputFields.header.puk1')}
                >{i18n.t('inputFields.desc.puk1')}</InputField>
              </Grid>
              <Grid item xs={3}>
                <InputField
                  value={state.pin2}
                  onChange={onChangeLocal}
                  id="pin2"
                  label={i18n.t('inputFields.header.pin2')}
                >{i18n.t('inputFields.desc.pin2')}</InputField>
              </Grid>
              <Grid item xs={3}>
                <InputField
                  value={state.puk2}
                  onChange={onChangeLocal}
                  id="puk2"
                  label={i18n.t('inputFields.header.puk2')}
                >{i18n.t('inputFields.desc.puk2')}</InputField>
              </Grid>
              {(!edit || forceKeys) && <Grid item xs={3}>
                <InputField
                  value={state.kid}
                  onChange={onChangeLocal}
                  id="kid"
                  label={i18n.t('inputFields.header.kid')}
                >{i18n.t('inputFields.desc.kid')}</InputField>
              </Grid>}
              {(!edit || forceKeys) && <Grid item xs={3}>
                <InputField
                  value={state.psk}
                  onChange={onChangeLocal}
                  id="psk"
                  label={i18n.t('inputFields.header.psk')}
                >{i18n.t('inputFields.desc.psk')}</InputField>
              </Grid>}
              {(!edit || forceKeys) && <Grid item xs={3}>
                <InputField
                  value={state.des}
                  onChange={onChangeLocal}
                  id="des"
                  label={i18n.t('inputFields.header.des')}
                >{i18n.t('inputFields.desc.des')}</InputField>
              </Grid>}
              {(!edit || forceKeys) && <Grid item xs={3}>
                <InputField
                  value={state.adm1}
                  onChange={onChangeLocal}
                  id="adm1"
                  label={i18n.t('inputFields.header.adm1')}
                >{i18n.t('inputFields.desc.adm1')}</InputField>
              </Grid>}
              <Grid item xs={12}><h3>Misc</h3></Grid>
              <Grid item xs={3}>
                <InputField
                  value={state.misc1}
                  onChange={onChangeLocal}
                  id="misc1"
                  label={i18n.t('inputFields.header.misc1')}
                >{i18n.t('inputFields.desc.misc1')}</InputField>
              </Grid>
              <Grid item xs={3}>
                <InputField
                  value={state.misc2}
                  onChange={onChangeLocal}
                  id="misc2"
                  label={i18n.t('inputFields.header.misc2')}
                >{i18n.t('inputFields.desc.misc2')}</InputField>
              </Grid>
              <Grid item xs={3}>
                <InputField
                  value={state.misc3}
                  onChange={onChangeLocal}
                  id="misc3"
                  label={i18n.t('inputFields.header.misc3')}
                >{i18n.t('inputFields.desc.misc3')}</InputField>
              </Grid>
              <Grid item xs={3}>
                <InputField
                  value={state.misc4}
                  onChange={onChangeLocal}
                  id="misc4"
                  label={i18n.t('inputFields.header.misc4')}
                >{i18n.t('inputFields.desc.misc4')}</InputField>
              </Grid>
            </Grid>
    </React.Fragment>
  );
}

export default AucAddItem;
