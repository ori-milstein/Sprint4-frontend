import { ReviewsModal } from "./ReviewsModal.jsx";
import { SET_APP_MODAL_REVIEWS } from "../store/reducers/system.reducer.js";
import { ReviewList } from "./ReviewList.jsx";
export function ReviewSection({ stay, handleShowMore, isModalActive }) {
    return (
        <div className="stay-review-container">
            <section className="stay-review-header">
                <img src='https://res.cloudinary.com/do0a92wpm/image/upload/v1699218791/star_pjyvxm.svg' />
                <p>5.0 · {stay.reviews.length} reviews</p>
            </section>

            <ReviewList stay={stay} isModalActive={isModalActive} />
            {/* <button> */}
            <span className="button" onClick={() => handleShowMore(SET_APP_MODAL_REVIEWS)} >
                Show all {stay.reviews.length} reviews
            </span>
            {/* </button> */}
            {/* <ReviewsModal stay={stay} /> */}
        </div >
    )
}