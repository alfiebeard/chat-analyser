import chroma from "chroma-js";
import moment from "moment";
import { Chart } from 'chart.js';
import { shuffleArray } from "../../../utils/mathUtils";

export function setGraphData(data, x, y, label, color, stackable=false, displayStacked=false, alpha=1){
    if (stackable && displayStacked) {
        // If data stackable and to be displayed as stacked - set number of colours equal to number of datasets.
        color = Object.keys(data).length
    }
    else if (stackable && !displayStacked) {
        // If data stackable but not to be displayed stacked, i.e., combined, combine the data.
        const dataX = Object.values(data)[0][x];     // Get x data from first value in object
        var dataY = Array(dataX.length).fill(0);  // Create zero array for dataY

        // Now sum each of the y arrays of the datasets and add to dataY.
        Object.values(data).forEach((dataset) => {
            dataY = dataY.map((v, i) => v + dataset[y][i])
        })
        
        // Reset data to these new sets
        data = {};
        data[x] = dataX;
        data[y] = dataY;
    }

    // If color is a number, e.g., 5, then get color scheme for this
    if (!isNaN(color)) {
        color = colorScheme(color, alpha)
    }

    if (stackable && displayStacked) {
        const labels = data[Object.keys(data)[0]][x]
        const datasets = Object.keys(data)
            .map((user, i) => (
                {
                    label: user,
                    data: data[user][y],
                    backgroundColor: color[i]
                }
            ))

        return {
            labels: labels,
            datasets: datasets
        }

    } else {
        const labels = data[x]
        const datasets = [
            {
                label: label,
                data: data[y],
                backgroundColor: color
            }
        ]

        return {
            labels: labels,
            datasets: datasets
        }
    }
}


export function setOptions(options){
    const xTitleOption = {
        display: options.hasOwnProperty("xTitle") ? true : false,
        text: options.hasOwnProperty("xTitle") ? options.xTitle : null,
    }

    const yTitleOption = {
        display: options.hasOwnProperty("yTitle") ? true : false,
        text: options.hasOwnProperty("yTitle") ? options.yTitle : null,
    }

    var legendOnClick = Chart.defaults.plugins.legend.onClick;
    if (options.hasOwnProperty("radar")) {
        legendOnClick = options.radar ? radarLegendOnClick : null
    }

    return {
        plugins: {
            title: {
                display: options.hasOwnProperty("title") ? true : false,
                text: options.hasOwnProperty("title") ? options.title : null
            },
            legend: {
                display: options.hasOwnProperty("showLegend") ? options.showLegend : true,
                position: 'bottom',
                onClick: legendOnClick
            }
        },
        scale : options.hasOwnProperty("radar") ? {min: 0} : null,
        scales : options.hasOwnProperty("radar") ? null : {
            x: {
                title: xTitleOption,
                display: options.hasOwnProperty("showAxes") ? options.showAxes : true,
                stacked: options.hasOwnProperty("stackable") ? options.stackable : false
            },
            y : {
                title: yTitleOption,
                display: options.hasOwnProperty("showAxes") ? options.showAxes : true,
                stacked: options.hasOwnProperty("stackable") ? options.stackable : false,
                max: options.hasOwnProperty("maxY") ? options.maxY : null
            }
        },
        maintainAspectRatio: false
    }
}


function colorScheme(n, alpha=1, shuffle=false){
    const scheme = chroma.scale('Spectral');
    var palette = [];
    for (let i=0; i<n; i++){
        palette.push(scheme(i / n).alpha(alpha).hex());
    }

    if (shuffle) {
        palette = shuffleArray(palette);
    }

    return palette
}


function radarLegendOnClick(e, legendItem, legend) {
    // Hide all other legend items and change the state of the selected legendItem.
    let chart = legend.chart;
    // .forEach(function (meta) {
    //     meta.hidden = meta.hidden === null ? !ci.data.datasets[index].hidden : null;
    // });
            
    chart._metasets.forEach(function(ds) {
        if (ds.label === legendItem.text) {ds.hidden = !ds.hidden || null}
        else {ds.hidden = true}
    });
    chart.update();
}


export function getDataX(data, x, stackable=false) {
    if (stackable) {
        // If data stackable
        return Object.values(data)[0][x];     // Get x data from first value in object
    }
    else {
        return data[x];
    }
}


export function filterDataByX(data, x, y, startIndex, endIndex, stackable=false) {
    const filteredData = {}
    if (stackable) {
        for (let xItem in data) {
            filteredData[xItem] = {}
            const filteredX = data[xItem][x].filter((_, index) => index >= startIndex && index <= endIndex);
            const filteredY = data[xItem][y].filter((_, index) => index >= startIndex && index <= endIndex);
            filteredData[xItem][x] = filteredX;
            filteredData[xItem][y] = filteredY;
        }
        return filteredData
    }
    else {
        filteredData[x] = data[x].filter((_, index) => index >= startIndex && index <= endIndex);
        filteredData[y] = data[y].filter((_, index) => index >= startIndex && index <= endIndex);
        return filteredData
    }
}
