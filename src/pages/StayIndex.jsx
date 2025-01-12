import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { loadStays, addStay, updateStay, removeStay, addStayMsg } from '../store/actions/stay.actions'
import { renderFilterBar } from '../store/actions/system.actions.js';

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { stayService } from '../services/stay/'
import { userService } from '../services/user'

import { StayList } from '../cmps/StayList'
import { StayFilter } from '../cmps/StayFilter'

export function StayIndex() {
    const stays = useSelector(storeState => storeState.stayModule.stays)
	const filterBy = useSelector((storeState) => storeState.stayModule.filterBy)

    useEffect(() => {
        loadStays(filterBy)
    }, [filterBy])

    useEffect(() => {
        renderFilterBar(true)

        return () => {
            renderFilterBar(false)
        }
    }, [])

    // useEffect(() => {
    //     fetch('/data/stays.json')
    //         .then(res => res.json())
    //         .then(setStays)
    //         .catch(err => console.error('Failed to load stays:', err));
    // }, [])

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