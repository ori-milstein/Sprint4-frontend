import React, { useState } from 'react';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css'; // Default theme

export function DatePickerCmp({ onCheckInChange, onCheckOutChange }) {
    function trimDate(date){
        return new Date(date.getFullYear(), date.getMonth(), date.getDate())
    }
    const [selectionRange, setSelectionRange] = useState({
        startDate: trimDate(new Date()),
        endDate: trimDate(new Date()),
        key: 'selection',
    })

    const [currentStep, setCurrentStep] = useState('checkIn')

    const handleSelect = (ranges) => {
        const {startDate, endDate} = ranges.selection

        setSelectionRange({
            ...ranges.selection,
            startDate:trimDate(ranges.selection.startDate),
            endDate:trimDate(ranges.selection.endDate)
        })

        if (currentStep === 'checkIn'){
            onCheckInChange(startDate)
            setCurrentStep('checkOut')
        }else {
            onCheckOutChange(endDate)
            setCurrentStep('checkIn')
        }
        
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
            />
        </div>
    );
}
