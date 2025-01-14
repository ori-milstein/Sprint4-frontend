import { makeId } from "../services/util.service.js"

export function AmenitiesList({ amenities, isModalActive }) {

    let amenitiesToRender = (isModalActive) ? amenities : amenities.slice(0, 10)

    return (
        <div className="amenities-list">
            <ul>
                {amenitiesToRender.map((amenity) => {
                    return (
                        <li key={makeId()} className="amenity">


                            <img src={`../../src/assets/assets/icons/amenities/${amenity}.svg`} />


                            <span className="regular-text">{amenity}</span>
                        </li>
                    )
                })}
            </ul>
        </div>
    )

}