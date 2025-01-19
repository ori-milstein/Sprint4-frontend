import { DetailsMap } from '../cmps/DetailsMap.tsx'

export function LocationDetails({ stay }) {
    return (
        <section className="location-details">
            <h2 className='subtitle '>Where You'll be</h2>
            <div className='regular-text'>{stay.host.location}</div>
            <DetailsMap lat={stay.loc.lat} lng={stay.loc.lan} />
        </section>
    )
}