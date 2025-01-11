import { ReviewsModal } from "./RieviewsModal.jsx";
// import { SET_APP_MODAL_REVIEWS } from "../store/reducers/system.reducer.js";

export function ReviewSection({ stay, handleShowMore }) {

    const firstSixReviews = stay.reviews.slice(0, 6)
    return (
        <div className="stay-review-container">
            <section className="stay-review-header">
                <img src='https://res.cloudinary.com/do0a92wpm/image/upload/v1699218791/star_pjyvxm.svg' />
                <p>5.0 · {stay.reviews.length} reviews</p>
            </section>
            <div className='stay-review-list'>
                {firstSixReviews.map((review, idx) => {
                    const reviewDate = new Date(review.at)

                    // const month = reviewDate.toLocaleString('default', { month: 'long' })
                    const thisYear = new Date().getFullYear()
                    const reviewYear = reviewDate.getFullYear()
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
                                    <div>
                                        {review.txt}
                                    </div>
                                </section>
                            </article>
                        </section>
                    )
                })}
            </div>
            {/* <button> */}
            <span className="button" onClick={() => handleShowMore(/*SET_APP_MODAL_REVIEWS*/)} >
                Show all {stay.reviews.length} reviews
            </span>
            {/* </button> */}
            {/* <ReviewsModal stay={stay} /> */}
        </div >
    )
}