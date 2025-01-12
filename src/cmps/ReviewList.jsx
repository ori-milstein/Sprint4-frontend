export function ReviewList({ stay, onRemoveReview, isModalActive }) {
    const reviews = (isModalActive) ? stay.reviews : stay.reviews.slice(0, 6)

    return (
        <div className={`stay-review-list  ${isModalActive ? 'isModal' : ''}`}>
            {reviews.map((review, idx) => {
                const reviewDate = new Date(review.at)
                const month = reviewDate.toLocaleString('default', { month: 'long' })
                const reviewYear = reviewDate.getFullYear()
                const thisYear = new Date().getFullYear()
                const yearsAgo = thisYear - reviewYear

                return (
                    <section className='stay-review-preview' key={idx}>

                        <article className="review-user">
                            <section className="review-img-container">
                                <img src={review.by.imgUrl} />
                            </section>
                            <section className="review-user-details">
                                <h3>{review.by.fullname}</h3>
                                <span className="years-ago">{`${yearsAgo} years on Airbnb`}</span>
                            </section>
                        </article>
                        <article className="flex">
                            <span className="stars">
                                <img src='../../src/assets/assets/icons/general icons/asset 158.svg' />
                                <img src='../../src/assets/assets/icons/general icons/asset 158.svg'
                                    className={(review.rate >= 2) ? '' : 'is-gray'} />
                                <img src='../../src/assets/assets/icons/general icons/asset 158.svg'
                                    className={(review.rate >= 3) ? '' : 'is-gray'} />
                                <img src='../../src/assets/assets/icons/general icons/asset 158.svg'
                                    className={(review.rate >= 4) ? '' : 'is-gray'} />
                                <img src='../../src/assets/assets/icons/general icons/asset 158.svg'
                                    className={(review.rate === 5) ? '' : 'is-gray'} />
                            </span>
                            <span className="dot">·</span>
                            <span className="date">{month} {reviewYear}</span>
                            <span className="dot">·</span>
                            <span className="stayed">Stayed a few nights</span>
                        </article>

                        <article className="review-content">
                            <section>
                                <div className={isModalActive ? "isModal" : ""}>
                                    {review.txt}
                                </div>
                            </section>
                        </article>
                    </section>
                )
            })}
        </div>
    )
}