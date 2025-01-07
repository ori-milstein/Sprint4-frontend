import { Link, NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { logout } from '../store/actions/user.actions'
import Logo from './Logo'
import { HeaderFilter } from './HeaderFilter'
import { useState } from 'react'
import { HeaderUserControls } from './HeaderUserControls'


export function AppHeader() {
	const user = useSelector(storeState => storeState.userModule.user)
	const navigate = useNavigate()
	const [isExpanded, setIsExpanded] = useState(true)

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
		<header className="app-header full">
			 <nav className={isExpanded ? 'expand' : ''}>
				<NavLink to="/" className="logo">
					<Logo />
					<h1>airbnb</h1>
				</NavLink>
				<HeaderFilter isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
				<HeaderUserControls />
			</nav>
		</header>


	)
}
