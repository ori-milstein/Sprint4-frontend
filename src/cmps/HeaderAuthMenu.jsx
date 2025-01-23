import { useSelector } from "react-redux"

export function HeaderAuthMenu({ onToggleLoginSignupDialog,onUserLogout }) {
	const user = useSelector((storeState) => storeState.userModule.user)
    if(user) return (
        <div className="auth-menu">
            Hello, {user.fullname}
            <button onClick={onUserLogout}>logout</button>
        </div>
    )
    return (
        <div className="auth-menu">
            <label className="auth-menu-item login-action" onClick={() => onToggleLoginSignupDialog('login')}>Log in</label>
            <label className="auth-menu-item" onClick={() => onToggleLoginSignupDialog('signup')}>Sign up</label>
        </div>
    )
}