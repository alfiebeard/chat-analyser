import React, {useState, useEffect} from 'react';
import '../../app/App.css';
import { fetchTopWords } from '../../../api/api';
import WordCloud from '../coreGraphs/WordCloud';
import topWordsSample from '../../../TestData/topWordsSample.json';


const TopWordsGraph = (props) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchTopWords();
    setData(topWordsSample["words"]);
  }, []);

  return (
    <div className={"h-100 block"} style={{"padding": 0}}>
      {data ?
        <WordCloud 
          data={data}
        />
        : null
      }
    </div>
  );
}

export default TopWordsGraph;