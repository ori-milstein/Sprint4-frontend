import { useState } from 'react'

export function StayPreview({ stay }) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isModalOpen, setIsModalOpen] = useState(false)

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
                        <button className="close-btn" onClick={handleModalClose}>
                            &times;
                        </button>
                        <h2>Create Wishlist</h2>
                        <form>
                            <input
                                type="text"
                                id="wishlist-name"
                                maxLength="50"
                                placeholder="Name"
                            />
                            <div className="modal-actions">
                                <button type="button" class="clear-btn">Clear</button>
                                <button type="submit" class="create-btn" disabled>Create</button>
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