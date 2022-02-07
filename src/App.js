
import './App.css';
import {useState} from "react";
import SearchIcon from '@mui/icons-material/Search';
import ArrowUpwardTwoToneIcon from '@mui/icons-material/ArrowUpwardTwoTone';
import ArrowDownwardTwoToneIcon from '@mui/icons-material/ArrowDownwardTwoTone';
import DarkModeTwoToneIcon from '@mui/icons-material/DarkModeTwoTone';
import WbSunnyTwoToneIcon from '@mui/icons-material/WbSunnyTwoTone';

function App() {
  const [place, setPlace] = useState();
  const [day, setDay] = useState();
  const [placeInformation, setPlaceInformation] = useState({});
  
  const handleFetch = () => {
    fetch(`http://api.weatherapi.com/v1/forecast.json?key=e41e4f7afaf941a2b3a01952220202&q=${place}&days=${day}&aqi=no&alerts=no`)
    .then((response) => response.json())
    .then((data) =>
      setPlaceInformation({
        name: data.location.name,
        country: data.location.country,
        celcius: {
          current: data.current.temp_c,
          max: data.forecast.forecastday[0].day.maxtemp_c,
          min: data.forecast.forecastday[0].day.mintemp_c
        },
        condition: data.current.condition.text,
        astro:{
          sunrise: data.forecast.forecastday[0].astro.sunrise,
          moonphase: data.forecast.forecastday[0].astro.moon_phase
        },
      })
    );
  };

  console.log(placeInformation)

  return (
    <div className="main-container">
      <div className="header-container">
        <div className="search-input">
          <input 
          type = "text" 
          value = {place} 
          onChange = {(e) => setPlace(e.target.value)} />
          <SearchIcon 
          onClick={handleFetch}
          className="search-button"
          font-size="large"/>
        </div>
      </div>
      <div className="weather-container">
        <div className="localization">
          <h1>{placeInformation.name}, {placeInformation.country}</h1>
        </div>
        <h1>{placeInformation.celcius?.current}° C</h1>
        <div className="condition-max-min">
          <h1>The weather is {placeInformation.condition}</h1>
          <h1><ArrowUpwardTwoToneIcon/> {placeInformation.celcius?.max}° C</h1>
          <h1><ArrowDownwardTwoToneIcon/> {placeInformation.celcius?.min}° C</h1>
        </div>
        <div className="astro">
          <h1><WbSunnyTwoToneIcon/> Sunrise {placeInformation.astro?.sunrise}</h1>
          <h1><DarkModeTwoToneIcon/> {placeInformation.astro?.moonphase}</h1>
        </div>
      </div>
    </div>
  );
}

export default App;
