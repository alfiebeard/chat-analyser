import React, {useState, useEffect} from 'react';
import './App.css';

import Welcome from './Welcome/Welcome';
import Analyser from './Analyser/Analyser';
import Navbar from './Navbar';
import { dataExists } from './api/api';

const App = () => {
  const [dataLoaded, setDataLoaded] = useState(false);
  const [view, setView] = useState('Home')

  useEffect(() => {
    dataExists(setDataLoaded);
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
