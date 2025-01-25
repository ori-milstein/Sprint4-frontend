import React, { useState, useLayoutEffect } from 'react';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css'; // Default theme
import { useSelector } from 'react-redux';

export function DatePickerCmp({ onChangeCheckIn, onChangeCheckOut,checkInDate,checkOutDate, disabledDates }) {

    useLayoutEffect(() => {
        const weekDays = document.querySelectorAll(`span.rdrWeekDay`)

        weekDays.forEach(day => {
            day.innerText = day.innerText.slice(0, 2)
        })
    }, [])

    function trimDate(date) {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate())
    }

    const [selectionRange, setSelectionRange] = useState({
        startDate: checkInDate ? new Date(checkInDate) : new Date(),
        endDate: checkOutDate ? new Date(checkOutDate) : new Date(),
        key: 'selection',
    })


    const handleSelect = (ranges) => {
        let { startDate, endDate } = ranges.selection

        startDate = trimDate(startDate)
        endDate = trimDate(endDate)
        
        if (startDate > endDate) {
            [startDate, endDate] = [endDate, startDate]
        }

        setSelectionRange({
            ...ranges.selection,
            startDate,
            endDate,
        })

        console.log('startdate', startDate)

        onChangeCheckIn(startDate)
        onChangeCheckOut(endDate)
    }

    return (
        <div className="date-picker">
            <DateRangePicker
                ranges={[selectionRange]}
                onChange={handleSelect}
                months={2}
                direction="horizontal"
                showMonthAndYearPickers={false}
                staticRanges={[]}
                inputRanges={[]}
                rangeColors={["rgb(0, 0, 0)"]}
                minDate={new Date()}
                disabledDates={disabledDates}
            />
        </div>
    )
}
