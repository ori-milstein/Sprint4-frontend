import { Link, NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { logout } from '../store/actions/user.actions'
import Logo from './Logo'
import { HeaderFilter } from './HeaderFilter'
import { useState } from 'react'
import { HeaderUserControls } from './HeaderUserControls'
import { HeaderAuthMenu } from './HeaderAuthMenu'
import { LoginSignup } from '../pages/LoginSignup'


export function AppHeader() {
	const user = useSelector(storeState => storeState.userModule.user)
	const navigate = useNavigate()
	const [isExpanded, setIsExpanded] = useState(true)
	const [isAuthMenuOpen, setIsAuthMenuOpen] = useState(false)
	const [isLoginSignupOpen, setIsLoginSignupOpen] = useState({ isOpen: false, action: null })

	function onToggleMenu() {
		setIsAuthMenuOpen(!isAuthMenuOpen)
	}

	function isMenuOpen() {
		if (isAuthMenuOpen) onToggleMenu()
		if (isLoginSignupOpen.isOpen) onToggleLoginSignupDialog()
	}

	function onToggleLoginSignupDialog(action) {
		setIsLoginSignupOpen(prevState => ({
			...prevState,
			isOpen: !prevState.isOpen,
			action
		}))
	}

	async function onLogout() {
		try {
			await logout()
			navigate('/')
			showSuccessMsg(`Bye now`)
		} catch (err) {
			showErrorMsg('Cannot logout')
		}
	}

	return (
		<>
			<header className="app-header full" onClick={isMenuOpen}>
				{isLoginSignupOpen.isOpen && <div className='modal-backdrop'></div>}

				<nav className={isExpanded ? 'expand' : ''}>
					<NavLink to="/" className="logo">
						<Logo />
						<h1>airbnb</h1>
					</NavLink>
					<HeaderFilter isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
					{!isLoginSignupOpen.isOpen && <HeaderUserControls onToggleMenu={onToggleMenu} />}
					{isAuthMenuOpen && <HeaderAuthMenu onToggleLoginSignupDialog={onToggleLoginSignupDialog} />}
					{isLoginSignupOpen.isOpen && <LoginSignup isLoginSignupOpen={isLoginSignupOpen} setIsLoginSignupOpen={setIsLoginSignupOpen} />}
				</nav>
			</header>
		</>
	)
}
