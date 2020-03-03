// $(document).ready(function(){

    let xhr = new XMLHttpRequest();

function search(){

    let inputValue = document.getElementById("search").value;

    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            data = JSON.parse(this.responseText);
        }};

    xhr.open("GET", "https://www.quandl.com/api/v3/datasets/WIKI/" + inputValue + "/data.json?api_key=Yb1WqRaFvoKardzS_a3V");
    xhr.send();

    setTimeout(function(){
        console.log(data);
    }, 1000);

}
    







// Below is the displayed chart - from Chart.js using inspiration from "The Code Train (youtube)"

// const ctx = document.getElementById('chart').getContext('2d');
// const xlabels = [];
// const ytemps = [];
// const myChart = new Chart(ctx, {
//     type: 'line',
//     data: {
//         labels: xlabels,
//         datasets: [
//             {
//             label: 'Price',
//             data: [12, 19, 3, 5, 2, 3],
//             backgroundColor: [
//                 'rgba(255, 99, 132, 0.2)',],
//             borderColor: [
//                 'rgba(255, 99, 132, 1)',],
//             borderWidth: 1
//         }]
//     },
//     options: {
//         scales: {
//             yAxes: [{
//                 ticks: {
//                     beginAtZero: true
//                 }
//             }]
//         }
//     }
// });







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