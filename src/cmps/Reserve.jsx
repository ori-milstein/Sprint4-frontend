import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { DatePickerCmp } from './DatePickerCmp'
import { setFiterBy } from '../store/actions/stay.actions';
import { parsePrice } from '../services/util.service'

export function Reserve() {

    const stay = useSelector(storeState => storeState.stayModule.stay)
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)
    const filterBy = useSelector((storeState) => storeState.stayModule.filterBy)
    const navigate = useNavigate()

    const { reservedDates } = stay || {}
    const disabledDates = calculateDisabledDates(reservedDates)
    const [checkInDate, setCheckInDate] = useState(filterBy.checkInDate || null);
    const [checkOutDate, setCheckOutDate] = useState(filterBy.checkOutDate || null);
    const [totalPrice, setTotalPrice] = useState(0)

    const [reserve, setReserve] = useState({ start: checkInDate, end: checkOutDate, guests: 1, price: totalPrice })

    function handleReserveClick() {
        navigate('/confirm-pay')
    }


    function toggleIsDatePickerOpen() {
        setIsDatePickerOpen(!isDatePickerOpen)
    }

    useEffect(() => {
        console.log('checkIndate', checkInDate, 'checkout date', checkOutDate)
        // Calculate default dates if filterBy does not have dates
        if (!filterBy.checkInDate || !filterBy.checkOutDate) {
            console.log('default dates')
            const { start, end } = findDefaultDateRange(reservedDates)
            setCheckInDate(start)
            setCheckOutDate(end)
            updateFilterBy(start, end)
        } else {
            setCheckInDate(new Date(filterBy.checkInDate))
            setCheckOutDate(new Date(filterBy.checkOutDate))
        }
    }, [filterBy, reservedDates])

    useEffect(() => {
        const stayPrice = parsePrice(stay.price, 'string')

        const days = getNumberOfDays(checkInDate, checkOutDate);
        if (days > 0) {
            setTotalPrice(days * +stayPrice);
        } else {
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
        }))
    }, [checkInDate, checkOutDate, totalPrice])

    function getNumberOfDays(checkInDate, checkOutDate) {
        if (!checkInDate || !checkOutDate) return 0; // Handle null or undefined dates
        const checkIn = new Date(checkInDate);
        const checkOut = new Date(checkOutDate);
        const timeDiff = checkOut - checkIn; // Difference in milliseconds
        const daysDiff = timeDiff / (1000 * 60 * 60 * 24); // Convert milliseconds to days
        return Math.max(0, Math.floor(daysDiff)) // Ensure non-negative number
    }

    function onChangeCheckIn(checkInFromDatePicker) {
        setCheckInDate(checkInFromDatePicker);
        // updateFilterBy(checkInFromDatePicker, checkOutDate);
        setReserve((prevReserve) => ({
            ...prevReserve,
            start: checkInFromDatePicker,
        }))
    }

    function onChangeCheckOut(checkOutFromDatePicker) {
        setCheckOutDate(checkOutFromDatePicker);
        // updateFilterBy(checkInDate, checkOutFromDatePicker); // Ensure `filterBy` is updated
        setReserve((prevReserve) => ({
            ...prevReserve,
            end: checkOutFromDatePicker,
        }));
    }

    function findDefaultDateRange(reservedDates) {
        const today = new Date()
        const disabledDates = calculateDisabledDates(reservedDates)
        const availableDates = []
        let currentDate = new Date(today)

        while (availableDates.length < 3) {
            if (!disabledDates.some((d) => d.getTime() === currentDate.getTime())) {
                availableDates.push(new Date(currentDate));
            }
            currentDate.setDate(currentDate.getDate() + 1)
        }
        return {
            start: availableDates[0],
            end: availableDates[2],
        }
    }

    function calculateDisabledDates(reservedDates) {
        const disabledDates = [];
        reservedDates.forEach(({ start, end }) => {
            let currDate = new Date(start)
            const endDate = new Date(end)

            while (currDate <= endDate) {
                disabledDates.push(new Date(currDate))
                currDate.setDate(currDate.getDate() + 1)
            }
        })
        return disabledDates
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
                        onChangeCheckIn={onChangeCheckIn}
                        onChangeCheckOut={onChangeCheckOut}
                        stay={stay}
                        checkInDate={checkInDate}
                        checkOutDate={checkOutDate}
                        disabledDates={disabledDates}
                    />
                    <button className="close" onClick={toggleIsDatePickerOpen}>Close</button>
                </div>}
                <div className={`check-in-container ${isDatePickerOpen ? 'open' : ''}`} onClick={toggleIsDatePickerOpen}>
                    <label className='reserve-labels'>CHECK-IN</label>
                    <div className="checkout-date info-date">
                        {checkInDate ? formatDate(checkInDate) : 'Add date'}
                    </div>

                </div>
                <div className={`check-out-container ${isDatePickerOpen ? 'open' : ''}`} onClick={toggleIsDatePickerOpen}>
                    <label className='reserve-labels'>CHECKOUT</label>
                    <div className="checkout-date info-date">
                        {filterBy.checkOutDate ? formatDate(checkOutDate) : 'Add date'}
                    </div>
                </div>
                <div className="stay-reserve-guests">
                    <label className='reserve-labels'>GUESTS</label>
                    <div className="guests-number">{filterBy.minCapacity}</div>
                </div>
            </div>
            <button className="reserve-btn" onClick={handleReserveClick}>
                Reserve
            </button>
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
                    <p>₪ {parsePrice(totalPrice + 31, 'string')}</p>
                </div>
            </div>
        </div >
    )
}