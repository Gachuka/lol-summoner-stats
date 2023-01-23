import './MainPage.scss'

import SearchBarComponent from '../../components/SearchBarComponent/SearchBarComponent'

function MainPage() {

  return (
    <div className='main'>
      <div className='main__container'>
        <h1 className='main__header'><span>10</span>Latest</h1>
        <SearchBarComponent />
      </div>
    </div>
  )
}

export default MainPage