import './SearchBarComponent.scss'

import searchIcon from '../../assets/icons/search.svg'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'


function SearchBarComponent() {

  const navigate = useNavigate()
  const [ search, setSearch ] = useState('')

  // const searchBar = document.getElementById("search__input")

  const handleOnChange = (event) => {
    setSearch(event.target.value)
  }

  const handleSubmit = (e) => {
    // e.preventDefault()
    const searchBar = document.getElementById("search__input")
    if (searchBar.classList.contains('input-error')) searchBar.classList.remove('input-error')
    // console.log(searchBar)
    // console.log(searchBar.value)
    if (!searchBar.value) {
      searchBar.classList.add('input-error')
      searchBar.focus()
      return
    }
    console.log(search)
    navigate(`/summoner/${search}`)
    window.location.reload()
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
        <input 
          className='search__input' 
          id='search__input' 
          placeholder='Summoner Name' 
          autoComplete='off'
          onChange={handleOnChange} 
          value={search}
        />
        <div className='search__button' onClick={handleSubmit}>
          <img className='search__icon' src={searchIcon} alt='search'/>
        </div>
      </div>
    </div>
  )
}

export default SearchBarComponent