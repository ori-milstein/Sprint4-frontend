export function HeaderFilter() {
    return (
        <form className="filter-container">
            <div className="filter-action-container">
                <label htmlFor="filter-where" className="filter-label">Where</label>
                <input id="filter-where" className="filter-action filter-where" placeholder="Search destinations"></input>
            </div>
            <div className="filter-action-container">
                <label htmlFor="filter-checkin" className="filter-label">Check in</label>
                <input id="filter-checkin" className="filter-action filter-checkin" placeholder="Add dates"></input>
            </div>
            <div className="filter-action-container">
                <label htmlFor="filter-checkout" className="filter-label">Check out</label>
                <input id="filter-checkout" className="filter-action filter-checkout" placeholder="Add dates"></input>
            </div>
            <div className="filter-action-container who">
                <label htmlFor="filter-who" className="filter-label">Who</label>
                <input id="filter-who" className="filter-action filter-who" placeholder="Add guests"></input>
            </div>
            <button className="filter-search"><svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                width="13"
                height="13"
                stroke="white"
                stroke-width="4"
                stroke-linecap="round"
                stroke-linejoin="round"
            >
                <path fill="none" d="M13 24a11 11 0 1 0 0-22 11 11 0 0 0 0 22zm8-3 9 9"></path>
            </svg>
            </button>
        </form>
    );
}
