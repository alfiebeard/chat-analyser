import React, {useState, useEffect} from 'react';
import '../../app/App.css';
import { fetchTopWords } from '../../../api/api';
import WordCloud from '../coreGraphs/WordCloud';
import topWordsSample from '../../../TestData/topWordsSample.json';


const TopWordsGraph = (props) => {
  const [data, setData] = useState(null);

  useEffect(() => {if (props.dataLoaded) {
    // fetchTopWords();
    setData(topWordsSample["words"]);
  }}, [props.dataLoaded]);

  return (
    <div className={"h-100 block"}>
      <WordCloud 
        data={data} 
      />
    </div>
  );
}

export default TopWordsGraph;