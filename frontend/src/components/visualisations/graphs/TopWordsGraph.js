import React, {useState, useEffect} from 'react';
import '../../app/App.css';
import { fetchTopWords } from '../../../api/api';
import WordCloud from '../coreGraphs/WordCloud';
import topWordsSample from '../../../TestData/topWordsSample.json';


const TopWordsGraph = (props) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchTopWords(setData, setError);
  }, []);

  return (
    <div className={"h-100 block"} style={{"padding": 0}}>
        <WordCloud 
          data={data}
          error={error}
        />
    </div>
  );
}

export default TopWordsGraph;