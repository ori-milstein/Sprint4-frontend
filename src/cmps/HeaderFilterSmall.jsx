import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { GenericCmp } from './GenericCmp';
import { DatePickerCmp } from './DatePickerCmp';
import { SuggestedLocations } from './SuggestedLocations';
import { GuestSelector } from './GuestSelector';

export function HeaderFilterSmall({ isExpanded, setIsExpanded, toggleIsFilterOpen, guests, setGuests, where, setWhere, isHomepage, onSearchFromHeader, inputModal, setInputModal, checkInDate, setCheckInDate, checkOutDate, setCheckOutDate }) {
    const isClicking = useRef(false)
    const stay = useSelector(storeState => storeState.stayModule.stay)
    const filterBy = useSelector((storeState) => storeState.stayModule.filterBy)

    // useEffect(() => {
    //     // Scroll event handler
    //     const handleScroll = () => {
    //         if (isClicking.current) return; // Prevent scroll logic if clicking
    //         if (isExpanded) {
    //             setIsExpanded(false)
    //         }
    //     }
    //     // Attach scroll event listener
    //     window.addEventListener('scroll', handleScroll)

    //     // Cleanup event listener on component unmount
    //     return () => {
    //         window.removeEventListener('scroll', handleScroll)
    //     };
    // }, [isExpanded, setIsExpanded])



    useEffect(() => {
        console.log('inputModal from headerfilter', inputModal)
    }, [inputModal])

    const handleClick = () => {
        isClicking.current = true // Mark as clicking
        setIsExpanded(true)

        // Allow scroll events after a short delay
        setTimeout(() => {
            isClicking.current = false
        }, 300) // Adjust timeout as needed
    }

    function handleWhereInputChange(ev) {
        const { value } = ev.target;
        setWhere(value)
    }

    function handleWhereClick() {
        setWhere('')
    }

    function formatDate(date) {
        if (!date) return
        const parsedDate = typeof date === 'string' ? new Date(date) : date
        return parsedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    }

    function formGuests(guests) {
        let totalGuests = guests.adults + guests.children || 0
        let totalInfants = guests.infants || 0
        let totalPets = guests.pets || 0

        let result = (totalGuests) ? `${totalGuests} guest${(totalGuests > 1) ? `s` : ``}` : 'Add guests'

        if (totalInfants > 0) result += `, ${totalInfants} infants`

        if (totalPets > 0) result += `, ${totalPets} pets`

        return result;

    }


    return (
        <>
            {isExpanded && (
                <>
                    {/* <div className="search-modal-overlay"></div> */}
                    <form className="filter-container expanded small" onSubmit={onSearchFromHeader}>
                        <ul className='filters-list'>
                            <li className="filter-wrapper">
                                <details name='filter'>
                                    <summary className='filter-summary'>
                                        <div>Where</div>
                                        <div>I'm flexible</div>
                                    </summary>
                                    <div className="filter-action-container">
                                        <h2 className='subtitle where'>Where?</h2>

                                        <div className="flex align-center search-destinaions-wrapper">
                                            <div className="flex align-center">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 32 32"
                                                    width="16"
                                                    height="16"
                                                    stroke="rgb(34, 34, 34)"
                                                    strokeWidth="4"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                >
                                                    <path fill="none" stroke="currentColor" d="M13 24a11 11 0 1 0 0-22 11 11 0 0 0 0 22zm8-3 9 9"></path>
                                                </svg>
                                            </div>
                                            <input
                                                onChange={handleWhereInputChange}
                                                onClick={handleWhereClick}
                                                className="filter-action filter-where"
                                                value={where}
                                                placeholder="Search destinations"
                                                name={'search destinations'}
                                            >
                                            </input>
                                        </div>
                                        <SuggestedLocations
                                            setWhere={setWhere}
                                            onClose={() => toggleIsFilterOpen(null)}
                                        />
                                    </div>
                                </details>
                            </li>

                            <li className="filter-wrapper">
                                <details name='filter'>
                                    <summary className='filter-summary'>
                                        <div>When</div>
                                        <div>Add dates</div>
                                    </summary>
                                    <div className="filter-action-container date-picker" onClick={() => toggleIsFilterOpen('date-picker')}>
                                        <h2 className='subtitle'>When?</h2>
                                        {/* <input
                                            className="filter-action filter-checkin"
                                            value={formatDate(checkInDate) || 'Add dates'}
                                            required
                                            readOnly
                                        ></input> */}
                                        <DatePickerCmp
                                            onClose={() => setIsExpanded(false)}
                                            onChangeCheckIn={(date) => setCheckInDate(date)}
                                            onChangeCheckOut={(date) => setCheckOutDate(date)}
                                            checkInDate={checkInDate}
                                            checkOutDate={checkOutDate}
                                        />
                                    </div>
                                </details>
                            </li>
                            <li className="filter-wrapper">
                                <details name='filter'>
                                    <summary className='filter-summary'>
                                        <div>Who</div>
                                        <div>Add guests</div>
                                    </summary>
                                    <div className="filter-action-container who " onClick={() => toggleIsFilterOpen('guest-selector')}>
                                        <h2 className='subtitle'>Who?</h2>
                                        <GuestSelector
                                            guests={guests}
                                            setGuests={setGuests}
                                            onClose={() => toggleIsFilterOpen(null)}
                                        />
                                    </div>
                                </details>
                            </li>
                        </ul>

                        <div className='buttons'>
                            <button>Clear All</button>
                            <button className="search-btn ">
                                <span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 32 32"
                                        width="16"
                                        height="16"
                                        stroke="white"
                                        strokeWidth="4"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path fill="none" d="M13 24a11 11 0 1 0 0-22 11 11 0 0 0 0 22zm8-3 9 9"></path>
                                    </svg>
                                    Search
                                </span>
                            </button>
                        </div>

                    </form >
                </>
            )
            }
            {
                !isExpanded && (
                    <React.Fragment>
                        <button
                            className="filter-container not-expanded small short"
                            onClick={handleClick}
                        >
                            <span >
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', height: ' 12px', width: ' 12px', fill: 'currentcolor', }}><path d="M13 0a13 13 0 0 1 10.5 20.67l7.91 7.92-2.82 2.82-7.92-7.91A12.94 12.94 0 0 1 13 26a13 13 0 1 1 0-26zm0 4a9 9 0 1 0 0 18 9 9 0 0 0 0-18z"></path></svg>
                                </span>

                                <span>
                                    Start your search
                                </span>
                            </span>

                        </button>
                    </React.Fragment>
                )
            }
        </>
    )
}
