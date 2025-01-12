export function ReviewList({ stay, onRemoveReview, isModalActive }) {
    const reviews = (isModalActive) ? stay.reviews : stay.reviews.slice(0, 6)

    return (
        <div className={`stay-review-list  ${isModalActive ? 'isModal' : ''}`}>
            {reviews.map((review, idx) => {
                const reviewDate = new Date(review.at)

                // const month = reviewDate.toLocaleString('default', { month: 'long' })
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
                                <span>{`${yearsAgo} years on Airbnb`}</span>
                            </section>
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