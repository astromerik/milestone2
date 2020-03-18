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
                label: document.getElementById('search').value + ' stock price',
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
            plugins: {
            zoom: {
                pan: {
                    enabled: true,
                    mode: 'xy',
                    threshold: 100,        
                },
                zoom: {
                    enabled: true,
                    mode: 'xy'
                }
            }
        },
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
}

// search function and loop to get the stock price and date for a specific stock (user input)

function searchStock(ticker) {
    let = dates = [];
    let = stockprices = [];
    getData(ticker, function (data) {
        data = data.dataset_data.data.reverse(); //We need to reverse the array in order for the graph to display properly 
        data.forEach(function (item) {

            //pushes the specific arrays from the searchStock function to the arrays used in graph 

            dates.push(item[0]);
            stockprices.push(item[4]);
        });
        createChart(dates, stockprices);
    });
}

//Below is a array inserted with pairings of tickers and company names --> Inspiration from Traversy Media @ youtube


const search = document.getElementById('search')
const matchList = document.getElementById('match-list')

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
        // show in html
const outputHtml = matches => {
    if(matches.length > 0) {
        const html = matches.map(match => `
            <div class="card card-body mb-4 search-card" onclick="searchStock('${match.ticker}')">
                <h4><span class="text-primary">${match.company}</span> (${match.ticker})</h4>
            </div>
        `).join('');
    matchList.innerHTML = html;
    }
};
search.addEventListener('input', () => searchJSON(search.value));


//more interactive functions - show 




//  function removePara(){
//      searchText.removeChild(placeHolderText);
//  }

    // $.getJSON("https://www.quandl.com/api/v3/datasets/NASDAQOMX/NDX.json?api_key=Yb1WqRaFvoKardzS_a3V", function(nasdaq){
    //     console.log(nasdaq);
    // });
// }); 
