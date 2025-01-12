import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Logo from './Logo';
import { HeaderFilter } from './HeaderFilter';
import { useState } from 'react';
import { HeaderUserControls } from './HeaderUserControls';
import { HeaderAuthMenu } from './HeaderAuthMenu';
import { LoginSignup } from '../pages/LoginSignup';
import { GenericCmp } from './GenericCmp';
import { DatePickerCmp } from './DatePickerCmp';
import { SuggestedLocations } from './SuggestedLocations';
import { GuestSelector } from './GuestSelector';
import { setFiterBy } from '../store/actions/stay.actions';


export function AppHeader() {
	const user = useSelector((storeState) => storeState.userModule.user);
	const filterBy = useSelector((storeState) => storeState.stayModule.filterBy)

	const [isExpanded, setIsExpanded] = useState(true)
	const [isAuthMenuOpen, setIsAuthMenuOpen] = useState(false)
	const [isLoginSignupOpen, setIsLoginSignupOpen] = useState({ isOpen: false, action: null })
	const [inputModal, setInputModal] = useState(null)

	const [checkInDate, setCheckInDate] = useState('')
	const [checkOutDate, setCheckOutDate] = useState('')
	const [guests, setGuests] = useState({ adults: 0, children: 0, infants: 0, pets: 0 })
	const [where, setWhere] = useState('');

	function onToggleMenu() {
		setIsAuthMenuOpen(!isAuthMenuOpen);
	}

	function isMenuOpen() {
		if (isAuthMenuOpen) onToggleMenu();
		if (isLoginSignupOpen.isOpen) onToggleLoginSignupDialog();
	}

	function toggleIsFilterOpen(modal) {
		console.log('modal', modal)
		switch (modal) {
			case 'date-picker':
				setInputModal(modal);
				break
			case 'suggested-locations':
				setInputModal(modal);
				break
			case 'guest-selector':
				setInputModal(modal);
				break
			default:
				setInputModal(null)
				break
		}
	}

	function onToggleLoginSignupDialog(action) {
		setIsLoginSignupOpen((prevState) => ({
			...prevState,
			isOpen: !prevState.isOpen,
			action,
		}))
	}

	function onSearchFromHeader(ev) {
		ev.preventDefault()
		const filterByToUpdate = {
			txt: where,
			minCapacity: 0
		}
		setInputModal(null)
		setFiterBy(filterByToUpdate)
	}

	return (
		<>
			<header className="app-header full" onClick={isMenuOpen}>
				{isLoginSignupOpen.isOpen && <div className="modal-backdrop"></div>}

				<nav className={isExpanded ? 'expand' : ''}>
					<NavLink to="/" className="logo">
						<Logo />
						<h1>airbnb</h1>
					</NavLink>
					<HeaderFilter
						isExpanded={isExpanded}
						setIsExpanded={setIsExpanded}
						toggleIsFilterOpen={toggleIsFilterOpen}
						checkInDate={checkInDate}
						checkOutDate={checkOutDate}
						guests={guests}
						where={where}
						setWhere={setWhere}
						onSearchFromHeader={onSearchFromHeader}
					/>
					{!isLoginSignupOpen.isOpen && <HeaderUserControls onToggleMenu={onToggleMenu} />}
					{isAuthMenuOpen && <HeaderAuthMenu onToggleLoginSignupDialog={onToggleLoginSignupDialog} />}
					{isLoginSignupOpen.isOpen && (
						<LoginSignup isLoginSignupOpen={isLoginSignupOpen} setIsLoginSignupOpen={setIsLoginSignupOpen} />
					)}
				</nav>
			</header>
			{inputModal && isExpanded && (
				<>
					{inputModal === 'date-picker' && (
						<GenericCmp onClose={() => toggleIsFilterOpen(null)}>
							<DatePickerCmp
								onClose={() => setIsExpanded(false)}
								onCheckInChange={(date) => setCheckInDate(date)}
								onCheckOutChange={(date) => setCheckOutDate(date)}
							/>

						</GenericCmp>
					)}
					{inputModal === 'suggested-locations' && (
						<GenericCmp onClose={() => toggleIsFilterOpen(null)} width='428px' left='33%'>
							<SuggestedLocations
								setWhere={setWhere}
								onClose={() => toggleIsFilterOpen(null)}
							/>
						</GenericCmp>
					)}
					{inputModal === 'guest-selector' && (
						<GenericCmp onClose={() => toggleIsFilterOpen(null)} width='417px' left='66%' top='43%' height='417px'>
							<GuestSelector
								guests={guests}
								setGuests={setGuests}
								onClose={() => toggleIsFilterOpen(null)}
							/>
						</GenericCmp>
					)}
				</>
			)}

		</>
	);
}
