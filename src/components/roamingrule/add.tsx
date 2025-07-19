import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';
import i18n from '@app/utils/i18n';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import {InputField, SelectField} from '@components';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

import {RoamingNetworkApi} from '../../services/pyhss';

const RoamingRuleAddItem = (props: { 
  onChange: any,
  state: any,
  edit: boolean, 
  onError?: ReturnType<typeof Function>
}) => {

  const { onChange, state, edit, onError=() => {} } = props;
  const [errors, setErrors ] = React.useState({'network':'', 'name':'','mnc':'','mcc':'','preference':''})
  const [network, setNetwork] = React.useState([]);
  const [networkLoading, setNetworkLoading] = React.useState(true);

  React.useEffect(() => {
    RoamingNetworkApi.getAll().then((data => {
      setNetwork(data.data);
      setNetworkLoading(false);
    }));
  }, [state]);


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
  const onChangeNetwork = (net: object) => {
    console.log(net);
    onChangeLocal('roaming_network_id', net.roaming_network_id)
  }
  return (
    <React.Fragment>
            <Grid container spacing={1} rowSpacing={1}>
              <Grid item xs={3}>
		{edit ? (
  <TextField
    label={i18n.t('generic.network')}
    value={(network.find(a => a.roaming_network_id === state.roaming_network_id) || { name: '' }).name}
    disabled
  />
) : (
  <Autocomplete
    loading={networkLoading}
    onChange={(_event, value) => {
      if (value !== '') {
        onChangeNetwork(network.find(a => a.roaming_network_id === Number(value.split(" ")[0])));
      }
    }}
    value={(network.find(a => a.roaming_network_id === state.roaming_network_id) || { name: '' }).name}
    options={network.map((option) => `${option.roaming_network_id} ${option.name}`)}
    renderInput={(params) => <TextField {...params} label={`${i18n.t('generic.network')} ${errors.network}`} error={errors.network !== ''} />}
  />
)}

              </Grid>
              <Grid item xs={3}>
		<p>Roaming Allowed on this network?</p>
		<FormControlLabel
 		 control={
    		 <Checkbox
 		  checked={state.allow}
    		  onChange={(e) => onChange('allow', e.target.checked)}
     		  name="allow"
    		  color="primary"
    		 />
  			}
 		 label={i18n.t('generic.allowed')}
		/>
              </Grid>
              <Grid item xs={3}>
		<p>Enable this Rule?</p>
		 <FormControlLabel
                 control={
                 <Checkbox
                  checked={state.enabled}
                  onChange={(e) => onChange('enabled', e.target.checked)}
                  name="enabled"
                  color="primary"
                 />
                        }
                 label={i18n.t('generic.enabled')}
                />

              </Grid>
            </Grid>
    </React.Fragment>
  );
}

export default RoamingRuleAddItem;
