import { useState, useEffect } from 'react'
// import { useSelector } from 'react-redux'

import { loadStays, addStay, updateStay, removeStay, addStayMsg } from '../store/actions/stay.actions'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { stayService } from '../services/stay/'
import { userService } from '../services/user'

import { StayList } from '../cmps/StayList'
import { StayFilter } from '../cmps/StayFilter'

<<<<<<< HEAD
export function StayIndex() {
    const [stays, setStays] = useState([])
    const [filterBy, setFilterBy] = useState(stayService.getDefaultFilter())
    // const stays = useSelector(storeState => storeState.stayModule.stays)

    useEffect(() => {
        loadStays()
=======
export function StayIndex({ filterBy, setFilterBy }) {

    // const [filterBy, setFilterBy] = useState(stayService.getDefaultFilter())
    const stays = useSelector(storeState => storeState.stayModule.stays)

    useEffect(() => {
        console.log('filterBy', filterBy)
        loadStays(filterBy)
>>>>>>> 1739ea07bb8eda445f5d38b645d258d5607ef92a
    }, [filterBy])

    useEffect(() => {
        fetch('/data/stays.json')
            .then(res => res.json())
            .then(setStays)
            .catch(err => console.error('Failed to load stays:', err));
    }, [])

    async function onRemoveStay(stayId) {
        try {
            await removeStay(stayId)
            showSuccessMsg('Stay removed')
        } catch (err) {
            showErrorMsg('Cannot remove stay')
        }
    }

    async function onAddStay() {
        const stay = stayService.getEmptyStay()
        stay.loc.country = prompt('Country?')
        stay.loc.city = prompt('City?')
        try {
            const savedStay = await addStay(stay)
            showSuccessMsg(`Stay added (id: ${savedStay._id})`)
        } catch (err) {
            showErrorMsg('Cannot add stay')
        }
    }

    async function onUpdateStay(stay) {
        const capacity = +prompt('New capacity?', stay.capacity)
        if (capacity === 0 || capacity === stay.capacity) return

        const stayToSave = { ...stay, capacity }
        try {
            const savedStay = await updateStay(stayToSave)
            showSuccessMsg(`Stay updated, new capacity: ${savedStay.capacity}`)
        } catch (err) {
            showErrorMsg('Cannot update stay')
        }
    }

    // if (!stays || !stays.length) return <div>Loading...</div>

    return (
        <main className="stay-index">
            {/* <StayFilter
                filterBy={filterBy}
                setFilterBy={setFilterBy} /> */}
            <StayList
                stays={stays}
                onRemoveStay={onRemoveStay}
                onUpdateStay={onUpdateStay} />
        </main>
    )
}