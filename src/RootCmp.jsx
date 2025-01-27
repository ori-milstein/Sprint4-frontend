import React from 'react'
import { Routes, Route, useHref } from 'react-router'
import { useState } from 'react'
import { useSelector } from 'react-redux'

import { StayIndex } from './pages/StayIndex.jsx'
import { ReviewIndex } from './pages/ReviewIndex.jsx'
import { ChatApp } from './pages/Chat.jsx'
import { AdminIndex } from './pages/AdminIndex.jsx'

import { ConfirmPay } from './pages/ConfirmPay.jsx'

import { StayDetails } from './pages/StayDetails'
import { UserDetails } from './pages/UserDetails'
import { PhotosPage } from './pages/PhotosPage'
import { AppHeader } from './cmps/AppHeader'
import { AppFooter } from './cmps/AppFooter'
import { UserMsg } from './cmps/UserMsg.jsx'
import { LoginSignup } from './pages/LoginSignup.jsx'
import { Login } from './pages/Login.jsx'
import { Signup } from './pages/Signup.jsx'
import { StayFilter } from './cmps/StayFilter.jsx'
import { Add } from "./pages/Add.jsx";
export function RootCmp() {
    const isHomePage = useSelector(storeState => storeState.systemModule.isHomePage)
    let href = useHref(null)
    const regex = /^\/([^\/]*)/
    const match = href.match(regex)
    const hrefFirstWord = match ? match[1] : ''

    return (
        <div >
            <main className={`main-container ${hrefFirstWord}`}>
                <Routes>
                    <Route path="/" element={<StayIndex />} />
                    <Route path="add" element={<Add />} />
                    <Route path="stay/:stayId" element={<StayDetails />} />
                    <Route path="/photos" element={<PhotosPage />} />
                    <Route path="user/:id" element={<UserDetails />} />
                    <Route path="/confirm-pay" element={<ConfirmPay />} />
                    <Route path="review" element={<ReviewIndex />} />
                    <Route path="chat" element={<ChatApp />} />
                    <Route path="admin" element={<AdminIndex />} />
                    <Route path="login" element={<LoginSignup />}>
                        <Route index element={<Login />} />
                        <Route path="signup" element={<Signup />} />
                    </Route>
                </Routes>
            </main>
            {/* <AppFooter /> */}
        </div >
    )
}


