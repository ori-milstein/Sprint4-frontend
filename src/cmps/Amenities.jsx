import { AmenitiesList } from './AmenitiesList.jsx';

export function Amenities({ stay, isModalActive = false }) {
    const amenitiesWithIcon = [
        'Wifi',
        'Air conditioning',
        'Laptop-friendly workspace',
        'Heating',
        'Essentials',
        'Hot water',
        'Free parking on premises',
        'Washer',
        'Dryer',
        'Iron',
        'Hair dryer',
        'Shampoo',
        "Smoke detector",
        "Carbon monoxide detector",
        "First aid kit",
        "Fire extinguisher",
        "TV",
        "Hangers",
        "Ethernet connection",
        "Patio or balcony",
    ]

    let amenitiesToRender = stay.amenities.filter(amenity => amenitiesWithIcon.includes(amenity))



    return (
        <section className="amenities">
            <div className="container">
                <h2 className="subtitle">What this place offers</h2>
                <AmenitiesList amenities={amenitiesToRender} isModalActive={isModalActive} />
                <span className="regular-white-btn" onClick={() => handleShowMore(SET_APP_MODAL_AMENITIES)} >
                    Show all {amenitiesToRender.length} amenities
                </span>
            </div>
        </section>
    )
}