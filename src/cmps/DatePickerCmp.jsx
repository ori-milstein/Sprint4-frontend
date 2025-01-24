import React, { useState } from 'react';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css'; // Default theme
import { useSelector } from 'react-redux';

export function DatePickerCmp({ onCheckInChange, onCheckOutChange, stay, disabledDates }) {

    const filterBy = useSelector((storeState) => storeState.stayModule.filterBy)

    function trimDate(date) {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate())
    }

    const [selectionRange, setSelectionRange] = useState({
        startDate: filterBy.checkInDate ? new Date(filterBy.checkInDate) : new Date(),
        endDate: filterBy.checkOutDate ? new Date(filterBy.checkOutDate) : new Date(),
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

        onCheckInChange(startDate)
        onCheckOutChange(endDate)

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
