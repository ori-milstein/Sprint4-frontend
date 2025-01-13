import { AmenitiesList } from './AmenitiesList.jsx';

export function Amenities({ stay }) {
    return (
        <section className="amenities">
            <div className="container">
                <h2 className="subtitle">What this place offers</h2>
                <AmenitiesList stay={stay} />
            </div>
        </section>
    )
}