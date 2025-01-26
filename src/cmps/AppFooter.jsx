
export function AppFooter() {

	return (
		<footer className="app-footer full">
			<p>© 2025 StayApp, Inc. ·
				<a href="#">Terms</a> ·
				<a href="#">Sitemap</a> ·
				<a href="#">Privacy</a> ·
				<a href="#">Your Privacy Choices</a>
			</p>
			<div className="footer-right">
				<span><i class="fa-solid fa-globe"></i> <span className="clickable">English (US)</span></span>
				<span>₪ <span className="clickable">ILS</span></span>
				<a className="clickable" href="#">Support & resources</a>
				<span className="dropdown"><i class="fa-solid fa-chevron-down"></i></span>
			</div>
		</footer>
	)
}