import React, { useState } from 'react';

export function LoginSignup({ isLoginSignupOpen, setIsLoginSignupOpen }) {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        fullname: ''
    });

    const handleChange = (ev) => {
        const { name, value } = ev.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const handleSubmit = (ev) => {
        ev.preventDefault();
        if (isLoginSignupOpen.action === 'login') {
            console.log('Logging in with:', formData.username, formData.password);
        } else if (isLoginSignupOpen.action === 'signup') {
            console.log('Signing up with:', formData.username, formData.password, formData.fullname);
        }
    };

    function handleClick(event) {
        event.stopPropagation()
    }

    return (
        <div className="login-signup-page" onClick={handleClick}>
            <h1 style={{paddingTop: isLoginSignupOpen.action === 'signup' ? '20px' : '0'}}>{isLoginSignupOpen.action === 'login' ? 'Login' : 'Signup'}</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username"><span>* </span>Username:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password"><span>* </span>Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                {isLoginSignupOpen.action === 'signup' && (
                    <div className="form-group">
                        <label htmlFor="fullname"><span>* </span>Full Name:</label>
                        <input
                            type="text"
                            id="fullname"
                            name="fullname"
                            value={formData.fullname}
                            onChange={handleChange}
                            required
                        />
                    </div>
                )}
                <button type="submit">{isLoginSignupOpen.action === 'login' ? 'Login' : 'Signup'}</button>
            </form>
        </div>
    );
}