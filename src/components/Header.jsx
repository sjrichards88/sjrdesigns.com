import React, { Component } from 'react'

class Header extends Component {
	
	constructor(props) {
		super(props)

		this.state = {
			navScrolled: false,
			navToggled: false,
			navVisible: true,
			lastScrollTop: 0
		}

		this.handleScroll = this.handleScroll.bind(this)
		this.scrollToSection = this.scrollToSection.bind(this)
		this.horizontalScrollBar = this.horizontalScrollBar.bind(this)
		this.toggleNav = this.toggleNav.bind(this)
	}

	componentDidMount() {
		this.handleScroll()
		window.addEventListener('scroll', this.handleScroll, true)

		this.horizontalScrollBar()
		window.addEventListener('scroll', this.horizontalScrollBar, true)
		window.addEventListener('resize', this.horizontalScrollBar, true)
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.handleScroll, true);
		window.removeEventListener('scroll', this.horizontalScrollBar, true);
		window.removeEventListener('resize', this.horizontalScrollBar, true);
	}

	toggleNav() {
		this.setState({
			navToggled: !this.state.navToggled
		})
	}

	handleScroll() {
		let scrollPosition = window.scrollY
		
		// Show white background only after passing the hero section (full viewport height)
		let navScrolled = scrollPosition > window.innerHeight ? true : false

		// Modern scroll behavior - hide nav when scrolling down, show when scrolling up
		let navVisible = true
		const scrollThreshold = 50 // Reduced threshold for earlier hide/show
		const scrollDelta = 3 // Reduced delta for more responsive hide/show
		
		if (scrollPosition > scrollThreshold) {
			// Only hide/show if we've scrolled enough to avoid jitter
			if (Math.abs(scrollPosition - this.state.lastScrollTop) > scrollDelta) {
				if (scrollPosition > this.state.lastScrollTop && scrollPosition > this.state.lastScrollTop + scrollDelta) {
					// Scrolling down - hide nav
					navVisible = false
				} else if (scrollPosition < this.state.lastScrollTop - scrollDelta) {
					// Scrolling up - show nav
					navVisible = true
				}
			} else {
				// Keep current state if scroll delta is too small
				navVisible = this.state.navVisible
			}
		} else {
			// Always show nav when at top of page
			navVisible = true
		}

		// Always update lastScrollTop for accurate scroll direction detection
		this.setState({
			navScrolled,
			navVisible,
			lastScrollTop: scrollPosition
		})
	}

	scrollToSection(e, sectionName) {
		e.preventDefault()
		let sectionPos = document.getElementById(sectionName).offsetTop
		
		// Reduce scroll on mobile apart from about
		if (window.innerWidth < 768 && sectionName !== 'about') {
			sectionPos = sectionPos - 30
		}

		window.scrollTo({
			top: sectionPos,
			behavior: 'smooth'
		})

		if (this.state.navToggled === true) {
			this.toggleNav()
		}
	}

	horizontalScrollBar() {
		var documentHeight = document.body.clientHeight,
			windowHeight = window.outerHeight,
			windowOffset = window.pageYOffset,
			percentage = windowOffset / (documentHeight - windowHeight) * 100;

		this.bar.style.width =  percentage + '%'
	}

	render() {
		const { navScrolled, navToggled, navVisible } = this.state

		return(
			<header className={`header ${navToggled === true ? 'active' : ''} ${navScrolled === true ? 'header--scrolled' : ''} ${navVisible === false ? 'header--hidden' : ''}`}>
				<div className="header__logo">
					<a href="#landing" onClick={(e) => this.scrollToSection(e, 'landing')}>sjrdesigns</a>
				</div>
				<div className="header__nav-toggle" onClick={this.toggleNav}>
					<div className="burger">MENU</div>
				</div>
				<nav className="header__nav">
					<ul>
						<li>
							<a href="#about" onClick={(e) => this.scrollToSection(e, 'about')}>about</a>
						</li>
						<li>
							<a href="#services" onClick={(e) => this.scrollToSection(e, 'services')}>services</a>
						</li>
						<li>
							<a href="#work" onClick={(e) => this.scrollToSection(e, 'work')}>work</a>
						</li>
						<li>
							<a href="#contact" onClick={(e) => this.scrollToSection(e, 'contact')}>contact</a>
						</li>
					</ul>
				</nav>
				<div className="header__horizontal-bar" ref={(bar) => { this.bar = bar }}></div>
			</header>
		)
	}
}

export default Header