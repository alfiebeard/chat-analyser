import chroma from "chroma-js";

export function setGraphData(x, y, label, color){
    // If color is a number, e.g., 5, then get color scheme for this
    if (!isNaN(color)) {
        color = colorScheme(color)
    }

    return {
        labels: x,
        datasets: [
            {
                label: label,
                data: y,
                // borderColor: 'rgb(75, 192, 192)',
                backgroundColor: color
            }
        ]
    }
}

export function setOptions(title, xTitle=null, yTitle=null, showAxes=true, displayLegend=true){
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
                display: showAxes
            },
            y : {
                title: yTitleOption,
                display: showAxes
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
