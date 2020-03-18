// connection to the api and JSON parse data 

const ENDPOINT = "https://www.quandl.com/api/v3/datasets/WIKI/";
const KEY = "/data.json?api_key=Yb1WqRaFvoKardzS_a3V";

function getData(ticker, cb) {
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            cb(JSON.parse(this.responseText));
        }
    };

    xhr.open("GET", ENDPOINT + ticker + KEY);
    xhr.send();
}

// Below is the displayed chart - from Chart.js

var chart;
function createChart(dates, stockprices, companyName) {
    if(chart){
        chart.destroy();
    }

    var ctx = document.getElementById('myChart');
    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates, 
            datasets: [{
                lineTension: 0,
                label: companyName + ' stock price',
                data: stockprices, 
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
                        callback: function(value) {
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
    $('#loader').hide();
}

// search function and loop to get the stock price and date for a specific stock from API (user input)

function searchStock(ticker, companyName) {
    let dates = [];
    let stockprices = [];
    getData(ticker, function (data) {
        data = data.dataset_data.data.reverse(); //Array is reversed in order for the graph to display correctly  

        //pushes the specific arrays from the searchStock function to the arrays used in graph 

        data.forEach(function (item) {
            dates.push(item[0]);
            stockprices.push(item[4]);
        });
        createChart(dates, stockprices, companyName);
    });
}

//Below is a array inserted with pairings of tickers and company names using the added ticker.json file --> Inspiration from Traversy Media @ youtube


const search = document.getElementById('search');
const matchList = document.getElementById('match-list');

// search the ticker.json and use the input to filter 

const searchJSON = async searchText => {
    const res = await fetch('assets/data/ticker.json');
    const ticker = await res.json();
    
// get matches to current text input 

let matches = ticker.filter(stock => {
    const regex = new RegExp(`^${searchText}`, 'gi');
    return stock.company.match(regex) || stock.ticker.match(regex);
});

if(searchText.length === 0) {
        matches = [];
        matchList.innerHTML ='';
    }
    outputHtml(matches);
};

// show search results in html

const outputHtml = matches => {
    if(matches.length > 0) {
        const html = matches.map(match => `
            <div class="card card-body mb-4 search-card" id="card-body" onclick="searchStock('${match.ticker}','${match.company}')">
                <h4><span class="text-primary">${match.company}</span> (${match.ticker})</h4>
            </div>
        `).join('');
    matchList.innerHTML = html;
    }
};

search.addEventListener('input', () => searchJSON(search.value));

// gif shows when loading graph

$('#loader').hide();
$('#match-list').click(function(){
    $('#loader').show();
});
    



//  }

    // $.getJSON("https://www.quandl.com/api/v3/datasets/NASDAQOMX/NDX.json?api_key=Yb1WqRaFvoKardzS_a3V", function(nasdaq){
    //     console.log(nasdaq);
    // });
// }); 
