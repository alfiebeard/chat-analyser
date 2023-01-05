import React, {useState, useEffect} from 'react';
import './App.css';

import Welcome from '../landing/Welcome.js';
import Analyser from '../analyser/Analyser.js';
import Navbar from '../navbar/Navbar.js';
import { checkDataExists } from '../../api/api';

const App = () => {
  const [dataLoaded, setDataLoaded] = useState(false);
  const [view, setView] = useState('Home')

  useEffect(() => {
    checkDataExists(setDataLoaded);
  }, []);

  return (
    <div className={"app row"}>
      <div className={"col sidebar"}>
        <Navbar 
          view={view}
          setView={setView}
          dataLoaded={dataLoaded} 
        />
      </div>
      <div className={"col main-content"}>
        {dataLoaded ?
            <Analyser
              display={view === 'Home'}
              dataLoaded={dataLoaded}
              setDataLoaded={setDataLoaded}
            /> 
          : 
            <Welcome 
              setDataLoaded={setDataLoaded} 
            />
        }
        </div>
    </div>
  );
}

export default App;
