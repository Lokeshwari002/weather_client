import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'
import {assets} from '../../assets/assets'
import clear_icon from '../../assets/clear.png'
import cloud_icon from '../../assets/cloud.png'
import drizzle_icon from '../../assets/drizzle.png'
import rain_icon from '../../assets/rain.png'
import snow_icon from '../../assets/snow.png'


function Weather() {
  const inputRef=useRef();
   const[weather,setWeather]=useState(false)
  const allIcons={
    "01d":clear_icon,
    "01n":clear_icon,
    "02d":cloud_icon,
    "02n":cloud_icon,
    "03d":cloud_icon,
    "03n":cloud_icon,
    "04d":drizzle_icon,
    "04n":drizzle_icon,
    "09d":rain_icon,
    "09n":rain_icon,
    "10d":rain_icon,
    "10d":rain_icon,
    "13d":snow_icon,
    "13n":snow_icon
  }
  const search=async(city)=>{
    if(city===""){
      alert("Please Enter City Name")
      return;
    }
    try{
      const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`
      const response=await fetch(url)
      const data=await response.json()

      if(!response.ok){
        alert(data.message)
      }



      console.log(data)
      const icon=allIcons[data.weather[0].icon]
      // const code=data.weather[0].icon;
      // const icon= `https://openweathermap.org/img/wn/${code}@2x.png`
      setWeather({
        humidity:data.main.humidity,
        temperature:Math.floor(data.main.temp),
        wind:data.wind.speed,
        location:data.name,
        icon:icon 
      })

      await axios.post('https://weather-1-83k3.onrender.com/post', {
        location: data.name,
        temperature: Math.floor(data.main.temp),
        humidity: data.main.humidity,
        wind:data.wind.speed
      });


    }
      catch(error){
        alert("something went wrong .Please try again",err)
        setWeather(false)
        
}
  }
  
  

  return (
    
      <div className='weather'>
      <div className='search_icon'>
          <input type="text" ref={inputRef}  placeholder='Search'/>
          <img onClick={()=>search(inputRef.current.value)}src={assets.search} alt="" />
        </div>
{weather?<>
      <div className='temp_icon'>
        <img src={weather.icon} alt="" />
        <p>{weather.temp}<sup>o</sup>C</p>
        <p className='place'>{weather.location}</p>
      </div> 

      <div className='footer_icon'>
        <div className='left'>
        <img src={assets.humidity} alt="" />
        <p>{weather.humidity}%<br/>Humidity</p>
        </div>
        <div className='right'>
          <img src={assets.wind} alt="" />
          <p>{weather.windSpeed}km/h <br/> Wind speed</p>
          
        </div>
  </div> 
  </>:<></>}
      </div>
    
  )
}

export default Weather