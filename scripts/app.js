// //My script for DOM manipulation 

const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const timeOfDay = document.querySelector('img.time');
const icon = document.querySelector('.icon img');

// updates user interface
const updateUI = (data) => {

    console.log(data);

    //the destructure properties
    const {cityDets, weather} = data;

    //updates the details template
    details.innerHTML = `
        <h5 class="my-3">${cityDets.EnglishName}</h5>
        <div class="my-3">${weather.WeatherText}</div>
        <div class="display-4 my-4">
            <span>${weather.Temperature.Imperial.Value}</span>
            <span>&deg;F</span>
        </div>
    `;

    // updates the card with a day or night image and updates the weather condition icons
    const iconSrc = `./images/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc);
    

    let timeSrc = weather.IsDayTime ? './images/day.svg' : './images/night.svg';

    // let timeSrc = null;
    // if(weather.IsDayTime){
    //     timeSrc = './images/day.svg';
    // } else {
    //     timeSrc = './images/night.svg';
    // }
    timeOfDay.setAttribute('src', timeSrc);

    // removes the class d-none (bootstraps version of display none) if present 
    if(card.classList.contains('d-none')){
        card.classList.remove('d-none');
    }

};
    

// updates the cityForm with a new city when typed in form 
const updateCity = async (city) => {

    const cityDets = await getCity(city);
    const weather = await getWeather(cityDets.Key);

    //!!!Remember you're using object shorthand notation!!!
    // the proper name and value have the same which allows me to do so
    /*remember the non-short hand was- return{ cityDets: cityDets, weather: weather}*/                                 
    return { cityDets, weather }
};




cityForm.addEventListener('submit', e => {
    //prevent default action from happening
    e.preventDefault();


    //get city value from user
    const city = cityForm.city.value.trim();
    //form reset after search
    cityForm.reset();


    //update the UI with new city; this is what the user typed in the form
    updateCity(city)
        .then((data) => updateUI(data))
        .catch(err => console.log(err));

    // set local storage
    localStorage.setItem('cityLocation', city);
        
});

// setting conditions for local storage
if(localStorage.getItem('cityLocation')){
    updateCity(localStorage.getItem('cityLocation'))
                        .then(data => updateUI(data))
                        .catch(err => console.log(err));
}


