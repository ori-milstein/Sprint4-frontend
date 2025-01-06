import { Link } from 'react-router-dom'

export function StayPreview({ stay }) {
    return <article className="preview">
        <header>
            <Link to={`/stay/${stay._id}`}>{stay.loc.city}, {stay.loc.country}</Link>
        </header>

        <p><span>₪{stay.price}</span> night</p>
        {stay.owner && <p>Owner: <span>{stay.owner.fullname}</span></p>}

    </article>
}