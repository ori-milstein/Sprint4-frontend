import { Link } from 'react-router-dom'

import { userService } from '../services/user'
import { StayPreview } from './StayPreview'

export function StayList({ stays, onRemoveStay, onUpdateStay, onToggleWishlist }) {

    function shouldShowActionBtns(stay) {
        const user = userService.getLoggedinUser()
        if (!user) return false
        if (user.isAdmin) return true
        return stay.owner?._id === user._id
    }

    if (!stays || !stays.length) return <div>No stays found</div>

    return <section >
        <ul className="stay-list">
            {stays.map(stay =>
                <li key={stay._id}>
                    <Link to={`/stay/${stay._id}`} className="stay-link">
                        <StayPreview stay={stay} onToggleWishlist={onToggleWishlist} />
                    </Link>
                    {shouldShowActionBtns(stay) && <div className="actions">
                        <button onClick={() => onUpdateStay(stay)}>Edit</button>
                        <button onClick={() => onRemoveStay(stay._id)}>x</button>
                    </div>}
                </li>)
            }
        </ul>
    </section>
}
