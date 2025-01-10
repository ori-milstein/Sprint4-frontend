import { useState } from 'react'

export function StayPreview({ stay, onToggleWishlist }) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isWished, setIsWished] = useState(false)

    function handleNext() {
        if (stay.imgUrls && currentIndex < stay.imgUrls.length - 1) {
            setCurrentIndex((prevIndex) => prevIndex + 1);
        }
    }

    function handlePrev() {
        if (currentIndex > 0) {
            setCurrentIndex((prevIndex) => prevIndex - 1);
        }
    }

    function handleWishlistToggle(ev) {
        ev.preventDefault()
        setIsWished(!isWished)
        onToggleWishlist(stay._id)
    }

    return (

        <article className="stay-preview">
            <div className="image-container">
                {stay.imgUrls?.length > 0 && (
                    <>
                        <img
                            src={stay.imgUrls[currentIndex]}
                            alt={stay.name || 'Stay Image'}
                        />
                        <button
                            className={`wishlist-btn ${isWished ? 'wished' : ''}`}
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
                                <i class="fa-solid fa-arrow-left"></i>
                            </button>
                            <button
                                className="next-btn"
                                onClick={handleNext}
                                disabled={currentIndex === stay.imgUrls.length - 1}
                            >
                                <i class="fa-solid fa-arrow-right"></i>
                            </button>
                        </div>
                        <div className="carousel-indicators">
                            {stay.imgUrls.map((_, idx) => (
                                <span
                                    key={idx}
                                    className={`indicator ${currentIndex === idx ? 'active' : ''}`}
                                    onClick={() => setCurrentIndex(idx)}
                                ></span>
                            ))}
                        </div>
                    </>
                )}
            </div>

            <div className="info-container">
                <header className="location-header">
                    <span>{stay.loc.city}, {stay.loc.country}</span>
                </header>

                <h3 className="stay-name">{stay.name}</h3>

                <p className="stay-price">
                    <span>${stay.price}</span> night
                </p>

                {stay.reviews && stay.reviews.length > 0 && (
                    <p className="stay-rating">
                        <i className="fas fa-star"></i> {calculateAverageRating(stay.reviews)}
                    </p>
                )}
            </div>
        </article>
    )
}

function calculateAverageRating(reviews) {
    const total = reviews.reduce((sum, review) => sum + review.rate, 0)
    return (total / reviews.length).toFixed(2)
}