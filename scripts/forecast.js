// My script for getting APIs





// API key
const key = 'JI1TJuG3hGDaj0o6coxqw7yd4Llk5i2r';



// This gets the weather information 
//The parameter of getWeather will be the cities key properity
const getWeather = async (idOfLocation) => {

    const base = 'http://dataservice.accuweather.com/currentconditions/v1/';
    const query =  `${idOfLocation}?apikey=${key}`;


    const response = await fetch(base + query);
    const data = await response.json();

    // returning the first value in the index
    return data[0];
};






// This gets the city information
const getCity = async (city) => {

    const base = 'http://dataservice.accuweather.com/locations/v1/cities/search';
    const query =`?apikey=${key}&q=${city}`;

    const response = await fetch(base + query);
    const data = await response.json();

    // returning the first value in the index
    return data[0];
}




//Testing out the async & await functions
//  getCity('phoenix').then(data => {
//     return getWeather(data.Key);
// }).then(data => {
//     console.log(data);
// }).catch(err => console.log(err));




