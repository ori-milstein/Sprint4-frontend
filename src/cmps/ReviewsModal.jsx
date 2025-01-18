import { useState } from 'react'
import { ReviewList } from './ReviewList'

export function ReviewsModal({ stay, isModalActive, reviewIdxToScroll }) {
    const [searchTerm, setSearchTerm] = useState('')
    const [filteredReviews, setFilteredReviews] = useState(stay.reviews)
    const [mentionCount, setMentionCount] = useState(0)
    const [mention, setMention] = useState('')
    const [tempSearchTerm, setTempSearchTerm] = useState('')
    const [isNoResult, setIsNoResult] = useState(true);
    console.log('reviewIdxToScroll', reviewIdxToScroll)

    const handleSearch = () => {
        const lowerCaseSearchTerm = tempSearchTerm.toLowerCase()
        const filtered = stay.reviews.filter((review) =>
            review.txt.toLowerCase().includes(lowerCaseSearchTerm)
        )
        setMention(lowerCaseSearchTerm)
        setFilteredReviews(filtered)
        setMentionCount(filtered.length)
        setSearchTerm(tempSearchTerm)
        if (!mentionCount) setIsNoResult(false)
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch()
        }
    }

    const handleSearchInputChange = (e) => {
        setTempSearchTerm(e.target.value)
    }

    const handleClear = () => {
        setTempSearchTerm('')
        setSearchTerm('')
        setFilteredReviews(stay.reviews)
        setMentionCount(0)
        setMention('')
        setIsNoResult(true)
    }

    return (
        <section className="modal-reviews-container">
            <section className='modal-reviews-score'>
                <img src='https://res.cloudinary.com/do0a92wpm/image/upload/v1699218791/star_pjyvxm.svg' alt="Star" />
                <span>{stay.rating} · {stay.reviews.length} reviews</span>
            </section>
            <section className='modal-reviews-list'>
                <section>
                    <div className='review-search'>
                        <img src='https://res.cloudinary.com/do0a92wpm/image/upload/v1699218789/reviews-search_lrhaze.svg' />
                        <input
                            type="text"
                            placeholder="Search reviews"
                            value={tempSearchTerm}
                            onChange={handleSearchInputChange}
                            onKeyPress={handleKeyPress}
                        />
                        {tempSearchTerm &&
                            <button className='btn-clear-filter' onClick={handleClear}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" style="display: block; fill: none; height: 16px; width: 16px; stroke: currentcolor; stroke-width: 3px; overflow: visible;" aria-hidden="true" role="presentation" focusable="false"><path d="m6 6 20 20M26 6 6 26"></path></svg></button>}
                    </div>
                </section>
                <div>
                    {mentionCount > 0 && mention && (
                        <p className='reviews-mentioned'>{mentionCount} reviews mentioned "{searchTerm}"</p>
                    )}
                    {!isNoResult && !mentionCount && (
                        <p className='reviews-mentioned'>There are no results for "{searchTerm}"</p>
                    )}
                </div>
                {/* {filteredReviews.map((review, idx) => {
                    const reviewDate = new Date(review.at)
                    const month = reviewDate.toLocaleString('default', { month: 'long' })
                    const year = reviewDate.getFullYear()

                    return (
                        <section className='modal-review-preview' key={idx}>
                            <article className='modal-review-user'>
                                <section className='modal-review-img'>
                                    <img src={review.by.imgUrl} alt="User Image" />
                                </section>
                                <section className="review-user-details">
                                    <h3>{review.by.fullname}</h3>
                                    <span>{`${month} ${year}`}</span>
                                </section>
                            </article>
                            <article className='modal-review-content'>
                                <p>{review.txt}</p>
                            </article>
                        </section>
                    )
                })
                } */}
                <ReviewList stay={stay} isModalActive={isModalActive} reviewIdxToScroll={reviewIdxToScroll} />
            </section>
        </section>
    )
}