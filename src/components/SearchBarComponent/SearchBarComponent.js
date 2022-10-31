import './SearchBarComponent.scss'

import searchIcon from '../../assets/icons/search.svg'

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
      <div className='search__container'>
        <input className='search__input' id='search__input' placeholder='Summoner Name' onChange={handleOnChange} value={search}/>
        <div className='search__button' onClick={handleSubmit}>
          <img className='search__icon' src={searchIcon} alt='search'/>
        </div>
      </div>
    </div>
  )
}

export default SearchBarComponent