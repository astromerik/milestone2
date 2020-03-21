// Connection to the api and JSON parse data. 

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

// Below is the displayed chart which draws the chard depending on the data it gets from the API (based on user input)
// The chart is gathered from the library "Chart.js" 

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
                        maxTicksLimit: 5, 
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

// Search function and loop to get the stock price and date for a specific stock from API (user input)

function searchStock(ticker, companyName) {
    let dates = [];
    let stockprices = [];
    let priceHigh = [];
    let priceLow = [];
    let priceClose = [];
    let lastDay = [];
    getData(ticker, function (data) {
        data = data.dataset_data.data.reverse(); //Array is reversed in order for the graph to display correctly  
        
        //Pushes the specific arrays from the function to the arrays used in graph and stock information box.
        // For dates and stockprices we grab all the historic data in order to display a graph. For the other prices we only take the prices for the last day.
        
        lastDay.push(data[data.length - 1][0]);
        priceHigh.push(data[data.length - 1][2]);
        priceLow.push(data[data.length - 1][3]);
        priceClose.push(data[data.length - 1][4]);

        data.forEach(function (item) {
            dates.push(item[0]);
            stockprices.push(item[4]);
        });

        // Use the above variables to be used in the "createChart" function or display it or display it on html (website) in regular text.

        createChart(dates, stockprices, companyName);
        $('#highest-price').text(priceHigh);
        $('#lowest-price').text(priceLow);
        $('#closing-price').text(priceClose);
        $('#date').text(lastDay);
    });
}


//Below is a array inserted with pairings of tickers and company names using the added data/ticker.json file


let search = document.getElementById('search');
let matchList = document.getElementById('match-list');

// search the ticker.json and use the input to filter 

let searchJSON = async function(searchText) {
    let res = await fetch('assets/data/ticker.json');
    let ticker = await res.json();
    
// get matches to current text input 

let matches = ticker.filter(function (stock) {
    let regex = new RegExp(`^${searchText}`, 'gi');
    return stock.company.match(regex) || stock.ticker.match(regex);
});

// Clear the list if the user delets or have a empty search box 

if(searchText.length === 0) {
        matches = [];
        matchList.innerHTML ='';
    }
    outputHtml(matches);
};

// show search results in html

let outputHtml = function(matches) {
    if(matches.length > 0) {
        let html = matches.map(match => `
            <div class="card card-body mb-4 search-card" id="card-body" onclick="searchStock('${match.ticker}','${match.company}')">
                <h4><span class="text-primary">${match.company}</span> (${match.ticker})</h4>
            </div>
        `).join('');
    matchList.innerHTML = html;
    }
};

search.addEventListener('input', function() {
    searchJSON(search.value);
});

// gif shows when loading graph and stock-info-boxes appear when alternatives in list are being clicked

$('#loader').hide();
$('#info-box1').hide();
$('#info-box2').hide();
$('#info-box3').hide();
$('#info-box4').hide();
$('#match-list').click(function(){
    $('#loader').show();
    $('#info-box1').show();
    $('#info-box2').show();
    $('#info-box3').show();
    $('#info-box4').show();
});

