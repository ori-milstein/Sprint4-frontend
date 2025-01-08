import React, { useState } from 'react';

export function LoginSignup({ isLoginSignupOpen, setIsLoginSignupOpen }) {
    console.log('isLoginSinupOpen', isLoginSignupOpen)
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

    return (
        <div className="login-signup-page">
            <h1>{isLoginSignupOpen.action === 'login' ? 'Login' : 'Signup'}</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
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
                    <label htmlFor="password">Password:</label>
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
                        <label htmlFor="fullname">Full Name:</label>
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