import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CryptoJS from 'crypto-js';
import i18n from '@app/utils/i18n';

import {SaveButtons} from '@components';
import AucAddItem from './add';

import {AucApi} from '../../services/pyhss';

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


const AucAddModal = (props: { open: boolean, handleClose: any, data: object, edit: boolean, onError: Function }) => {
  const { open, handleClose, data, edit, onError = () => {} } = props;
  const [state, setState] = React.useState(data);
  const [error, setError] = React.useState(true);
  const [forceKeys, setForceKeys] = React.useState(false);

  React.useEffect(() => {
      setState(data);
  }, [data])

  const handleChange = (name:string, value:string) => {
    setState((prevState) => ({
        ...prevState,
        [name]: value
    }));
  };

  const hexToBytes = (hex: string) => {
    for (var bytes = [], c = 0; c < hex.length; c += 2)
    bytes.push(parseInt(hex.slice(c, c+2), 16));
    return bytes;
  }
  const bytesToHex = (bytes: Uint8Array) => {
    for (var hex = [], i = 0; i < bytes.length; i++) {
        var current = bytes[i] < 0 ? bytes[i] + 256 : bytes[i];
        hex.push((current >>> 4).toString(16));
        hex.push((current & 0xF).toString(16));
    }
    return hex.join("");
  }

  const handleOPGenerate = (ki: string, op: string) => {
    const opBytes = CryptoJS.enc.Hex.parse(op);
    const kiBytes = CryptoJS.enc.Hex.parse(ki);
    const iv = CryptoJS.enc.Hex.parse("00000000000000000000000000000000");
    var ciphertext = CryptoJS.AES.encrypt(opBytes, kiBytes, { iv: iv });

    const encryptedOp = hexToBytes(ciphertext.ciphertext.toString());
    const preOp = hexToBytes(op);
    const opc = new Uint8Array(preOp.length);
    for (let i = 0; i < preOp.length; i++) {
        opc[i] = encryptedOp[i] ^ preOp[i];
    }
    return bytesToHex(opc);
  }

  const handleForceKeys = () => {
    setForceKeys(true);
  }

  const handleSave = () => {
    if (edit) {
      const aucSaveTemplate = {
        "amf": state.amf,
        "iccid": state.iccid,
        "imsi": state.imsi,
        "batch_name": state.batch_name,
        "sim_vendor": state.sim_vendor,
        "esim": state.esim,
        "lpa": state.lpa,
        "pin1": state.pin1,
        "pin2": state.pin2,
        "puk1": state.puk1,
        "puk2": state.puk2,
        "misc1": state.misc1,
        "misc2": state.misc2,
        "misc3": state.misc3,
        "misc4": state.misc4
      }
      if (!forceKeys)
        AucApi.update(data.auc_id, aucSaveTemplate).then((data) => {
          handleLocalClose();
        }).catch(err => {
          onError(err);
        })
      else
        AucApi.update(data.auc_id, state).then((data) => {
          handleLocalClose();
        }).catch(err => {
          onError(err);
        })
    }else{
      AucApi.create(state).then((data) => {
        handleLocalClose();
      }).catch(err => {
        console.log(err);
        onError(err);
      })
    }
  }

  const handleLocalClose = () => {
    setForceKeys(false);
    handleClose();
  }

  const handleError = (e: boolean) => {
    setError(e);
  }
  
  //Example how to use handleOPGenerate
  //<Button variant="contained" onClick={() => console.log(handleOPGenerate("780E6AC95A2E43449C15BDCDD0450982","D7DECB1F50404CC29ECBF989FE73AFC5"))}>test</Button>
  return (
    <React.Fragment>
      <Modal
       open={open}
       onClose={handleLocalClose}
       aria-labelledby="modal-modal-title"
       aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
	  <h3>{i18n.t('auc.headAdd', {"mode": (edit?i18n.t('generic.edit'):i18n.t('generic.add'))})}</h3>
          {edit && !forceKeys && <Button onClick={handleForceKeys}>{i18n.t('auc.setKeys')}</Button>}
          <Box
            component="form"
            noValidate
            autoComplete="off"
          >
            <AucAddItem onChange={handleChange} state={state} forceKeys={forceKeys} edit={edit} onError={handleError}/>
          </Box>
          <SaveButtons onClickClose={handleLocalClose} onClickSave={handleSave} disabled={error}/>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

export default AucAddModal;
