import chroma from "chroma-js";
import moment from "moment";
import { Chart } from 'chart.js';
import { shuffleArray } from "../../../utils/mathUtils";

export function setGraphData(data, x, y, label, color, options={}){
    const stackable = options.hasOwnProperty("stackable") ? options.stackable : false;
    const displayStacked = options.hasOwnProperty("displayStacked") ? options.displayStacked : false;
    const alpha = options.hasOwnProperty("alpha") ? options.alpha : 1;
    const aggregationOfDatasets = options.hasOwnProperty("aggregationOfDatasets") ? options.aggregationOfDatasets : "sum";

    if (stackable && displayStacked) {
        // If data stackable and to be displayed as stacked - set number of colours equal to number of datasets.
        color = Object.keys(data).length
    }
    else if (stackable && !displayStacked) {
        // If data stackable but not to be displayed stacked, i.e., combined, combine the data.
        const dataX = Object.values(data)[0][x];     // Get x data from first value in object
        var dataY = Array(dataX.length).fill(0);  // Create zero array for dataY

        // Now sum each of the y arrays of the datasets and add to dataY.
        if (aggregationOfDatasets === "sum"){
            Object.values(data).forEach((dataset) => {
                dataY = dataY.map((v, i) => v + dataset[y][i])
            })
        }
        else if (aggregationOfDatasets === "mean"){
            Object.values(data).forEach((dataset) => {
                dataY = dataY.map((v, i) => v + dataset[y][i])
            })
            dataY = dataY.map(x => x / Object.keys(data).length);
        }
        
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


export function setHeatmapData(data, x, y, color='YlGn', globalMax=true){
    // Transform the data into heatmap form
    var datasets = [];
    const settings = {borderWidth: 1, borderRadius: {topLeft: 10, topRight: 10, bottomLeft: 10, bottomRight: 10}, borderSkipped: false}
    const maxY = maxData(data, y);
    
    const minGamma = 0.1;
    const minGammaY = 10;
    const maxGamma = 1.0;
    const maxGammaY = 1200;

    // Set gamma to be max (i.e., 1) if maxY is below threshold
    var gamma = maxGamma;
    if (maxY > minGammaY) {
        // Set gamma accordingly if within threshold range - use exponential decay.
        const decayConstant = Math.log(minGamma) / - (maxGammaY - minGammaY)
        gamma = Math.exp(-decayConstant * (maxY - minGammaY))
    }

    const colorScheme = chroma.scale(color).gamma(gamma);

    for (const user in data) {
        var userData = []
        var colours = []
        const userMaxY = Math.max(...data[user][y])
        for (var i=0; i < data[user][x].length; i++) {
            userData.push({x: [i, i+1], y: user, v: data[user][y][i], d: data[user][x][i]})
            if (globalMax) {
                colours.push(colorScheme(data[user][y][i] / maxY));
            }
            else {
                colours.push(colorScheme(data[user][y][i] / userMaxY));
            }
        }
        datasets.push({label: user, data: userData, backgroundColor: colours,  hoverBackgroundColor: colours, hoverBorderWidth: 2, ...settings});
    }

    return {
        datasets: datasets
    }
}


function maxData(data, axis) {
    return Math.max.apply(Math, Object.values(data).map((userData) => {
        return Math.max(...userData[axis])
    }))
}

export function heatmapMaxDataX(data, axis) {
    return Object.values(data)[0][axis].length
}


export function setHeatmapOptions(options){
    const xTitleOption = {
        display: options.hasOwnProperty("xTitle") ? true : false,
        text: options.hasOwnProperty("xTitle") ? options.xTitle : null,
    }

    const yTitleOption = {
        display: options.hasOwnProperty("yTitle") ? true : false,
        text: options.hasOwnProperty("yTitle") ? options.yTitle : null,
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
                labels: {
                    generateLabels(chart) {
                      const data = chart.data;
                      if (data.labels.length && data.datasets.length) {
                        const {labels: {pointStyle}} = chart.legend.options;
            
                        return data.labels.map((label, i) => {
                          const meta = chart.getDatasetMeta(i);
                          const style = meta.controller.getStyle(i);
                          
                          return {
                            text: label,
                            fillStyle: style.backgroundColor,
                            strokeStyle: style.borderColor,
                            lineWidth: style.borderWidth,
                            pointStyle: pointStyle,
                            hidden: meta.hidden,
                            index: i
                          };
                        });
                      }
                      return [];
                    }
                },
                onClick: function(e, legendItem, legend) {
                    // Hide all other legend items and change the state of the selected legendItem.
                    let chart = legend.chart;

                    chart._metasets.forEach(function(ds) {
                        if (ds.label === legendItem.text) {ds.hidden = !ds.hidden || null}
                    });
                    chart.update();
                }
            },
            tooltip: {
                callbacks: {
                    label: function(tooltipItem) {
                        const tooltip = tooltipItem.dataset.data[tooltipItem.dataIndex]
                        return tooltip.d + ': ' + tooltip.v;
                    }
                }
            }
        },
        indexAxis: 'y',
        scales : {
            x: {
                title: xTitleOption,
                display: true,
                stacked: true,
                min: 0,
                max: options.hasOwnProperty("maxX") ? options.maxX : null,
                grid: {
                    display: false
                },
                ticks: {
                    color: "transparent",
                }
            },
            y : {
                title: yTitleOption,
                display: true,
                stacked: true,
                grid : {
                    display: false,
                    drawBorder: false
                }
            }
        },
        maintainAspectRatio: false,
        animation: {
            duration: 0
        },
        categoryPercentage: 1
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
