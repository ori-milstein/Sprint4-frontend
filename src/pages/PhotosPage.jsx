import { useLocation, useNavigate } from "react-router-dom"
import { useEffect } from "react"

export function PhotosPage() {
    const location = useLocation()
    const navigate = useNavigate()
    const { imgUrls } = location.state || { imgUrls: [] }

    useEffect(() => {
        if (!imgUrls.length) {
            navigate(-1)
        }
    }, [imgUrls, navigate])

    return (
        <div className="photo-gallery-page">
            <button className="back-btn" onClick={() => navigate(-1)}>
                <img
                    src="/src/assets/icons/arrow_back_ios_24dp_000000_FILL0_wght400_GRAD0_opsz24.png"
                    className="icon"
                    alt="Back"
                />
            </button>
            <h1 className="photo-gallery-title"></h1>
            <div className="photo-gallery">
                {imgUrls.map((url, index) => (
                    <img key={index} src={url} alt={`Photo ${index + 1}`} className="photo-item" />
                ))}
            </div>
        </div>
    )
}