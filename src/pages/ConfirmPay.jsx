import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { AppHeader } from "../cmps/AppHeader.jsx"
import { loadFromStorage } from "../services/util.service"

const STORAGE_KEY = "stay"

export function ConfirmPay() {
    const { state } = useLocation()
    const [stay, setStay] = useState(state?.stay || null)
    const [selectedOption, setSelectedOption] = useState("pay-now")


    const handleOptionChange = (option) => {
        setSelectedOption(option);
    }

    useEffect(() => {
        if (!stay) {
            const stays = loadFromStorage(STORAGE_KEY) || []
            if (stays.length > 0) {
                setStay(stays[0])
            }
        }
    }, [stay])

    if (!stay) {
        return <div>Loading...</div>
    }

    return (
        <>
            <AppHeader />
            <div className="confirm-pay-page">
                <div className="container">
                    {/* Left Section: Trip Details */}
                    <div className="trip-details">
                        <div className="header">Confirm and Pay</div>
                        <div className="no-service-fee">
                            <p>No service fee.</p>
                            <span>Valia covers the service fee for their guests.</span>
                        </div>
                        <div className="section">
                            <div className="section-header">Your trip</div>
                            <div className="details">
                                <div>
                                    <p>Dates</p>
                                    <p>Mar 20 – 25</p>
                                </div>
                                <a href="#edit" className="edit">
                                    Edit
                                </a>
                            </div>
                            <div className="details">
                                <div>
                                    <p>Guests</p>
                                    <p>1 guest</p>
                                </div>
                                <a href="#edit" className="edit">
                                    Edit
                                </a>
                            </div>
                        </div>
                        <hr />
                        <div className="section pay-options">
                            <div className="section-header">Choose how to pay</div>
                            <label
                                className={selectedOption === "pay-now" ? "selected" : ""}
                                onClick={() => handleOptionChange("pay-now")}
                            >
                                <input
                                    type="radio"
                                    name="payment-option"
                                    value="pay-now"
                                    checked={selectedOption === "pay-now"}
                                    onChange={() => handleOptionChange("pay-now")}
                                />
                                Pay ₪{stay.price * 5} now
                            </label>
                            <label
                                className={selectedOption === "pay-later" ? "selected" : ""}
                                onClick={() => handleOptionChange("pay-later")}
                            >
                                <input
                                    type="radio"
                                    name="payment-option"
                                    value="pay-later"
                                    checked={selectedOption === "pay-later"}
                                    onChange={() => handleOptionChange("pay-later")}
                                />
                                Pay part now, part later
                                <span className="payment-info">
                                    ₪{(stay.price * 5) / 2} due today, ₪
                                    {(stay.price * 5) / 2} on Mar 5, 2025. No extra fees.
                                    <a href="#more-info">More info</a>
                                </span>
                            </label>
                        </div>
                    </div>

                    {/* Right Section: Price Summary */}
                    <div className="price-summary">
                        <div className="image">
                            {/* Display the main image */}
                            {stay.imgUrls && stay.imgUrls.length > 0 ? (
                                <img
                                    className="main-image"
                                    src={stay.imgUrls[0]}
                                    alt="Main Stay Image"
                                />
                            ) : (
                                <div className="placeholder">Image Not Available</div>
                            )}
                            <div className="info">
                                <p className="title">{stay.name}</p>
                                <p className="rating">
                                    {stay.reviews.length > 0 ? "5.00" : "New"} (
                                    {stay.reviews.length} reviews) •{" "}
                                    {stay.host.isSuperhost ? "Superhost" : ""}
                                </p>
                            </div>
                        </div>
                        <div className="price-details">
                            <hr />
                            <h3>Price details</h3>
                            <div className="price-row">
                                <p>₪{stay.price} x 5 nights</p>
                                <p>₪{stay.price * 5}</p>
                            </div>
                            <div className="price-row">
                                <p>Early bird discount</p>
                                <p>-₪{stay.price}</p>
                            </div>
                            <hr />
                            <div className="price-row total">
                                <p>Total (ILS)</p>
                                <p>₪{stay.price * 4}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Payment Form */}
            <div className="payment-form">
                <hr className="separator" />
                <div className="pay-with-header">
                    <h3>Pay with</h3>
                    <div className="payment-icons">
                        <img src="/src/assets/logos/Visa_Brandmark_Blue_RGB_2021.png" alt="Visa" />
                        <img src="/src/assets/logos/Full Colour .png" alt="MasterCard" />
                        <img src="/src/assets/logos/American Express_id9oPLWkTF_0.png" alt="AMEX" />
                        <img src="/src/assets/logos/google-pay.png" alt="Google Pay" />
                    </div>
                </div>
                <div className="payment-method">
                    <select>
                        <option>Credit or debit card</option>
                    </select>
                </div>
                <div className="payment-fields">
                    <input type="text" placeholder="Card number" />
                    <div className="expiration-cvv">
                        <input type="text" placeholder="Expiration" />
                        <input type="text" placeholder="CVV" />
                    </div>
                    <input type="text" placeholder="ZIP code" />
                    <div className="country-region">
                        <select>
                            <option>Israel</option>
                        </select>
                    </div>
                </div>
            </div>
        </>
    )
}