$(document).ready(function(){

    $.getJSON("https://www.quandl.com/api/v3/datasets/WIKI/FB/data.json?api_key=Yb1WqRaFvoKardzS_a3V", function(data){
    console.log(data);
    });

    // let chart = 
    $.getJSON("https://www.quandl.com/api/v3/datasets/NASDAQOMX/NDX.json?api_key=Yb1WqRaFvoKardzS_a3V", function(nasdaq){
        console.log(nasdaq);
    });
}); 

// 

//     $(".fa-dot-circle").click(function(){
//         alert("hey");
//     });
// 