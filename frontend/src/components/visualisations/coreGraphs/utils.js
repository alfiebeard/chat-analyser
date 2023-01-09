import chroma from "chroma-js";

export function setGraphData(data, x, y, label, color, stacked=false){
    // If stacked - set number of colours equal to number of datasets.
    if (stacked) {color = Object.keys(data).length}

    // If color is a number, e.g., 5, then get color scheme for this
    if (!isNaN(color)) {
        color = colorScheme(color)
    }

    if (stacked) {
        const labels = data[Object.keys(data)[0]][x]
        const datasets = Object.keys(data)
            .map((user, i) => (
                {
                    label: user,
                    data: data[user][y],
                    // borderColor: 'rgb(75, 192, 192)',
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
                // borderColor: 'rgb(75, 192, 192)',
                backgroundColor: color
            }
        ]

        return {
            labels: labels,
            datasets: datasets
        }
    }
}

export function setOptions(title, xTitle=null, stacked=false, yTitle=null, showAxes=true, displayLegend=true){
    const xTitleOption = {
        display: false,
    }

    const yTitleOption = {
        display: false,
    }

    if (xTitle) {
        const xTitleOption = {
            display: true,
            text: xTitle,
        }
    }

    if (yTitle) {
        const yTitleOption = {
            display: true,
            text: yTitle,
        }
    }

    return {
        plugins: {
            title: {
                display: true,
                text: title
            },
            legend: {
                display: displayLegend,
                position: 'bottom'
            }
        },
        scales : {
            x: {
                title: xTitleOption,
                display: showAxes,
                stacked: stacked
            },
            y : {
                title: yTitleOption,
                display: showAxes,
                stacked: stacked,
                // max: 2500    // Add a max to fix y axis and prevent rescaling
            }
        },
        maintainAspectRatio: false
    }
}

function colorScheme(n, shuffle=true){
    const scheme = chroma.scale('Spectral');
    const palette = [];
    for (let i=0; i<n; i++){
        palette.push(scheme(i / n).hex());
    }

    if (shuffle) {

    }

    return palette
}
