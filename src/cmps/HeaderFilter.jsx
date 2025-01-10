import React, { useEffect, useRef } from 'react';

export function HeaderFilter({ isExpanded, setIsExpanded, toggleIsFilterOpen, checkInDate, checkOutDate }) {
    const isClicking = useRef(false)

    useEffect(() => {
        // Scroll event handler
        const handleScroll = () => {
            if (isClicking.current) return; // Prevent scroll logic if clicking
            if (isExpanded) {
                setIsExpanded(false)
            }
        }
        // Attach scroll event listener
        window.addEventListener('scroll', handleScroll)

        // Cleanup event listener on component unmount
        return () => {
            window.removeEventListener('scroll', handleScroll)
        };
    }, [isExpanded, setIsExpanded])

    const handleClick = () => {
        isClicking.current = true // Mark as clicking
        setIsExpanded(true)

        // Allow scroll events after a short delay
        setTimeout(() => {
            isClicking.current = false
        }, 300) // Adjust timeout as needed
    }

    function formatDate(date){
        if(!date) return
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }

    return (
        <>
            {isExpanded && (
                <form className="filter-container expanded">
                    <div className="filter-action-container">
                        <label className="filter-label">Where</label>
                        <input
                            className="filter-action filter-where"
                            placeholder="Search destinations"
                        ></input>
                    </div>
                    <div className="filter-action-container" onClick={toggleIsFilterOpen}>
                        <label className="filter-label">Check in</label>
                        <input
                            className="filter-action filter-checkin"
                            value={formatDate(checkInDate) || 'Add Dates'}
                        ></input>
                    </div>
                    <div className="filter-action-container" onClick={toggleIsFilterOpen}>
                        <label className="filter-label" >Check out</label>
                        <input
                            className="filter-action filter-checkout"
                            value={formatDate(checkOutDate) || 'Add Dates'}
                            
                        ></input>
                    </div>
                    <div className="filter-action-container who">
                        <label className="filter-label">Who</label>
                        <input
                            className="filter-action filter-who"
                            value="Add guests"
                        ></input>
                    </div>
                    <button className="filter-search long-btn">
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

            )}
            {!isExpanded && (
                <React.Fragment>
                    <form
                        className="filter-container not-expanded"
                        onClick={handleClick}
                    >
                        <div className="filter-action-container short anywhere">
                            <label className="filter-label">Anywhere</label>
                        </div>
                        <div className="filter-action-container short anyweek">
                            <label className="filter-label">Any week</label>
                        </div>
                        <div className="filter-action-container short who">
                            <label className="filter-label add-guests">Add guests</label>
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
            )}
        </>
    )
}
