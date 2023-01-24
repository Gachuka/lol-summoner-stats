import './TopNavComponent.scss'

import { useNavigate } from 'react-router'

import SearchBarComponent from '../SearchBarComponent/SearchBarComponent'

function TopNavComponent() {
  
  const navigate = useNavigate()

  const isSummonerPage = (window.location.href.indexOf('summoner') > -1 ? true : false)

  const handleLogoCLick = () => {
    navigate('/')
  }

  return (
    <nav className='navbar'>
      <div className='navbar__container'>
        <div className='navbar__logo' onClick={handleLogoCLick}><span>10</span>Latest</div>
        <div></div>
        <div className='navbar__search-bar'>
          {isSummonerPage && <SearchBarComponent />}
        </div>
      </div>
    </nav>
  )
}

export default TopNavComponent