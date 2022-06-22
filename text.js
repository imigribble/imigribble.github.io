// BAR GRAPH
var plotDiv3 = document.getElementById('myBar');
// load csv
var dataSource3 = "manufactoring output by country 2018.csv";

function loadData3() {
    Plotly.d3.csv(dataSource3, function(data3) {
        processData3(data3)
    });
};

// declare variables
function processData3(allRows3) {
    console.log(allRows3);
    let x2 = [],
        y2 = [];
    for (let i = 0; i < allRows3.length; i++) {
        let row3 = allRows3[i];
        x2.push(row3['Country Name']);
        y2.push(row3['Manufactoring output (2018)']);
    }

    makeBar(x2, y2);
}

function makeBar(x2, y2) {
    var traces3 = [{
        x: x2,
        y: y2,

        // set up bar graph
        type: 'bar',
        orientation: 'v',
        marker: {
            color: 'rgb(75,163,145)',
            opacity: 0.5,
        },
    }];

    // customise title, font and layout
    var layout3 = {
        title: 'Manufactoring output by top 10 countries, 2018',
        hovermode: "closest",
        hoverlabel: {
            bgcolor: "#FFF"
        },

        font: {
            size: 11,
            family: "Henriette",
            color: "dark grey"
        },
        xaxis: {
            title: "Country",
        },
        yaxis: {
            title: "Trillions of dollars (USD)",
        },
    }

    Plotly.newPlot('myBar', traces3, layout3);
};

loadData3();




// SCATTERPLOT
// Adapted from Plotly (2022). Hover Text and Formatting in JavaScript. Retrieved from: https://plotly.com/javascript/hover-text-and-formatting/
// Adapted from Plotly (2022). Bubble Charts in JavaScript. Retrieved from: https://plotly.com/javascript/bubble-charts/
var plotDiv = document.getElementById('myScatter');
var dataSource = "air pollution deaths condensed.csv";

function loadData() {
    Plotly.d3.csv(dataSource, function(data) {
        processData(data)
    });
}

// declare variables
function processData(allRows) {
    console.log(allRows);
    let x = [],
        y = [],
        z = [],
        s = [];

    // push rows used in the plotly chart
    for (let i = 0; i < allRows.length; i++) {
        let row = allRows[i];
        y.push(row["Outdoor air pollution deaths (per 100,000 individuals)"]);
        x.push(row["GDP per capita (international $)"]);
        s.push(row["Population"]);
        z.push(row["Country"]);
    }

    makeScatter(x, y, z, s);
}

function makeScatter(x, y, z, s) {
    var traces = [{
        x: x,
        y: y,
        // set up hovermode
        text: z,
        hoverinfo: "x+y+z",
        hovertemplate: '<b>%{text}</b><br>' +
            'Deaths: %{y:.0f}' +
            '<br>GDP: %{x:$,.0}<br><extra></extra>',
        // styling + customising marker size based on country population
        mode: "markers",
        marker: {
            size: s,
            sizeref: 600000,
            sizemode: "area",
            color: y,
            colorscale: [
                ['0.0', '#3E0D52'],
                ['0.111111111111', '#413D7E'],
                ['0.222222222222', '#3D6189'],
                ['0.333333333333', '#43868C'],
                ['0.444444444444', '#54A983'],
                ['0.555555555556', '#76C370'],
                ['0.666666666667', '#A6D459'],
                ['0.777777777778', '#D0DD4F'],
                ['0.888888888889', '#F3E355'],
                ['1.0', '#FFE83A'],
            ],
            opacity: 0.6,
        }
    }, ];

    // layout + font styling
    var layout = {
        title: "Death rate from outdoor air pollution vs GDP per capita, 2019",
        font: {
            size: 11,
            family: "Henriette",
            color: "dark grey",
        },
        xaxis: {
            title: "GDP per capita",
            type: 'log',
            autorange: true
        },
        yaxis: {
            title: "Outdoor air pollution deaths",
        },

        showlegend: false,
    }

    var data = [traces];

    var config = {
        responsive: true,
        scrollZoom: true,
        displayModeBar: false,
    };

    Plotly.newPlot('myScatter', traces, layout);
}

loadData();




// BUTTONS FOR CHOROPLETH TOGGLE
// Adapted from CodeGrepper (2022). Javascript replace div content onclick a button. Retrieved from: https://www.codegrepper.com/code-examples/javascript/Javascript+replace++div+content+onclick+a+button
function replace() {
    document.getElementById("myGdp").style.display = "none";
    document.getElementById("myAir").style.display = "block";
}

function replaceAgain() {
    document.getElementById("myAir").style.display = "none";
    document.getElementById("myGdp").style.display = "block";
}




// GDP CHOROPLETH
// Adapted from Plotly (2022). Choropleth Maps in JavaScript. Retrieved from: https://plotly.com/javascript/choropleth-maps/
var plotDiv = document.getElementById('myGdp');
// load csv
var dataSource = "gdp per capita.csv";
Plotly.d3.csv('gdp per capita.csv', function(err, rows) {
    function unpack(rows, key) {
        return rows.map(function(row) {
            return row[key];
        });
    }

    // unpack variables
    var data = [{
        type: 'choropleth',
        locationmode: 'country names',
        locations: unpack(rows, 'Entity'),
        z: unpack(rows, 'GDP per capita'),
        text: unpack(rows, 'Entity'),

        colorscale: [
            ['0.0', '#3E0D52'],
            ['0.111111111111', '#413D7E'],
            ['0.222222222222', '#3D6189'],
            ['0.333333333333', '#43868C'],
            ['0.444444444444', '#54A983'],
            ['0.555555555556', '#76C370'],
            ['0.666666666667', '#A6D459'],
            ['0.777777777778', '#D0DD4F'],
            ['0.888888888889', '#F3E355'],
            ['1.0', '#FFEA4A'],
        ],

        // set country outline to white
        marker: {
            line: {
                color: 'white',
                width: 0.4
            }
        },
    }];

    // customise font and layout
    var layout = {
        title: 'GDP per capita, 2019',
        font: {
            size: 11,
            family: "Henriette",
            color: "dark grey",
        },
        geo: {
            showframe: false,
            showcoastlines: false,
            showmargin: false,
            showcountries: true,
            projection: {
                type: 'Robinson'
            }
        }
    };

    Plotly.newPlot("myGdp", data, layout, {
        showLink: false
    });

})



// PM2.5 MEAN EXPOSURE CHOROPLETH
// Adapted from Plotly (2022). Choropleth Maps in JavaScript. Retrieved from: https://plotly.com/javascript/choropleth-maps/
var plotDiv = document.getElementById('myAir');
// load csv
var dataSource = "pm2.5 mean exposure by country 2019.csv";
Plotly.d3.csv('pm2.5 mean exposure by country 2019.csv', function(err, rows) {
    function unpack(rows, key) {
        return rows.map(function(row) {
            return row[key];
        });
    }
    // unpack variables
    var data = [{
        type: 'choropleth',
        locationmode: 'country names',
        locations: unpack(rows, 'Country'),
        z: unpack(rows, 'Value'),
        text: unpack(rows, 'Country'),
        colorscale: [
            ['0.0', '#3E0D52'],
            ['0.111111111111', '#413D7E'],
            ['0.222222222222', '#3D6189'],
            ['0.333333333333', '#43868C'],
            ['0.444444444444', '#54A983'],
            ['0.555555555556', '#76C370'],
            ['0.666666666667', '#A6D459'],
            ['0.777777777778', '#D0DD4F'],
            ['0.888888888889', '#F3E355'],
            ['1.0', '#FFEA4A'],
        ],

        // set country outline to white
        marker: {
            line: {
                color: 'white',
                width: 0.4
            }
        },
    }];
    // customise font and layout
    var layout = {
        title: 'PM2.5 mean exposure by country, 2019',
        font: {
            size: 11,
            family: "Henriette",
            color: "dark grey",
        },
        geo: {
            showframe: false,
            showcoastlines: false,
            showmargin: false,
            showcountries: true,
            projection: {
                type: 'Robinson'
            }
        }

    };

    Plotly.newPlot("myAir", data, layout, {
        showLink: false
    });
})




// LINE GRAPH
// Adapted from Plotly (2022). Line Charts in JavaScript. Retrieved from: https://plotly.com/javascript/line-charts/
var plotDiv2 = document.getElementById('myLine');
// load csv
var dataSource2 = "air pollution london.csv";

function loadData2() {
    Plotly.d3.csv(dataSource2, function(data2) {
        processData2(data2)
    });
};

// declare variables
function processData2(allRows2) {
    console.log(allRows2);
    let x1 = [],
        y1 = [];
    for (let i = 0; i < allRows2.length; i++) {
        let row2 = allRows2[i];
        x1.push(row2['Year']);
        y1.push(row2['Suspended Particulate Matter (SPM)']);
    }

    makeLine(x1, y1);
}

function makeLine(x1, y1) {
    var traces2 = [{
        x: x1,
        y: y1,

        mode: 'line',
        line: {
            color: 'rgb(60, 47, 157)',
            width: 2
        }
    }];

    // customise layout and font
    var layout2 = {
        title: 'Suspended Particulate Matter in London, 1700-2016',
        hovermode: "closest",
        hoverlabel: {
            bgcolor: "#FFF"
        },

        font: {
            size: 11,
            family: "Henriette",
            color: "dark grey"
        },
        xaxis: {
            title: "Year",
        },
        yaxis: {
            title: "PM2.5 Concentration",
        },

    }

    Plotly.newPlot('myLine', traces2, layout2);

};

loadData2();



// PARTICLE VISUALISATION- SCROLL
// Adapted from A Haworth (2022). Retrieved from: https://stackoverflow.com/users/10867454/a-haworth
const callback = (entries, observer) => {
    entries.forEach(entry => {
        // if entry intersects the screen, background colour will change
        if (entry.isIntersecting) {
            document.body.style.backgroundColor = entry.target.dataset.color;
        }
    });
};

const changes = document.querySelectorAll('.change');
// color change doesn't occur until the entry is 50% on screen
const observer = new IntersectionObserver(callback, {
    threshold: .75
});

changes.forEach(change => {
    observer.observe(change);
});