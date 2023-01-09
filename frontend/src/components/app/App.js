import React, {useState, useEffect} from 'react';
import './App.css';

import Welcome from '../landing/Welcome.js';
import SummaryPage from '../summaryPage/SummaryPage.js';
import AnalysisPage from '../analysisPage/AnalysisPage.js';
import Navbar from '../navbar/Navbar.js';
import { checkDataExists } from '../../api/api';

const App = () => {
  const [dataLoaded, setDataLoaded] = useState(false);
  const [view, setView] = useState('Home')

  useEffect(() => {
    checkDataExists(setDataLoaded);
  }, []);

  return (
    <div className={"app"}>
      <div className={"sidebar position-fixed"}>
        <Navbar 
          view={view}
          setView={setView}
          dataLoaded={dataLoaded}
          setDataLoaded={setDataLoaded} 
        />
      </div>
      <div className={"main-content"}>
        {dataLoaded ?
          <>
            {view === 'Home' ? <SummaryPage />
              : view === 'Analysis' ? <AnalysisPage />
              : null
            }
          </>
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
