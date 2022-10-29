import './MainPage.scss'

import SearchBarComponent from '../../components/SearchBarComponent/SearchBarComponent'

function MainPage() {

  return (
    <div className='main'>
      <div className='main___container'>
        <SearchBarComponent />
      </div>
    </div>
  )
}

export default MainPage