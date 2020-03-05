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

// search function and loop to get the stock price and date for a specific stock 

function searchStock(type) {
    var type = document.getElementById('search').value;
    getData(type, function (data) {
        data = data.dataset_data.data
        data.forEach(function (item) { 
            console.log(item[0] + " " + item[4]);
        
            //pushes the specific arrays from the searchStock function to the arrays used in graph 
            var date = item[0];
            dates.push(date);
            var price = item[4];
            stockprices.push(price);
        })
    })
}

var dates = [];
console.log(dates);
var stockprices = [];
console.log(stockprices);

var input = document.getElementById('search').value; //need to change to be a changable variable depending on input

// Below is the displayed chart - from Chart.js

var ctx = document.getElementById('chart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: dates, //change the data to date (item[0])
        datasets: [{
            lineTension: 0,
            label: input + ' stock price',
            data: stockprices, //change the data to stock prices (item[4])
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});


    // $.getJSON("https://www.quandl.com/api/v3/datasets/NASDAQOMX/NDX.json?api_key=Yb1WqRaFvoKardzS_a3V", function(nasdaq){
    //     console.log(nasdaq);
    // });
// }); 

// 

// *************************** site functionality **************************************

//     $(".fa-dot-circle").click(function(){
//         alert("hey");
//     });
// 