import { useState, useEffect } from 'react'
import { FilterSlider } from '../cmps/FilterBar'

export function StayFilter({ filterBy, setFilterBy }) {
    const [filterToEdit, setFilterToEdit] = useState(structuredClone(filterBy))

    useEffect(() => {
        setFilterBy(filterToEdit)
        console.log('filterToEdit', filterToEdit)
    }, [filterToEdit])

    function handleChange(ev) {
        const type = ev.target.type
        console.log('type', type)
        const field = ev.target.name
        console.log('field', field)
        let value

        switch (type) {
            case 'text':
            case 'radio':
                value = field === 'sortDir' ? +ev.target.value : ev.target.value
                if (!filterToEdit.sortDir) filterToEdit.sortDir = 1
                break
            case 'number':
                value = +ev.target.value || ''
                break
        }
        setFilterToEdit({ ...filterToEdit, [field]: value })
    }

    function clearFilter() {
        setFilterToEdit({ ...filterToEdit, txt: '', minCapacity: '', maxPrice: '' })
    }

    return (
        // <section className="stay-filter">
        <div className='filters main-layout'>
            <div className='wrapper'>
                <FilterSlider
                    filters={[
                        { title: 'OMG!', img: '../../src/assets/assets/icons/filter bar icons/asset 6.jpeg' },
                        { title: 'Icons', img: '../../src/assets/assets/icons/filter bar icons/asset 7.webp' },
                        { title: 'Castles', img: '../../src/assets/assets/icons/filter bar icons/asset 8.jpeg' },
                        { title: 'Beahcfront', img: '../../src/assets/assets/icons/filter bar icons/asset 9.jpeg' },
                        { title: 'Bed & breakfasts', img: '../../src/assets/assets/icons/filter bar icons/asset 10.jpeg' },
                        { title: 'Desert', img: '../../src/assets/assets/icons/filter bar icons/asset 11.jpeg' },
                        { title: 'Amazing views', img: '../../src/assets/assets/icons/filter bar icons/asset 12.jpeg' },
                        { title: 'Amazing pools', img: '../../src/assets/assets/icons/filter bar icons/asset 13.jpeg' },
                        { title: 'Mansions', img: '../../src/assets/assets/icons/filter bar icons/asset 14.jpeg' },
                        { title: 'Cabins', img: '../../src/assets/assets/icons/filter bar icons/asset 15.jpeg' },
                        { title: 'Countryside', img: '../../src/assets/assets/icons/filter bar icons/asset 16.jpeg' },
                        { title: 'Lakefront', img: '../../src/assets/assets/icons/filter bar icons/asset 17.jpeg' },
                        { title: 'Islands', img: '../../src/assets/assets/icons/filter bar icons/asset 18.jpeg' },
                        { title: 'Design', img: '../../src/assets/assets/icons/filter bar icons/asset 19.jpeg' },
                        { title: 'Off-the-grid', img: '../../src/assets/assets/icons/filter bar icons/asset 20.jpeg' },
                        { title: 'Farms', img: '../../src/assets/assets/icons/filter bar icons/asset 21.jpeg' },
                        { title: 'Trending', img: '../../src/assets/assets/icons/filter bar icons/asset 22.jpeg' },
                        { title: 'Treehouses', img: '../../src/assets/assets/icons/filter bar icons/asset 23.jpeg' },
                        { title: 'Luxe', img: '../../src/assets/assets/icons/filter bar icons/asset 24.jpeg' },
                        { title: 'Luxe', img: '../../src/assets/assets/icons/filter bar icons/asset 25.jpeg' },
                        { title: 'Luxe', img: '../../src/assets/assets/icons/filter bar icons/asset 26.jpeg' },
                        { title: 'Luxe', img: '../../src/assets/assets/icons/filter bar icons/asset 27.jpeg' },
                    ]}
                    onFilterChange={setFilterBy}
                    filterBy={filterBy}
                    onChange={handleChange}
                    filterToEdit={filterToEdit} />
            </div>
        </div>
        // </section >
    )
}