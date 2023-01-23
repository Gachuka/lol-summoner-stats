import './BackgroundComponent.scss'

function BackgroundComponent({ image }) {
  return (
    <div className='background' id='background'>
      <div className='background__section'>
        <div className='background__container'>
          <img
            className='background__image'
            src={image}
            alt="background recent most used champ"
          />
        </div>
        <div className='background__gradiant'>
          <div className='background__gradiant-filter' id="background__gradiant-filter"></div>
        </div>
      </div>
    </div>
  )
}

export default BackgroundComponent;