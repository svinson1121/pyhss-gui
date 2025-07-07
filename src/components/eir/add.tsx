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

import {EirApi} from '../../services/pyhss';

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

const EirAddItem = (props: { open: ReturnType<typeof Boolean>, handleClose: ReturnType<typeof Function>, data: ReturnType<typeof Object>, edit: ReturnType<typeof Boolean> }) => {
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

  const handleSave = () => {
    if (edit) {
      EirApi.update(data.eir_id, state).then(() => {
        handleClose();
      })
    } else {
      EirApi.create(state).then(() => {
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
        <h3>{i18n.t('eir.headAdd', {"mode": (edit?i18n.t('generic.edit'):i18n.t('generic.add'))})}</h3>
        <Box
          component="form"
          noValidate
          autoComplete="off"
        >
          <Grid container rowSpacing={1} spacing={1}>
            <Grid item xs={4}>
              <InputField
                required
                value={state.eir}
                onChange={handleChange}
                id="imei"
                label={i18n.t('inputFields.header.imei')}
              >{i18n.t('inputFields.desc.imei')}</InputField>
            </Grid>
            <Grid item xs={5}>
              <InputField
                required
                value={state.imsi}
                onChange={handleChange}
                id="imsi"
                label={i18n.t('inputFields.header.imsi')}
              >
                {i18n.t('inputFields.desc.imsi')}
              </InputField>
            </Grid>
            <Grid item xs={12}><h3>{i18n.t('eir.mode')}</h3></Grid>
            <Grid item xs={3}>
	     <SelectField
  	     value={state.regex_mode}
  	     onChange={handleChange}
             id="regex_mode"
             label={i18n.t('inputFields.header.regex_mode')}
             helper={i18n.t('inputFields.desc.regex_mode')}
	     >
 	     <MenuItem value={0}>exact matching</MenuItem>
             <MenuItem value={1}>loose matching</MenuItem>
            </SelectField>
            </Grid>
            <Grid item xs={4}>
		<SelectField
 		 value={state.match_response_code}
 		 onChange={handleChange}
 		 id="match_response_code"
 		 label={i18n.t('inputFields.header.match_response_code')}
 		 helper={i18n.t('inputFields.desc.match_response_code')}
		>
 		 <MenuItem value={0}>Whitelist</MenuItem>
 		 <MenuItem value={1}>Blacklist</MenuItem>
 		 <MenuItem value={2}>Greylist</MenuItem>
		</SelectField>
            </Grid>
          </Grid>
         </Box>
         <SaveButtons onClickClose={handleLocalClose} onClickSave={handleSave} />
       </Box>
     </Modal>

    </React.Fragment>
  );
}

export default EirAddItem;
