import './Weather.css';
import search from '../../assets/search.png';
import clear from '../../assets/clear.png';
import cloud from '../../assets/cloud.png';
import drizzle from '../../assets/drizzle.png';
import rain from '../../assets/rain.png';
import snow from '../../assets/snow.png';
import humidity from '../../assets/humidity.png';
import wind from '../../assets/wind.png';
import { useEffect, useRef, useState } from 'react';


export const Weather = () => {
    const inputref=useRef()
    const[weatherData,setWeatherData]=useState(false)

    const allIcons={
        "01d":clear,
        "01n":clear,
        "02d":cloud,
        "02n":cloud,
        "03d":cloud,
        "03n":cloud,
        "04d":drizzle,
        "04n":drizzle,
        "09d":rain,
        "09n":rain,
        "010d":rain,
        "010n":rain,
        "13d":snow,
        "13n":snow
    }
const search_city=async(cityName)=>{
    if(cityName===""){
        alert("Enter city name")
        return;
    }
    try{
        const url=`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
        const response= await fetch(url)
        const data=await response.json()
        if(!response.ok){
            alert(data.message)
            return
        }
        console.log(data)
        const icon=allIcons[data.weather[0].icon]||clear
        setWeatherData({
            humidity: data.main.humidity,
            windSpeed :data.wind.speed,
            temperature: Math.floor(data.main.temp),
            location:data.name,
            icon:icon

        })
       

    }catch(error){
        setWeatherData(false)
        console.error("Error in fetching weather data")

    }
}
useEffect(()=>{
search_city("New york")
},[])

  return (
    <div className='weather'>
        <div className="search-bar">
            <input ref={inputref} type="text" placeholder='Search' />
            <img src={search} alt="" onClick={()=>search_city(inputref.current.value)} />
        </div>
        {weatherData?<>
       <img src={weatherData.icon} alt="" className='weather-icon' />
       <p className='temperature'>{weatherData.temperature}c</p>
       <p className='location'>{weatherData.location}</p>
       <div className="weather-data">
        <div className="col">
            <img src={humidity} alt="" />
            <div>
            <p>{weatherData.humidity}%</p>
            <span>Humidity</span>
            </div>

        </div>
         <div className="col">
            <img src={wind} alt="" />
            <div>
            <p>{weatherData.windSpeed} km/h</p>
            <span>Wind Spead</span>
            </div>

        </div>
       </div>
       </>:<></>}
    </div>
  )
}
