import './SearchBarComponent.scss'

import { useState } from 'react'


function SearchBarComponent() {

  const [ search, setSearch ] = useState()

  return (
    <div className='search'>
      <input className='search__input' placeholder='Summoner Name'/>
      <div className='search__button'>Find</div>
    </div>
  )
}

export default SearchBarComponent