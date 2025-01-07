import { Link, NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { logout } from '../store/actions/user.actions'
import Logo from './Logo'
import { HeaderFilter } from './HeaderFilter'
import { useState } from 'react'


export function AppHeader() {
	const user = useSelector(storeState => storeState.userModule.user)
	const navigate = useNavigate()
	const [isExpanded, setIsExpanded] = useState(false)

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
				{user?.isAdmin && <NavLink to="/admin">Admin</NavLink>}
				{!user && <NavLink to="login" className="login-link">Login</NavLink>}
				{user && (
					<div className="user-info">
						<Link to={`user/${user._id}`}>
							{/* {user.imgUrl && <img src={user.imgUrl} />} */}
							{user.fullname}
						</Link>
						<button onClick={onLogout}>logout</button>
					</div>
				)}
			</nav>
		</header>


	)
}
