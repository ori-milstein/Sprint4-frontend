import { useState } from 'react'
import { AppHeader } from './AppHeader'

export function Headers() {
    const [filterBy, setFilterBy] = useState(stayService.getDefaultFilter())

    return (
        <section className="headers">
            <AppHeader filterBy={filterBy} setFilterBy={setFilterBy} />
            {isHomePage && <StayFilter filterBy={filterBy} setFilterBy={setFilterBy} />}
        </section> 
    )
}