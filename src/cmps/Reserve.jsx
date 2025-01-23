import { useState } from 'react'
import { useSelector } from 'react-redux'
import { DatePickerCmp } from './DatePickerCmp'
import { setFiterBy } from '../store/actions/stay.actions';

export function Reserve() {

    const stay = useSelector(storeState => storeState.stayModule.stay)
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)
    const filterBy = useSelector((storeState) => storeState.stayModule.filterBy)

    const [checkInDate, setCheckInDate] = useState(filterBy.checkInDate || null);
    const [checkOutDate, setCheckOutDate] = useState(filterBy.checkOutDate || null);

    function toggleIsDatePickerOpen() {
        setIsDatePickerOpen(!isDatePickerOpen)
    }

    function onChangeCheckIn(checkInFromDatePicker) {
        console.log('changing check in to', checkInFromDatePicker)
        setCheckInDate(checkInFromDatePicker)
        updateFilterBy(checkInFromDatePicker, checkOutDate);

    }

    function onChangeCheckOut(checkOutFromDatePicker) {
        console.log('changing check out to', checkOutFromDatePicker)
        setCheckOutDate(checkOutFromDatePicker)
        updateFilterBy(checkInDate, checkOutFromDatePicker);

    }

    async function updateFilterBy(newCheckInDate, newCheckOutDate) {
        const updatedFilterBy = {
            ...filterBy,
            checkInDate: newCheckInDate,
            checkOutDate: newCheckOutDate,
        }

        await setFiterBy(updatedFilterBy)

    }

    const formatDate = (date) => {
        return new Intl.DateTimeFormat('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        }).format(new Date(date));
    }

    return (
        < div className="stay-reserve" >
            <h2>₪{stay.price} <span> night</span></h2>
            <div className="stay-reserve-dates">
                {isDatePickerOpen && <div className="date-picker-reserve-container">
                    <DatePickerCmp
                        onCheckInChange={onChangeCheckIn}
                        onCheckOutChange={onChangeCheckOut}
                    />
                    <button className="close" onClick={toggleIsDatePickerOpen}>Close</button>
                </div>}
                <div className={`check-in-container ${isDatePickerOpen ? 'open' : ''}`} onClick={toggleIsDatePickerOpen}>
                    <label className='reserve-labels'>CHECK-IN</label>
                    <div className="checkout-date info-date">
                        {filterBy.checkInDate ? formatDate(filterBy.checkInDate) : 'Add date'}
                    </div>

                </div>
                <div className={`check-out-container ${isDatePickerOpen ? 'open' : ''}`} onClick={toggleIsDatePickerOpen}>
                    <label className='reserve-labels'>CHECKOUT</label>
                    <div className="checkout-date info-date">
                        {filterBy.checkOutDate ? formatDate(filterBy.checkOutDate) : 'Add date'}
                    </div>
                </div>
                <div className="stay-reserve-guests">
                    <label className='reserve-labels'>GUESTS</label>
                    <div className="guests-number">{filterBy.minCapacity}</div>
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