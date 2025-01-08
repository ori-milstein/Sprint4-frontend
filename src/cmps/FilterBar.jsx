import { useState, useRef, useEffect } from 'react'
import { makeId } from '../services/util.service'
// import { FaChevronRight, FaChevronLeft } from 'react-icons/fa'

export function FilterSlider({ filters, onFilterChange, filterBy, onChange, filterToEdit }) {
    const filterItemsRef = useRef(null)
    const [isEnd, setIsEnd] = useState(false)
    const [isStart, setIsStart] = useState(true)

    useEffect(() => {
        console.log('filters', filters)
        if (!filterItemsRef.current) return
        calcIsFullyScrolled()

        const handleScroll = () => {
            calcIsFullyScrolled()
        }

        filterItemsRef.current.addEventListener('scroll', handleScroll)

        return () => {
            filterItemsRef.current?.removeEventListener('scroll', handleScroll)
        }
    }, [filterItemsRef.current?.scrollLeft])

    const onScrollFilters = (direction) => {
        if (filterItemsRef.current) {
            const { clientWidth } = filterItemsRef.current
            filterItemsRef.current.scrollLeft += clientWidth * 0.6 * direction
        }
    }

    const calcIsFullyScrolled = () => {
        if (!filterItemsRef.current) return
        const { scrollLeft, scrollWidth, clientWidth } = filterItemsRef.current
        setIsEnd(Math.round(scrollLeft) === Math.round(scrollWidth - clientWidth))
        setIsStart(scrollLeft === 0)
    }

    return (
        <section
            // className={`filter-slider         ${!isStart ? 'before-shown' : ''} `}
            className={`filter-slider ${!isStart ? 'before-shown' : ''} ${isEnd ? 'after-hidden' : ''}`}
        // className={`filter-slider`}
        >
            <button
                onClick={() => onScrollFilters(-1)}
                className={`filters-nav-btn prev-filters-btn ${!isStart ? 'shown' : ''}`}
            >
                {/* <FaChevronLeft size={'.75rem'} /> */}
            </button>
            <div className='filter-items flex' ref={filterItemsRef}>
                {filters.length
                    ? filters.map(filter => (
                        <label key={makeId()}>
                            <div
                            // className={`filter-widget ${filterBy.labels[0] === filter.title ? 'active' : ''}`}
                            // onClick={() => onFilterChange(filter.title)}
                            // onClick={
                            // onChange}
                            >
                                <img src={filter.img} alt={filter.title} />
                                <p>{filter.title}</p>
                                <input
                                    type="radio"
                                    name="label"
                                    value={filter.title}
                                    onChange={onChange}
                                // checked={filterToEdit.sortDir === -1}
                                />
                            </div>
                        </label>
                    ))
                    : Array(20)
                        .fill(undefined)
                        .map((_, index) => (
                            <div key={index} className='filter-widget filter-skeleton-wrapper'>
                                <div className='filter-skeleton-img'></div>
                                <div className='filter-skeleton-txt'></div>
                            </div>
                        ))}
            </div>
            <button
                onClick={() => onScrollFilters(1)}
                className={`filters-nav-btn next-filters-btn ${!isEnd ? 'shown' : ''}`}
            // className={`filters-nav-btn next-filters-btn`}
            >
                {/* <FaChevronRight size={'.75rem'} /> */}
            </button>
        </section>
    )
}