import React, { useState } from 'react';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css'; // Default theme

export function DatePickerCmp({ onClose, onApply }) {
    function trimDate(date){
        return new Date(date.getFullYear(), date.getMonth(), date.getDate())
    }
    const [selectionRange, setSelectionRange] = useState({
        startDate: trimDate(new Date()),
        endDate: trimDate(new Date()),
        key: 'selection',
    })

    const handleSelect = (ranges) => {
        setSelectionRange({
            ...ranges.selection,
            startDate:trimDate(ranges.selection.startDate),
            endDate:trimDate(ranges.selection.endDate)
        })
    }

    console.log('times you picked:', selectionRange)

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
