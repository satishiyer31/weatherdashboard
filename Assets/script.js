// console.log("js loaded");

var searchEl = document.querySelector("#search-city");
var searchBtn = document.querySelector("#search-btn");
const APIKEY = 'f4103f029751b20b503dba5bd92c8246';
var baseUrl = 'api.openweathermap.org/data/2.5/weather?q=';

searchBtn.addEventListener('click',function(event){

    //extract search city
    var searchCity = searchEl.value;
    event.preventDefault();
    
    var queryUrl = baseUrl+searchCity+'&appid='+APIKEY;
    console.log(queryUrl);

    var requestOptions = {
        method: 'GET',
        redirect: 'follow',
        mode: 'cors'
      };
    
    fetch(queryUrl,requestOptions)
        .then(function(response){
            if (response.ok)
            return response.json();

        }) 
        .then(function(data){
            console.log(data);
        })

    



    //call API for current day & 5 day forecast

    //populate local storage

})

