import { useRef, useState } from "react"
import { makeId } from "../services/util.service.js"
import { use } from "react"

export function AmenitiesList({ stay, isModalActive }) {
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
    ]

    let amenitiesToRender = stay.amenities.filter(amenity => amenitiesWithIcon.includes(amenity))

    amenitiesToRender = (isModalActive) ? amenitiesToRender : amenitiesToRender.slice(0, 10)


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