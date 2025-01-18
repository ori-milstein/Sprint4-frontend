import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { AppHeader } from "../cmps/AppHeader.jsx"
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { loadStay, addStayMsg } from '../store/actions/stay.actions'
import { ReviewSection } from '../cmps/ReviewSection.jsx';
import { AppModal } from '../cmps/AppModal.jsx'
import { useDispatch } from 'react-redux'
import { Amenities } from '../cmps/Amenities.jsx'
import { Reserve } from '../cmps/Reserve.jsx'
import { LocationDetails } from '../cmps/LocationDetails.jsx'
import { SET_APP_MODAL_REVIEWS } from "../store/reducers/system.reducer.js"


export function StayDetails() {
  const { stayId } = useParams()
  const stay = useSelector(storeState => storeState.stayModule.stay)
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null)

  const appModal = useSelector((storeState) => storeState.systemModule.appModal)
  const [isModalActive, setIsModalActive] = useState(false)
  const dispatch = useDispatch()
  const [reviewIdxToScroll, setReviewIdxToScroll] = useState(0)

  useEffect(() => {
    loadStay(stayId)
  }, [stayId])

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
    <>
      <AppHeader isHomepage={false}></AppHeader>
      <section className="stay-details">
        {appModal &&
          <AppModal isModalActive={isModalActive} setIsModalActive={setIsModalActive} modalType={appModal} stay={stay} reviewIdxToScroll={reviewIdxToScroll} />}

        <h1 className="stay-details-header">{stay.name}</h1>

        <div className="stay-images">
          {/* Main image */}
          <img
            className="main-image"
            src={stay.imgUrls[0]}
            alt="Main Stay Image"
          />
          {/* Side images */}
          <img
            className="side-top"
            src={stay.imgUrls[1]}
            alt="Side Top Image"
          />
          <img
            className="side-middle"
            src={stay.imgUrls[2]}
            alt="Side Middle Image"
          />
          <img
            className="side-bottom-image"
            src={stay.imgUrls[3]}
            alt="Side Bottom Image"
          />
          <div className="side-extra-container">
            <img
              className="side-extra"
              src={stay.imgUrls[4]}
              alt="Side Extra Image"
            />
            <button className="show-all-btn">Show all photos</button>
          </div>
        </div>
        <div className="stay-details-info">
          <section className='details-content'>

            <section className='subtitles'>
              <h2 className='subtitle'>
                {stay.roomType} in {stay.loc.city}, {stay.loc.country}
              </h2>
              <h3 className='regular-text'>
                {stay.capacity} guests
              </h3>
              <h4 className='bold-text reviews-summary'>
                <img src='../../src/assets/assets/icons/general icons/asset 158.svg' />
                <span>{stay.reviews.length ? '5.0' : 'New'} · </span>
                {stay.reviews.length > 0 &&
                  <a className='nostyle underline' onClick={() => { handleShowMore(SET_APP_MODAL_REVIEWS) }}>{stay.reviews.length} reviews</a>}
              </h4>
            </section>

            <div className="stay-host">
              <p>
                <strong>Hosted by:</strong> {stay.host.fullname}
              </p>
              <p>
                <strong>Check-in:</strong> Self Check-in available
              </p>
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
        {stay.reviews.length > 0 &&
          <ReviewSection stay={stay} handleShowMore={handleShowMore} isModalActive={isModalActive} setReviewIdxToScroll={setReviewIdxToScroll} />}
      </section>
    </>
  )
}



