import React,{useState, useEffect} from 'react'
import SearchIcon from '@mui/icons-material/Search';
import './weather.css'

function WeatherApp() {
    const [inputVal , setInputVal ]= useState([])

  return (
    <div>
        <h2 className='heading'>Weather Application</h2>
       <div className='search_input'>
        <input placeholder='Search city....'
        type='text'
        value={inputVal}
        onChange={(e)=>setInputVal(e.target.value)}
        ></input>
        <span><SearchIcon/></span>
       </div>
    </div>
  )
}

export default WeatherApp