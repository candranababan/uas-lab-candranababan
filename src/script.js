import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
const cityHide = document.querySelector('.city-hide');

search.addEventListener('click', () => {

    require('dotenv').config();

    const city = document.querySelector('.search-box input').value;
    const apiKey = process.env.MY_API_key;
    
    if (city == '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.MY_API_key}`)
    .then(response => response.json())
    .then(json => {
        if (json.cod === '404') { 
            container.style.height = '400px';
            weatherBox.classList.remove('active');
            weatherDetails.classList.remove('active');
            error404.classList.add('active');
            return;
        }

        container.style.height = '555px';
        weatherBox.classList.add('active');
        weatherDetails.classList.add('active');
        error404.classList.remove('active');

        const image = document.querySelector('.weather-box img');
        const temperature = document.querySelector('.weather-box .temperature');
        const description = document.querySelector('.weather-box .description');
        const humidity = document.querySelector('.weather-details .humidity span');
        const wind = document.querySelector('.weather-details .wind span');

        switch (json.weather[0].main) {
            case 'Clear':
                image.src = 'images/clear.png';    
                break;
            case 'Rain':
                image.src = 'images/rain.png';    
                break;
            case 'Snow':
                image.src = 'images/snow.png';    
                break;
            case 'Clouds':
                image.src = 'images/cloud.png';    
                break;
            case 'Mist':
            case 'Haze': 
                image.src = 'images/mist.png';    
                break;
            default:
                image.src = 'images/cloud.png';
        }

        temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
        description.innerHTML = `${json.weather[0].description}`;
        humidity.innerHTML = `${json.main.humidity}%`;
        wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;
    });
});

const goToAskButton = document.getElementById('go-to-ask');
const linkSelect = document.getElementById('link-select');

goToAskButton.addEventListener('click', () => {
    const selectedLink = linkSelect.value;
    window.open(selectedLink, '_blank');
});
