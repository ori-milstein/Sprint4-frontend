import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { AppHeader } from "../cmps/AppHeader.jsx"
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { loadStay } from '../store/actions/stay.actions'
import { ReviewSection } from '../cmps/ReviewSection.jsx';
import { AppModal } from '../cmps/AppModal.jsx'
import { useDispatch } from 'react-redux'
import { Amenities } from '../cmps/Amenities.jsx'
import { Reserve } from '../cmps/Reserve.jsx'
import { LocationDetails } from '../cmps/LocationDetails.jsx'
import { SET_APP_MODAL_REVIEWS } from "../store/reducers/system.reducer.js"


export function StayDetails() {
  const { stayId } = useParams()

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null)

  const stay = useSelector(storeState => storeState.stayModule.stay)
  const appModal = useSelector((storeState) => storeState.systemModule.appModal)
  const [isModalActive, setIsModalActive] = useState(false)
  const [isClicked, setIsClicked] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [reviewIdxToScroll, setReviewIdxToScroll] = useState(0)

  useEffect(() => {
    loadStay(stayId)
  }, [stayId])


  const handleShowAllPhotos = () => {
    setIsClicked(true)
    setTimeout(() => {
      setIsClicked(false)
      navigate("/photos", { state: { imgUrls: stay?.imgUrls || [] } })
    }, 300)
  }

  const handleImgShowAllPhotos = () => {
    navigate("/photos", { state: { imgUrls: stay?.imgUrls || [] } })
  }

  function handleShowMore(modalType) {
    dispatch({ type: modalType })
    setIsModalActive((prevModal) => !prevModal)
    document.body.classList.add('modal-open')
  }

  const onAddStayMsg = () => {
    try {
      const message = `This is a test message ${parseInt(Math.random() * 10)}`
      showSuccessMsg(`Stay message added: ${message}`)
    } catch (err) {
      showErrorMsg('Cannot add stay message')
    }
  }

  if (!stay) {
    return (
      <section className="stay-details">
        <p>Loading stay details...</p>
      </section>
    )
  }

  return (
    <div className="stay-container">
      <section className="stay-details">
        {appModal &&
          <AppModal isModalActive={isModalActive} setIsModalActive={setIsModalActive} modalType={appModal} stay={stay} />}

        <h1 className="stay-details-header">{stay.name}</h1>

        <div className="stay-images">
          {/* Main image */}
          <img
            className="main-image"
            src={stay.imgUrls[0]}
            alt="Main Stay Image"
            onClick={handleImgShowAllPhotos}
          />
          {/* Side images */}
          <img
            className="side-top"
            src={stay.imgUrls[1]}
            alt="Side Top Image"
            onClick={handleImgShowAllPhotos}
          />
          <img
            className="side-middle"
            src={stay.imgUrls[2]}
            alt="Side Middle Image"
            onClick={handleImgShowAllPhotos}
          />
          <img
            className="side-bottom-image"
            src={stay.imgUrls[3]}
            alt="Side Bottom Image"
            onClick={handleImgShowAllPhotos}
          />
          <div className="side-extra-container">
            <img
              className="side-extra"
              src={stay.imgUrls[4]}
              alt="Side Extra Image"
              onClick={handleImgShowAllPhotos}
            />
            <button className={`show-all-btn ${isClicked ? 'clicked' : ''}`}
              onClick={handleShowAllPhotos}
            >
              <img
                src="/src/assets/icons/apps_24dp_000000_FILL0_wght400_GRAD0_opsz24.png"
                className="icon"
                alt="Show All Photos"
              />
              Show all photos
            </button>
          </div>
        </div>
        <div className="stay-details-info">
          <section className='details-content'>

            <section className='subtitles'>
              <h2 className='subtitle'>
                {stay.roomType} in {stay.loc.city}, {stay.loc.country}
              </h2>
              <h3 className='regular-text'>
                {stay.capacity} guests  · {stay.equipment.bedroomNum} bedrooms  ·  {stay.equipment.bedsNum} beds  ·  {stay.equipment.bathNum} baths
              </h3>
              <h4 className='bold-text reviews-summary'>
                <img src='../../src/assets/assets/icons/general icons/asset 158.svg' />
                <span>{stay.reviews.length ? '5.0' : 'New'} · </span>
                {stay.reviews.length > 0 &&
                  <a className='nostyle underline' onClick={() => { handleShowMore(SET_APP_MODAL_REVIEWS) }}>{stay.reviews.length} reviews</a>}
              </h4>
              <hr className="divider" />
            </section>

            <div className="stay-host">

              <div className="host-picture">
                <img
                  src={stay.host.imgUrl || stay.host.thumbnailUrl}
                  alt={`Picture of ${stay.host.fullname}`}
                />
              </div>
              <div className="host-details">
                <p>
                  <strong>Hosted by:</strong> <span>{stay.host.fullname}</span>
                </p>
                <p>
                  <strong>Location:</strong> <span>{stay.host.location}</span>
                </p>
                <p>
                  <strong>Response Time:</strong> <span>{stay.host.responseTime}</span>
                </p>
                <hr className="divider" />
                {stay.host.isSuperhost && (
                  <p className="superhost">
                    <span>🌟 Superhost</span>
                  </p>
                )}
                <p>
                  <strong>About the Host:</strong> <span>{stay.host.description}</span>
                </p>
              </div>
              <button onClick={onAddStayMsg}>Add Stay Message</button>
            </div>

            <div className="stay-summary">
              <p>{stay.summary}</p>
            </div>
            {stay.amenities &&
              <Amenities stay={stay} />}
          </section>

          <div className="stay-reserve-container">
            <Reserve />
          </div>
        </div>
        <LocationDetails stay={stay} />
        <ReviewSection stay={stay} handleShowMore={handleShowMore} isModalActive={isModalActive} setReviewIdxToScroll={setReviewIdxToScroll} />
      </section>
    </div>
  )

}




