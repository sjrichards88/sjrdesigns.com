import React, { Component } from 'react'

class Header extends Component {
	
	constructor(props) {
		super(props)

		this.state = {
			navWhite: false,
		}

		this.handleScroll = this.handleScroll.bind(this)
		this.scrollToSection = this.scrollToSection.bind(this)
		this.horizontalScrollBar = this.horizontalScrollBar.bind(this)
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

	handleScroll() {
		let scrollPosition = document.documentElement.scrollTop
		let landingHeight = document.getElementById('landing').clientHeight
		let navWhite = scrollPosition <= (landingHeight - 10) ? false : true

		// Check its changed before updating state so we are not rendering on every scroll
		if (this.state.navWhite !== navWhite) {
			this.setState({
				navWhite
			})
		}
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

		if (this.props.navToggled === true) {
			this.props.toggleNav()
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

		const { navWhite } = this.state
		const { toggleNav, navToggled } = this.props

		return(
			<header className={`header ${navToggled === true ? 'active' : ''} ${navWhite === true ? 'header--white' : ''}`}>
				<div className="header__logo">
					<a href="#landing" onClick={(e) => this.scrollToSection(e, 'landing')}>simon richards</a>
				</div>
				<div className="header__nav-toggle" onClick={toggleNav}>
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
