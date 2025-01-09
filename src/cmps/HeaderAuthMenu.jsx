export function HeaderAuthMenu({ onToggleLoginSignupDialog }) {
    return (
        <div className="auth-menu">
            <label className="auth-menu-item login-action" onClick={() => onToggleLoginSignupDialog('login')}>Log in</label>
            <label className="auth-menu-item" onClick={() => onToggleLoginSignupDialog('signup')}>Sign up</label>
        </div>
    )
}