import { useSelector } from 'react-redux'

export function Reserve() {
    const stay = useSelector(storeState => storeState.stayModule.stay)

    return (
        < div className="stay-reserve" >
            <h2>₪{stay.price} <span> night</span></h2>
            <div className="stay-reserve-dates">
                <div className='check-in-container'>
                    <label className='reserve-labels'>CHECK-IN</label>
                    <div className="checkin-date"></div>
                </div>
                <div className='check-out-container'>
                    <label className='reserve-labels'>CHECKOUT</label>
                    <div className="checkout-date"></div>
                </div>
                <div className="stay-reserve-guests">
                    <label className='reserve-labels'>GUESTS</label>
                    <div className="guests-number"></div>
                </div>
            </div>
            <button className="reserve-btn">Reserve</button>
            <p>You won't be charged yet</p>
            <div className="stay-reserve-summary">
                <div className="reserve-total-details">
                    <p>₪ {stay.price} x 5 nights</p>
                    <p>₪ {stay.price * 5}</p>
                </div>
                <div className="reserve-total-details">
                    <p>Airbnb service fee</p>
                    <p>₪ 31</p>
                </div>
                <hr />
                <div className="total-reserve-price">
                    <p>Total</p>
                    <p>₪ {(stay.price * 5) + 31}</p>
                </div>
            </div>
        </div >
    )

}