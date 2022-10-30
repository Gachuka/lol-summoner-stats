import './SearchBarComponent.scss'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'


function SearchBarComponent() {

  const navigate = useNavigate()
  const [ search, setSearch ] = useState('')

  const handleOnChange = (event) => {
    setSearch(event.target.value)
    console.log(search)
  }

  const handleSubmit = () => {
    navigate(`/summoner/${search}`)
  }

  if (document.getElementById("search__input") && document.querySelector(".search__button")) {
    document.getElementById("search__input").addEventListener("keyup", (event) => {
    event.preventDefault();
    if (event.key === "Enter") {
      document.querySelector(".search__button").click();
    }
  })};

  return ( 
    <div className='search'>
      <input className='search__input' id='search__input' placeholder='Summoner Name' onChange={handleOnChange} value={search}/>
      <div className='search__button' onClick={handleSubmit}>Find</div>
    </div>
  )
}

export default SearchBarComponent