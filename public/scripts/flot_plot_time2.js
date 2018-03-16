var data = [];
var dataset;
// var totalPoints = 100;

// var updateInterval = 1000;
var updateValue = $('#data-interval').val(); //should get initialized after start btn
var updateUnit = $('#data-intv-sel').find(":selected").text(); //should get initialized after start btn
var updateInterval = getValueInSeconds(updateValue, updateInterval);


// NOTE: Bootstrap responsive <div> size for flot plot is needed.
// 



// set xmin/max and ymin/max based on user inputs
// remove set timer amount and have it take data indefinitely
// until the stop button is pressed or the max size is reached.

//xmin is the first time value from data minus one tick interval
var xmin = 0, xmax = 0,
    ymin = 0, ymax = 100;

var ytick = 10; // displayed yaxis label interval
var xtick_major = 5; // displayed xaxis label interval (seconds)
var xtick_minor = 2; // the ticks in between the labels

var x = 0; // time
var y = 0; // temperature

// Eventually add zooming and panning with
// the flot navigation plugin!!!!

var options = {
    series: {
        lines: {
            show: true,
            lineWidth: 1.2
            // fill: true
        }
    },
    xaxis: {
        mode: "time",
        tickSize: [xtick_minor, "second"],
        // zoomRange: [min, max],
        // panRange: [min, max],
        tickFormatter: function (v, axis) {
            var date = new Date(v);

            if (date.getSeconds() % xtick_major == 0) {
                var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
                var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
                var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();

                return hours + ":" + minutes + ":" + seconds;
            } else {
                return "";
            }
        },
        axisLabel: "Time",
        axisLabelUseCanvas: true,
        axisLabelFontSizePixels: 10,
        axisLabelFontFamily: 'Verdana, Arial',   
        axisLabelPadding: 10
        // ticks: function (axis) {
        //     if (axis.max > 10) {
        //         return axis.tickGenerator(axis);
        //     }
        // }
    },
    yaxis: {
        min: y - 20, // todo: make ui control
        max: y + 20,
        // zoomRange: [1, 150],
        // panRange: [calculateMinY() - ytick, calculateMaxY + ytick],
        // panRange: [-50, 150],
        tickSize: 5,
        tickFormatter: function (v, axis) {
            if (v % ytick == 0) {
                return v + "\xB0F";
            } else {
                return "";
            }
        },
        axisLabel: "Temperature",
        axisLabelUseCanvas: true,
        axisLabelFontSizePixels: 10,
        axisLabelFontFamily: 'Verdana, Arial',
    },
    legend: {        
        labelBoxBorderColor: "#000000" // was #fff
    }
    // zoom: {
    //     interactive: true
    // },
    // pan: {
    //     interactive: true
    // }
    // grid: {                
        // backgroundColor: "#000000",
        // tickColor: "#008040"
    // }
};


$(document).ready(function () {
    default_plot(); // plot blank canvas
});


function plotData() {
    options['yaxis']['min'] = y - 20;
    options['yaxis']['max'] = y + 20;

    // adjust time range:
    if (data.length / xtick_major > 8) {
        // xtick_minor = 2 * xtick_minor;
        xtick_major = 2 * xtick_major;
        if (xtick_major / xtick_minor > 8) {
            xtick_minor = 2 * xtick_minor;
        }
        options['xaxis']['tickSize'] = [xtick_minor, "second"];
    }

    dataset = [
        { data: data, options: options }
    ]; // formed into a dataset for flot
    var plot = $.plot($("#placeholder"), dataset, options); //plot data in <div>
    plot.setData(dataset);
    plot.setupGrid();
    plot.draw();
}


function GetData(jsonData) {

    //jsonData = {'time': hh:mm:ss, 'data': 00.00}

    var xy_pair;

    // add current value from incoming data
    y = parseFloat(jsonData['data']); // get temperature value

    var now = new Date().getTime();

    // x = Date.parse(jsonData['time']); // get timestamp (todo)
    x = now;
    xy_pair = [x, y];
    data.push(xy_pair);

    plotData();

}


function getValueInSeconds(val, unit) {
    // convert time into seconds
    if (unit == "seconds") {
        return val;
    }
    else if (unit == "minutes") {
        return 60 * val;
    }
    else if (unit == "hours") {
        return 60 * 60 * val;
    }
    else {
        return null;
    }
}


function default_plot() {
    $.plot($('#placeholder'), [], options);
}


function calculateMinY() {
    var min;
    var yaxis = [];
    for (var i = 0; i < data.length; i++) {
        yaxis.append(data[i][1]);
    }
    return Math.min.apply(null, yaxis);
}
function calculateMaxY() {
    var max;
    var yaxis = [];
    for (var i = 0; i < data.length; i++) {
        yaxis.append(data[i][1]);
    }
    return Math.max.apply(null, yaxis);
}
function calculateMinX() {
    var min;
    var xaxis = [];
    for (var i = 0; i < data.length; i++) {
        xaxis.append(data[i][1]);
    }
    return Math.min.apply(null, xaxis);
}
function calculateMinX() {
    var max;
    var xaxis = [];
    for (var i = 0; i < data.length; i++) {
        xaxis.append(data[i][1]);
    }
    return Math.max.apply(null, xaxis);
}