import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';
import i18n from '@app/utils/i18n';
import {InputField, SelectField} from '@components';


const RoamingNetworkAddItem = (props: { 
  onChange: any,
  state: any,
  edit: boolean, 
  onError?: ReturnType<typeof Function>
}) => {

  const { onChange, state, edit, onError=() => {} } = props;
  const [errors, setErrors ] = React.useState({'name':'','mnc':'','mcc':'','preference':''})

  const setError = (name: string,value: string) => {
    setErrors(prevState => ({
        ...prevState,
        [name]: value
    }));
  }

  const onValidate = (field: string, value: string) => {
    let error = ""
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
                  error={errors['name']}
                  value={state['name']}
                  onChange={onChangeLocal}
                  id="name"
                  label={i18n.t('inputFields.header.name')}
                >{i18n.t('inputFields.desc.name')}</InputField>
              </Grid>
              <Grid item xs={3}>
                <InputField
                  error={errors.mcc}
                  value={state.mcc}
                  onChange={onChangeLocal}
                  id="mcc"
                  label={i18n.t('inputFields.header.mcc')}
                >{i18n.t('inputFields.desc.mcc')}</InputField>
              </Grid>
              <Grid item xs={3}>
                <InputField
                  error={errors.mnc}
                  value={state.mnc}
                  onChange={onChangeLocal}
                  id="mnc"
                  label={i18n.t('inputFields.header.mnc')}
                >{i18n.t('inputFields.desc.mnc')}</InputField>
              </Grid>
              <Grid item xs={3}>
                <InputField
                  error={errors.preference}
                  value={state.preference}
                  onChange={onChangeLocal}
                  id="preference"
                  label={i18n.t('inputFields.header.preference')}
                >{i18n.t('inputFields.desc.preference')}</InputField>
              </Grid>
            </Grid>
    </React.Fragment>
  );
}

export default RoamingNetworkAddItem;
