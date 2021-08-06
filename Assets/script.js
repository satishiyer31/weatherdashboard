// console.log("js loaded");

var searchEl = document.querySelector("#search-city");
var searchBtn = document.querySelector("#search-btn");
const APIKEY = 'f4103f029751b20b503dba5bd92c8246';
var baseUrl = 'https://api.openweathermap.org/data/2.5/weather?q=';
var divEl = document.querySelector("#recent_searches");
var recentSearches =[];

searchBtn.addEventListener('click',function(){

    //extract search city
    var searchCity = searchEl.value;
    event.preventDefault();
    
    var queryUrl = baseUrl+searchCity+ '&units=imperial' +'&appid='+APIKEY;
    // console.log(queryUrl);

    //call API for current day 
    fetch(queryUrl)

    .then(function(response) {
        if (response.ok)
            return response.json();
        else {
            alert("Please enter a valid city");
            return;}
    })

    .then(function(data){
        // console.log(data);
        if(data.length !== 0)  // Only proceed if city is valid
        {
            getCityName(data);
            getWeather(data);
            addtoLocalStorage(searchCity);
            // addMostRecentSearch(searchCity);
        }
        
        
    })

})

// searchBtn.addEventListener('click',callWeatherApi());

function getCityName(weatherData) {

    document.querySelector("#cityname").textContent = weatherData.name;
    // document.querySelector("#temp0").textContent = weatherData.
 
}

//Extract coordinates from 1st API call and make 2nd API call for current weather & 5 day forecast using coordinates
function getWeather(weatherData) {

    var lon = weatherData.coord.lon;
    var lat = weatherData.coord.lat;

    var queryUrl2= "https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&units=imperial&exclude=minutely,hourly" + "&appid="+ APIKEY;

    fetch(queryUrl2)

    .then(function(response) {
        return response.json();
        
    })
    .then(function(data){
        // console.log(data);

        document.querySelector("#uvindex").textContent = data.current.uvi;
        if (data.current.uvi <2) {
            document.querySelector("#uvindex").setAttribute("class","green" );
        } 
        else if ((data.current.uvi >2)  &&  (data.current.uvi <5)) {
            document.querySelector("#uvindex").setAttribute("class","yellow" );
        }
        else 
            document.querySelector("#uvindex").setAttribute("class","red" );

        //loop through daily array for forecast
        for (let index = 0; index < 6; index++) {
            document.querySelector("#date"+index).textContent= moment.unix(data.daily[index].dt).format("MM/DD/YYYY"); //date
            document.querySelector("#icon"+index).setAttribute('src',"http://openweathermap.org/img/w/" + data.daily[index].weather[0].icon + ".png");
            if (index ==0) {
                document.querySelector("#temp"+index).textContent =data.current.temp;    
            }
            else
            document.querySelector("#temp"+index).textContent = data.daily[index].temp.max; //temp
            
            document.querySelector("#wind"+index).textContent= data.daily[index].wind_speed; //wind
            document.querySelector("#humidity"+index).textContent= data.daily[index].humidity; //wind
            
            
        }
    })
}

function addtoLocalStorage(cityName) {

    if (recentSearches.includes(cityName) ===false) {
        recentSearches.unshift(cityName);
        localStorage.setItem("recentSearches", JSON.stringify(recentSearches));
        addMostRecentSearch(cityName);
    }
    // console.log(recentSearches);
}


function showRecentSearches() {
    // console.log("Im here");
    if (JSON.parse(localStorage.getItem("recentSearches")))
    recentSearches = JSON.parse(localStorage.getItem("recentSearches"));
    // console.log(lastFewSearches);
//    if (recentSearches !==null) {
    var btn=[];
    const lineBreak =[];
    
    // console.log(divEl);

    for (let index = 0; index < recentSearches.length; index++) {
            btn[index] = document.createElement('button');
            btn[index].setAttribute("value",recentSearches[index]);
            btn[index].textContent = recentSearches[index];
            btn[index].setAttribute("class","button expanded secondary");
            lineBreak[index] = document.createElement("br");
            
            divEl.appendChild(btn[index]);
            divEl.appendChild(lineBreak[index]);
            
        }
        
    // }
}

function addMostRecentSearch(city) {
    var btn = document.createElement('button');
    btn.setAttribute("value",city );
    btn.textContent =city;
    btn.setAttribute("class","button expanded secondary");
    var lbr = document.createElement("br");
    divEl.prepend(lbr);
    divEl.prepend(btn);
    // divEl.appendChild(lbr);

}

divEl.addEventListener('click', function(event){
    if (event.target.matches("button")){
        // console.log("Button was clicked");
        searchCity = event.target.value;
        searchEl.value=searchCity;
        

        queryUrl = baseUrl+searchCity+ '&units=imperial' +'&appid='+APIKEY;
    // console.log(queryUrl);

    //call API for current day 
    fetch(queryUrl)

    .then(function(response) {
        if (response.ok)
            return response.json();
        else {
            alert("Please enter a valid city");
            return;}
    })

    .then(function(data){
        console.log(data);
        if(data.length !== 0)  // Only proceed if city is valid
        {
            getCityName(data);
            getWeather(data);
            addtoLocalStorage(searchCity);
            // addMostRecentSearch(searchCity);
        }
        
        
    })
    }
})



showRecentSearches();