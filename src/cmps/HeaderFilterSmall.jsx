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
                                        <label className="filter-label">Where?</label>
                                        <input
                                            onChange={handleWhereInputChange}
                                            onClick={handleWhereClick}
                                            className="filter-action filter-where"
                                            value={where}
                                            placeholder="Search destinations"
                                        ></input>
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
                                        <label className="filter-label">When</label>
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
                                        <label className="filter-label">Who</label>
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
                        <form
                            className="filter-container not-expanded"
                            onClick={handleClick}
                        >
                            <div className="filter-action-container short anywhere">
                                <label className="filter-label">
                                    {!isHomepage && `${stay?.loc.city}, ${stay?.loc.country}` || filterBy?.txt || 'Anywhere'}
                                </label>
                            </div>
                            <div className="filter-action-container short anyweek">
                                <label className="filter-label">Anytime</label>
                            </div>
                            <div className="filter-action-container short who">
                                <label className="filter-label add-guests">
                                    {filterBy.minCapacity ? `${filterBy.minCapacity} guest${(filterBy.minCapacity > 1) ? `s` : ``}` : 'Add guests'}
                                </label>
                            </div>
                            <button className="filter-search short-btn">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 32 32"
                                    width="13"
                                    height="13"
                                    stroke="white"
                                    strokeWidth="4"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path fill="none" d="M13 24a11 11 0 1 0 0-22 11 11 0 0 0 0 22zm8-3 9 9"></path>
                                </svg>
                            </button>

                        </form>
                    </React.Fragment>
                )
            }
        </>
    )
}
