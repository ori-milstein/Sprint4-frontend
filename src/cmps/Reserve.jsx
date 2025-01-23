import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { DatePickerCmp } from './DatePickerCmp'
import { setFiterBy } from '../store/actions/stay.actions';
import { parsePrice } from '../services/util.service'

export function Reserve() {

    const stay = useSelector(storeState => storeState.stayModule.stay)
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)
    const filterBy = useSelector((storeState) => storeState.stayModule.filterBy)

    const [checkInDate, setCheckInDate] = useState(filterBy.checkInDate || null);
    const [checkOutDate, setCheckOutDate] = useState(filterBy.checkOutDate || null);
    const [totalPrice, setTotalPrice] = useState(0)

    const [reserve, setReserve] = useState({ start: checkInDate, end: checkOutDate, guests: 1, price: totalPrice })

    function toggleIsDatePickerOpen() {
        setIsDatePickerOpen(!isDatePickerOpen)
    }

    useEffect(() => {
        const stayPrice = parsePrice(stay.price, 'number')

        const days = getNumberOfDays(checkInDate, checkOutDate);
        if (days > 0) {
            console.log('stayPrice', stayPrice)
            setTotalPrice(days * +stayPrice + 31);
        } else {
            console.log('in else')
            setTotalPrice(0)
        }
    }, [checkInDate, checkOutDate, stay.price])

    // Sync reserve state with check-in, check-out, and total price
    useEffect(() => {
        setReserve((prevReserve) => ({
            ...prevReserve,
            start: checkInDate,
            end: checkOutDate,
            price: totalPrice,
        }));
    }, [checkInDate, checkOutDate, totalPrice])

    function getNumberOfDays(checkInDate, checkOutDate) {
        if (!checkInDate || !checkOutDate) return 0; // Handle null or undefined dates
        const checkIn = new Date(checkInDate);
        const checkOut = new Date(checkOutDate);
        const timeDiff = checkOut - checkIn; // Difference in milliseconds
        const daysDiff = timeDiff / (1000 * 60 * 60 * 24); // Convert milliseconds to days
        return Math.max(0, daysDiff); // Ensure non-negative number
    }

    function onChangeCheckIn(checkInFromDatePicker) {
        console.log('changing check in to', checkInFromDatePicker)
        setCheckInDate(checkInFromDatePicker)
        updateFilterBy(checkInFromDatePicker, checkOutDate);
        setReserve({
            ...reserve,
            start: checkInDate
        })
    }

    function onChangeCheckOut(checkOutFromDatePicker) {
        console.log('changing check out to', checkOutFromDatePicker)
        setCheckOutDate(checkOutFromDatePicker)
        updateFilterBy(checkInDate, checkOutFromDatePicker);
        setReserve({
            ...reserve,
            end: checkOutDate
        })
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

    function onReserve() {
        console.log('reserve:', reserve)
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
            <button className="reserve-btn" onClick={onReserve}>Reserve</button>
            <p>You won't be charged yet</p>
            <div className="stay-reserve-summary">
                <div className="reserve-total-details">
                    <p>₪ {stay.price} x {getNumberOfDays(reserve.start, reserve.end)} nights</p>
                    <p>₪ {parsePrice(totalPrice, 'string')}</p>
                </div>
                <div className="reserve-total-details">
                    <p>Airbnb service fee</p>
                    <p>₪ 31</p>
                </div>
                <hr />
                <div className="total-reserve-price">
                    <p>Total</p>
                    <p>₪ {parsePrice(totalPrice, 'string')}</p>
                </div>
            </div>
        </div >
    )

}