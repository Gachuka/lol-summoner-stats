import './MainPage.scss'

import SearchBarComponent from '../../components/SearchBarComponent/SearchBarComponent'

import MainBackground from '../../assets/background-images/main-background.jpg'

function MainPage() {

  return (
    <div className='main'>
      <div className='main__container'>

        <div className='main-background'>
          <div className='main-background__section'>
            <div className='main-background__container'>
              <img
                className='main-background__image'
                src={MainBackground}
                alt="main-background recent most used champ"
              />
            </div>
            <div className='main-background__gradiant'>
              <div className='main-background__gradiant-filter'></div>
            </div>
          </div>
        </div>

        <h1 className='main__header'><span>10</span>Latest</h1>
        <SearchBarComponent />
      </div>
    </div>
  )
}

export default MainPage