import './App.css';
import React  from 'react'
import { Routes , Route} from 'react-router-dom'
import {useDispatch} from 'react-redux' 
import PrivateRoute from "./component/PrivateRoute";

import SideNavBar from './component/SideNavBar/SideNavBar';

import Bar from './component/Setup/Bar'
import Gov from './component/Setup/Governorat/Governorat'
import Setup from './component/Setup/Company/Setup'
import Expediteur from './component/Setup/Expediteur/Expediteur'
import Livreur from './component/Setup/Livreur/Livreur'
import Colis from './component/Colis/Colis'
import DetailsColis from'./component/Colis/DetailsColis'
import SolderDetails from './component/Colis/SolderDetails';
import HistColis from './component/Colis/HistColis';
import Soldee from './component/Colis/Soldee';
import Barre from './Barre';


import RunSheet from './component/runSheet/RunSheet'
import DetailsRunSheet from './component/runSheet/DetailsRunSheet'
import NewRunSheet from './component/runSheet/NewRunSheet';
import Login from './component/Login/Login';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function App() {



  return (
  
<div className="App">
<SideNavBar />
        <Routes>
            <Route path="/" element={ <Login />} />
            <Route path="/bar" element={<PrivateRoute><Barre /></PrivateRoute>} />

            {/* <Route path="/gg" element={<Bar />} /> */}
            <Route path="/governorat" element={<PrivateRoute><Gov /> </PrivateRoute>} />
            <Route path="/setup" element={<PrivateRoute><Setup /></PrivateRoute>} />
            <Route path="/expediteur" element={<PrivateRoute><Expediteur /></PrivateRoute>} />
            <Route path="/livreur" element={<PrivateRoute><Livreur /></PrivateRoute>} />
            <Route path="/colis" element={<PrivateRoute><Colis /></PrivateRoute>} />
            <Route path="/ColisD/:trakingN" element={<PrivateRoute><DetailsColis /> </PrivateRoute>} />
            <Route path="/SolderD/:numero" element={<PrivateRoute><SolderDetails /> </PrivateRoute>} />
            <Route path="/histcolis" element={<PrivateRoute><HistColis /> </PrivateRoute>} />
            <Route path="/runsheet" element={<PrivateRoute><RunSheet /> </PrivateRoute>} />
            <Route path="/runsheetOne/:idRS" element={<PrivateRoute><DetailsRunSheet /> </PrivateRoute>} />
            <Route path="/newrunsheet/" element={<PrivateRoute><NewRunSheet /> </PrivateRoute>} />
            <Route path="/soldee/" element={<PrivateRoute><Soldee /> </PrivateRoute>} />


        </Routes>
        <ToastContainer />
</div>        
 
  );
}

export default App;
