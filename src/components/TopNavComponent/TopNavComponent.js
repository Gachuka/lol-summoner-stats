import SearchBarComponent from '../SearchBarComponent/SearchBarComponent'
import './TopNavComponent.scss'

function TopNavComponent() {

  const isSummonerPage = (window.location.href.indexOf('summoner') > -1 ? true : false)

  return (
    <nav className='navbar'>
      <div className='navbar__container'>
        <div className='navbar__logo'><span>10</span>Latest</div>
        {isSummonerPage && <SearchBarComponent />}
      </div>
    </nav>
  )
}

export default TopNavComponent