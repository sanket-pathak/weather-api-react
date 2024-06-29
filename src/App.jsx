import { useState, useEffect, useRef } from 'react'
import './App.css'

function App() {
//for search functionality at the very last
const inputRef = useRef()

  //declared empty array set
  const [weatherdata, setWeatherdata] = useState([])

  //create asynchronous fucntion

  const search = async (city)=> {
      let initialData = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_APP_ID}`);
      let data = await initialData.json()
//we're putting the data from "weatherdata" object array only...really important point to note down

setWeatherdata({
        humidity: data.main.humidity,
        windspeed: data.wind.speed, 
        temperature: Math.floor(data.main.temp - 273),
        location: data.name,
        country: data.sys.country,
        actualTemp: Math.floor(data.main.feels_like - 273),
      })
    }   

  useEffect(() => {
      search('')
  }, [])
    
  useEffect(()=>{
    document.addEventListener('keydown', detectKeyDown, true)
  }, [])

  const detectKeyDown = (e) =>{
    if(e.keyCode===13){
      search(inputRef.current.value)
    }
  }


  return (
    <>
    <div className='body'>
    <div className='container'>
      <div className='search-layout'>
        <input ref={ inputRef } type="text" id="search-box" placeholder='Enter City Name' ></input>
        <button onClick={()=>search(inputRef.current.value)} >Search</button>
      </div>
          <div className='temperature'>
            {weatherdata.temperature}°C
          </div>
          <div className='feels-like'>Feels Like {weatherdata.actualTemp}</div>
          <div className='cityName'>
            {weatherdata.location}, {weatherdata.country}
          </div>

          <div className='weather-data'>
              <div className='humidity'>
              <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="black"><path d="M480-100q-133 0-226.5-92T160-416q0-63 24.5-120.5T254-638l226-222 226 222q45 44 69.5 101.5T800-416q0 132-93.5 224T480-100Zm0-80q100 0 170-68.5T720-416q0-47-18-89.5T650-580L480-748 310-580q-34 32-52 74.5T240-416q0 99 70 167.5T480-180Z"/></svg>
                <p>{weatherdata.humidity}%</p>
                <span>Humidity</span>
              </div>
              <div className='windspeed'>
              <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="black"><path d="M460-160q-50 0-85-35t-35-85h80q0 17 11.5 28.5T460-240q17 0 28.5-11.5T500-280q0-17-11.5-28.5T460-320H80v-80h380q50 0 85 35t35 85q0 50-35 85t-85 35ZM80-560v-80h540q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43h-80q0-59 40.5-99.5T620-840q59 0 99.5 40.5T760-700q0 59-40.5 99.5T620-560H80Zm660 320v-80q26 0 43-17t17-43q0-26-17-43t-43-17H80v-80h660q59 0 99.5 40.5T880-380q0 59-40.5 99.5T740-240Z"/></svg>
                <p>{weatherdata.windspeed}kph</p>
                <span>Windspeed</span>
              </div>
          </div>
    </div>
    </div>
    </>
  )
}

export default App
