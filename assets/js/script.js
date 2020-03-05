const ENDPOINT = "https://www.quandl.com/api/v3/datasets/WIKI/";
const KEY = "/data.json?api_key=Yb1WqRaFvoKardzS_a3V";

function getData(type, cb){
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            cb(JSON.parse(this.responseText));
        }
    };

    xhr.open("GET", ENDPOINT + type + KEY);
    xhr.send();
}

function searchStock(type) {
    let el = document.getElementById("data")
    el.innerHTML = "";
    getData(type, function(data) {
        
        data = data.dataset_data.data
        data.forEach(function(item){
            el.innerHTML += item[0] + item[4];
        })        
    })
}

let input = "Facebook"; //need to change to be a changable variable depending on input

// const y = item[4]
// const x = item[0]

// Below is the displayed chart - from Chart.js

var ctx = document.getElementById('chart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'], //change the data to date
        datasets: [{
            lineTension: 0,
            label: input + ' stock price',
            data: [12, 19, 3, 5, 2, 3], //change the data to stock prices
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







    // $.getJSON("https://www.quandl.com/api/v3/datasets/WIKI/FB/data.json?api_key=Yb1WqRaFvoKardzS_a3V", function(data){
    // console.log(data);
    // });

    // // let chart = 
    // $.getJSON("https://www.quandl.com/api/v3/datasets/NASDAQOMX/NDX.json?api_key=Yb1WqRaFvoKardzS_a3V", function(nasdaq){
    //     console.log(nasdaq);
    // });
// }); 

// 

//     $(".fa-dot-circle").click(function(){
//         alert("hey");
//     });
// 