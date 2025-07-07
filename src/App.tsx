import React, { useEffect, useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Main from '@modules/main/Main';
import Login from '@modules/login/Login';
import { useWindowSize } from '@app/hooks/useWindowSize';
import { calculateWindowSize } from '@app/utils/helpers';
import { useDispatch, useSelector } from 'react-redux';
import { setWindowSize, setDarkMode } from '@app/store/reducers/ui';

import Dashboard from '@pages/Dashboard';
import Auc from '@pages/Auc';
import Apn from '@pages/Apn';
import Subscriber from '@pages/Subscriber';
import IMSSubscriber from '@pages/IMSSubscriber';
import Tft from '@pages/Tft';
import ChargingRule from '@pages/ChargingRule';
import RoamingNetwork from '@pages/RoamingNetwork';
import RoamingRule from '@pages/RoamingRule';
import Eir from  '@pages/Eir';

import AddWizard from '@pages/AddWizard';

import PublicRoute from './routes/PublicRoute';
import PrivateRoute from './routes/PrivateRoute';
import { setAuthentication } from './store/reducers/auth';
import {
  getAuthStatus,
} from './utils/oidc-providers';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

const App = () => {
  const windowSize = useWindowSize();
  const screenSize = useSelector((state: any) => state.ui.screenSize);
  const dispatch = useDispatch();
  const [isAppLoading, setIsAppLoading] = useState(true);

  const checkSession = async () => {
    try {
      let responses: any = await Promise.all([
        getAuthStatus(),
      ]);

      responses = responses.filter((r: any) => Boolean(r));

      if (responses && responses.length > 0) {
        dispatch(setAuthentication(responses[0]));
      }
    } catch (error: any) {
      console.log('error', error);
    }
    setIsAppLoading(false);
  };

  useEffect(() => {
    dispatch(setDarkMode((localStorage.getItem('darkmode')==='yes'?true:false)));
    checkSession();
  }, []);

  useEffect(() => {
    const size = calculateWindowSize(windowSize.width);
    if (screenSize !== size) {
      dispatch(setWindowSize(size));
    }
  }, [windowSize]);

  const darkMode = useSelector(
    (state: any) => state.ui.darkMode
  );

  if (isAppLoading) {
    return <p>Loading</p>;
  }

  return (
  <ThemeProvider theme={(darkMode?darkTheme:lightTheme)}>
    <BrowserRouter>
      <CssBaseline />
      <Routes>
        <Route path="/login" element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
        </Route>
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/" element={<Main />}>
            <Route path="/apn" element={<Apn />} />
            <Route path="/auc" element={<Auc />} />
            <Route path="/subscriber" element={<Subscriber />} />
            <Route path="/imssubscriber" element={<IMSSubscriber />} />
            <Route path="/tft" element={<Tft />} />
            <Route path="/chargingrule" element={<ChargingRule />} />
	    <Route path="/eir" element={<Eir />} />
            <Route path="/roamingnetwork" element={<RoamingNetwork />} />
            <Route path="/roamingrule" element={<RoamingRule />} />
            <Route path="/addwizard" element={<AddWizard />} />
            <Route path="/" element={<Dashboard />} />
          </Route>
        </Route>
      </Routes>
      <ToastContainer
        autoClose={3000}
        draggable={false}
        position="top-right"
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnHover
      />
    </BrowserRouter>
  </ThemeProvider>
  );
};

export default App;
