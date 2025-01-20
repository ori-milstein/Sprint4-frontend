import { useState } from 'react'

export function StayPreview({ stay }) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [wishlistName, setWishlistName] = useState('')
    const maxChars = 50

    function formatDateRange(startDate, endDate) {
        const options = { year: 'numeric', month: 'short', day: 'numeric' }
        const start = new Intl.DateTimeFormat('en-US', options).format(new Date(startDate))
        const end = new Intl.DateTimeFormat('en-US', options).format(new Date(endDate))
        return `${start} - ${end}`
    }

    function handleNext(ev) {
        ev.preventDefault()
        ev.stopPropagation()
        if (stay.imgUrls && currentIndex < stay.imgUrls.length - 1) {
            setCurrentIndex((prevIndex) => prevIndex + 1);
        }
    }

    function handlePrev(ev) {
        ev.preventDefault()
        ev.stopPropagation()
        if (currentIndex > 0) {
            setCurrentIndex((prevIndex) => prevIndex - 1);
        }
    }

    function handleWishlistToggle(ev) {
        ev.preventDefault()
        ev.stopPropagation()
        setIsModalOpen(true)
    }

    function handleModalClose(ev) {
        ev.preventDefault()
        setIsModalOpen(false)
    }

    function handleModalContentClick(ev) {
        ev.preventDefault()
        ev.stopPropagation()
    }

    function handleInputChange(ev) {
        const value = ev.target.value.slice(0, maxChars)
        setWishlistName(value)
    }

    return (
        <>
            <article className="stay-preview">
                <div className="image-container">
                    {stay.imgUrls?.length > 0 && (
                        <>
                            <img
                                src={stay.imgUrls[currentIndex]}
                                alt={stay.name || 'Stay Image'}
                            />
                            <button
                                className="wishlist-btn"
                                onClick={handleWishlistToggle}
                            >
                                <i class="fa-regular fa-heart"></i>
                            </button>
                            <div className="carousel-controls">
                                <button
                                    className="prev-btn"
                                    onClick={handlePrev}
                                    disabled={currentIndex === 0}
                                >
                                    <i class="fa-solid fa-angle-left"></i>
                                </button>
                                <button
                                    className="next-btn"
                                    onClick={handleNext}
                                    disabled={currentIndex === stay.imgUrls.length - 1}
                                >
                                    <i class="fa-solid fa-angle-right"></i>
                                </button>
                            </div>
                            <div className="carousel-indicators">
                                {stay.imgUrls.map((_, idx) => (
                                    <span
                                        key={idx}
                                        className={`indicator ${currentIndex === idx ? 'active' : ''}`}
                                        onClick={(ev) => {
                                            ev.preventDefault()
                                            ev.stopPropagation()
                                            setCurrentIndex(idx)
                                        }}
                                    ></span>
                                ))}
                            </div>
                        </>
                    )}
                </div>
                <div className="info-container">
                    <header className="location-header">
                        <span>{stay.loc.city}, {stay.loc.country}</span>
                        {stay.reviews && stay.reviews.length > 0 && (
                            <span className="stay-rating">
                                <i className="fas fa-star"></i> {calculateAverageRating(stay.reviews)}
                            </span>
                        )}
                    </header>

                    <h3 className="stay-name">{stay.name}</h3>
                    <p className="stay-dates">
                        {console.log('Reserved Dates:', stay.reservedDates)}
                        {stay.reservedDates?.length > 0
                            ? stay.reservedDates.map((range, idx) => (
                                <span key={idx}>
                                    {formatDateRange(range.start, range.end)}
                                    {idx < stay.reservedDates.length - 1 && ', '}
                                </span>
                            ))
                            : 'Dates not available'}
                    </p>
                    <p className="stay-price">
                        ${stay.price} <span>night</span>
                    </p>
                </div>
            </article>

            {/* Modal */}
            {isModalOpen && (
                <div
                    className="wishlist-modal"
                    onClick={handleModalClose}
                >
                    <div
                        className="modal-content"
                        onClick={handleModalContentClick}
                    >
                        <div className="header-modal">
                            <h2>Create Wishlist</h2>
                            <button className="close-btn" onClick={handleModalClose}>
                                &times;
                            </button>
                        </div>
                        <form>
                            <div class="input-wrapper">
                                <input
                                    type="text"
                                    id="wishlist-name"
                                    value={wishlistName}
                                    onChange={handleInputChange}
                                    placeholder="Name"
                                />
                                <small className="char-counter">
                                    {wishlistName.length}/{maxChars} characters
                                </small>
                            </div>
                            <div className="modal-actions">
                                <button type="button"
                                    class="clear-btn"
                                    onClick={() => setWishlistName('')}
                                >
                                    Clear
                                </button>
                                <button
                                    type="submit"
                                    class="create-btn"
                                    disabled={wishlistName.length === 0}
                                >
                                    Create
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    )
}

function calculateAverageRating(reviews) {
    const total = reviews.reduce((sum, review) => sum + review.rate, 0)
    return (total / reviews.length).toFixed(2)
}