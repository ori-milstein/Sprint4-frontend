import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { loadStay } from '../store/actions/stay.actions'
import { ReviewSection } from '../cmps/ReviewSection.jsx';
import { AppModal } from '../cmps/AppModal.jsx'
import { useDispatch } from 'react-redux'

export function StayDetails() {
  const { stayId } = useParams()
  const stay = useSelector(storeState => storeState.stayModule.stay)
  const appModal = useSelector((storeState) => storeState.systemModule.appModal)
  const [isModalActive, setIsModalActive] = useState(false)
  const [isClicked, setIsClicked] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()

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

  // const onAddStayMsg = () => {
  //   try {
  //     const message = `This is a test message ${parseInt(Math.random() * 10)}`
  //     showSuccessMsg(`Stay message added: ${message}`)
  //   } catch (err) {
  //     showErrorMsg('Cannot add stay message')
  //   }
  // }

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
        {appModal && (
          <AppModal
            isModalActive={isModalActive}
            setIsModalActive={setIsModalActive}
            modalType={appModal}
            stay={stay}
          />
        )}

        <h1 className="stay-details-header">{stay.name}</h1>

        {/* Stay Images */}
        <div className="stay-images">
          <img
            className="main-image"
            src={stay.imgUrls[0]}
            alt="Main Stay Image"
            onClick={handleImgShowAllPhotos}
          />
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

        {/* Stay Details Info */}
        <div className="stay-details-info">
          <section className='details-content'>

            {/* Subtitles */}
            <section className='subtitles'>
              <h2 className='subtitle'>
                {stay.roomType} in {stay.loc.city}, {stay.loc.country}
              </h2>
              <h3 className='regular-text'>
                {stay.capacity} guests
              </h3>
              <h4 className='bold-text reviews-summary'>
                <img src='../../src/assets/assets/icons/general icons/asset 158.svg' />
                {stay.reviews.length ? '5.0' : 'New'} ·
                <a href="" className="nostyle underline"> {stay.reviews.length} reviews
                </a>
              </h4>
              <hr className="divider" />
            </section>

            {/* Host Details */}
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
            </div>
          </section>

          {/* Reserve Section */}
          <div className="stay-reserve">
            <h2>
              ₪{stay.price} <span>/ night</span>
            </h2>
            <div className="stay-reserve-dates">
              <div>
                <label>Check-in</label>
                <input type="date" />
              </div>
              <div>
                <label>Checkout</label>
                <input type="date" />
              </div>
            </div>
            <div className="stay-reserve-guests">
              <label>Guests</label>
              <select>
                <option value="1">1 guest</option>
                <option value="2">2 guests</option>
                <option value="3">3 guests</option>
              </select>
            </div>
            <button className="reserve-btn">Reserve</button>
            <p>You won't be charged yet</p>
            <div className="stay-reserve-summary">
              <p>₪{stay.price} x 5 nights</p>
              <p>₪{stay.price * 5}</p>
              <hr />
              <p>Total</p>
              <p>₪{stay.price * 5}</p>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <ReviewSection stay={stay}
          handleShowMore={handleShowMore}
          isModalActive={isModalActive}
        />
      </section>
    </div>
  )
}




