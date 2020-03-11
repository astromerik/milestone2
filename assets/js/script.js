// connection to the api and JSON parse data 

const ENDPOINT = "https://www.quandl.com/api/v3/datasets/WIKI/";
const KEY = "/data.json?api_key=Yb1WqRaFvoKardzS_a3V";

function getData(type, cb) {
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            cb(JSON.parse(this.responseText));
        }
    };

    xhr.open("GET", ENDPOINT + type + KEY);
    xhr.send();
}

var chart;
function createChart(dates, stockprices) {

    // Below is the displayed chart - from Chart.js
    
    if(chart){
        chart.destroy();
    }

    var ctx = document.getElementById('myChart');
    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates, //change the data to date (item[0])
            datasets: [{
                lineTension: 0,
                label: input + ' stock price',
                data: stockprices, //change the data to stock prices (item[4])
                backgroundColor: [
                    'rgba(255, 255, 255, 0.7)',
                ],
                borderColor: [
                    'rgba(0, 0, 0)',
                ],
                borderWidth: 1,
                radius: 0,
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        fontColor: "black", 
                        callback: function(value, index, values) {
                            return value + ' $';
                        }
                    }
                }],
                xAxes: [{
                    ticks: {
                        maxTicksLimit: 10,
                        beginAtZero: true,
                        fontColor: "black", 
                    }
                }]
            }
        }
    });
}

//need to change to be a changable variable depending on input


var input = document.getElementById('search').value;

// search function and loop to get the stock price and date for a specific stock (user input)

function searchStock() {
    let = dates = [];
    let = stockprices = [];
    var type = document.getElementById('search').value;
    getData(type, function (data) {
        data = data.dataset_data.data.reverse(); //We need to reverse the array in order for the graph to display properly 
        data.forEach(function (item) {

            //pushes the specific arrays from the searchStock function to the arrays used in graph 

            dates.push(item[0]);
            stockprices.push(item[4]);
        });
        createChart(dates, stockprices);
    });
}


 function removePara(){
     searchText.removeChild(placeHolderText);
 }

    // $.getJSON("https://www.quandl.com/api/v3/datasets/NASDAQOMX/NDX.json?api_key=Yb1WqRaFvoKardzS_a3V", function(nasdaq){
    //     console.log(nasdaq);
    // });
// }); 
