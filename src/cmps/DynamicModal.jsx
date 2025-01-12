import { SET_APP_MODAL_REVIEWS } from "../store/reducers/system.reducer.js";
import { ReviewsModal } from "./ReviewsModal.jsx";

export function ModalContent({ modalType, stay, onClose }) {

    switch (modalType) {

        // case SET_APP_MODAL_LOGIN:
        // return <SignupModal onClose={ onClose } />
        // case SET_APP_MODAL_SIGNUP:
        // return <SignupModal onClose={ onClose } />
        // case SET_APP_MODAL_ABOUT:
        // return <AboutModal stay={ stay } />
        // case SET_APP_MODAL_AMENITIES:
        // return <AmenitiesModal stay={ stay } />
        case SET_APP_MODAL_REVIEWS:
            return <ReviewsModal stay={stay} isModalActive={true} />
        default: return

    }

}