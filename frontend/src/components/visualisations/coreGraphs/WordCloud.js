import React from 'react';
import ReactWordcloud from 'react-wordcloud';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';
import NoDataChart from './NoDataChart';


const WordCloud = (props) => {
    const options = {
        colors: ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b"],
        enableTooltip: true,
        deterministic: false,
        fontFamily: "impact",
        fontSizes: [5, 60],
        fontStyle: "normal",
        fontWeight: "normal",
        padding: 2,
        rotations: 3,
        rotationAngles: [0, 90],
        scale: "log",
        spiral: "rectangular",
        transitionDuration: 1000
    }

    return (
        <>
            {props.data ?
                <ReactWordcloud
                    words={props.data}
                    options={options}
                />
                :
                <NoDataChart 
                    error={props.error}
                />
            }
        </>
  );
}

export default WordCloud;