import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { loadStay } from '../store/actions/stay.actions'

export function StayDetails() {
  const { stayId } = useParams()
  const stay = useSelector(storeState => storeState.stayModule.stay)

  useEffect(() => {
    loadStay(stayId)
  }, [stayId])

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
    <section className="stay-details">
      <div className="stay-details-header">
        <h1>{stay.name}</h1>
        <h3>
          {stay.loc.city}, {stay.loc.country}
        </h3>
      </div>
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
        <div className="stay-summary">
          <h4>${stay.price} / night</h4>
          <p>{stay.summary}</p>
        </div>
        <div className="stay-host">
          <p>
            <strong>Hosted by:</strong> {stay.host.fullname}
          </p>
          <p>
            <strong>Check-in:</strong> Self Check-in available
          </p>
          <button onClick={onAddStayMsg}>Add Stay Message</button>
        </div>
      </div>
      <div className="stay-reserve">
        <h2>₪{stay.price} <span>/ night</span></h2>
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
    </section>
  )
}



