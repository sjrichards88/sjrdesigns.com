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

	componentDidUpdate(prevProps, prevState) {
		// Handle scroll locking for mobile menu
		if (prevState.navToggled !== this.state.navToggled) {
			const body = document.body;
			
			if (this.state.navToggled) {
				// Menu opened - disable body scroll
				body.style.overflow = 'hidden';
			} else {
				// Menu closed - re-enable body scroll
				body.style.overflow = 'auto';
			}
		}
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
			<header className={`
				fixed w-full top-0 left-0 z-[100] transition-all duration-[400ms] ease-in-out h-[55px] sm:h-20
				${navScrolled ? 'bg-white/90 backdrop-blur-[10px]' : 'bg-transparent'}
				${!navVisible ? '-translate-y-full' : 'translate-y-0'}
			`}>
				{/* Logo */}
				<div className="absolute left-0 top-1/2 -translate-y-1/2 ml-4 sm:ml-8 overflow-hidden">
					<a 
						href="#landing" 
						onClick={(e) => this.scrollToSection(e, 'landing')}
						className={`
							relative font-poppins text-xl font-normal no-underline transition-all duration-300 inline-block overflow-hidden
							hover:after:translate-x-0
							after:content-[''] after:absolute after:z-[1] after:w-full after:h-0.5 after:left-0 
							after:top-[52%] after:-translate-y-1/2 after:-translate-x-full after:transition-all after:duration-300
							${navScrolled 
								? 'text-slate-800 after:bg-slate-800' 
								: 'text-white after:bg-white'
							}
						`}
					>
						sjrdesigns
					</a>
				</div>

				{/* Mobile Hamburger Menu */}
				<div className="sm:hidden">
					<button 
						onClick={this.toggleNav}
						aria-label="Toggle mobile menu"
						aria-expanded={navToggled}
						className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 flex flex-col justify-center items-center z-50"
					>
						{/* Top line */}
						<div className={`
							w-6 h-0.5 transition-all duration-300 ease-in-out transform-origin-center
							${navScrolled ? 'bg-slate-800' : 'bg-white'}
							${navToggled ? 'rotate-45 translate-y-0.5' : '-translate-y-1'}
						`}></div>
						
						{/* Middle line */}
						<div className={`
							w-6 h-0.5 transition-all duration-300 ease-in-out
							${navScrolled ? 'bg-slate-800' : 'bg-white'}
							${navToggled ? 'opacity-0 scale-0' : 'opacity-100 scale-100'}
						`}></div>
						
						{/* Bottom line */}
						<div className={`
							w-6 h-0.5 transition-all duration-300 ease-in-out transform-origin-center
							${navScrolled ? 'bg-slate-800' : 'bg-white'}
							${navToggled ? '-rotate-45 -translate-y-0.5' : 'translate-y-1'}
						`}></div>
					</button>

					{/* Mobile Dropdown Menu */}
					<div className={`
						absolute top-full left-0 w-full transition-all duration-300 ease-in-out
						${navToggled ? 'opacity-100 visible' : 'opacity-0 invisible'}
						${navScrolled ? 'bg-white/95 backdrop-blur-md' : 'bg-slate-900/95 backdrop-blur-md'}
					`}>
						<nav className="py-4">
							<ul className="flex flex-col space-y-2">
								<li>
									<a 
										href="#about" 
										onClick={(e) => this.scrollToSection(e, 'about')}
										className={`
											block px-6 py-3 font-poppins text-lg font-medium transition-all duration-300
											hover:bg-white/10
											${navScrolled ? 'text-slate-800 hover:bg-slate-100' : 'text-white hover:bg-white/10'}
										`}
									>
										About
									</a>
								</li>
								<li>
									<a 
										href="#services" 
										onClick={(e) => this.scrollToSection(e, 'services')}
										className={`
											block px-6 py-3 font-poppins text-lg font-medium transition-all duration-300
											hover:bg-white/10
											${navScrolled ? 'text-slate-800 hover:bg-slate-100' : 'text-white hover:bg-white/10'}
										`}
									>
										Services
									</a>
								</li>
								<li>
									<a 
										href="#work" 
										onClick={(e) => this.scrollToSection(e, 'work')}
										className={`
											block px-6 py-3 font-poppins text-lg font-medium transition-all duration-300
											hover:bg-white/10
											${navScrolled ? 'text-slate-800 hover:bg-slate-100' : 'text-white hover:bg-white/10'}
										`}
									>
										Work
									</a>
								</li>
								<li>
									<a 
										href="#contact" 
										onClick={(e) => this.scrollToSection(e, 'contact')}
										className={`
											block px-6 py-3 font-poppins text-lg font-medium transition-all duration-300
											hover:bg-white/10
											${navScrolled ? 'text-slate-800 hover:bg-slate-100' : 'text-white hover:bg-white/10'}
										`}
									>
										Contact
									</a>
								</li>
							</ul>
						</nav>
					</div>
				</div>

				{/* Desktop Navigation */}
				<nav className="hidden sm:block absolute right-8 top-1/2 -translate-y-1/2">
					<ul className="flex items-center gap-6 p-0 m-0 list-none">
						<li>
							<a 
								href="#about" 
								onClick={(e) => this.scrollToSection(e, 'about')}
								className={`
									no-underline relative leading-none font-poppins text-lg font-normal 
									transition-all duration-[400ms] inline-block overflow-hidden
									hover:after:translate-x-0
									after:content-[''] after:absolute after:z-[1] after:w-full after:h-0.5 after:left-0 
									after:top-[52%] after:-translate-y-1/2 after:-translate-x-full after:transition-all after:duration-300
									${navScrolled 
										? 'text-slate-800 after:bg-slate-800' 
										: 'text-white after:bg-white'
									}
								`}
							>
								About
							</a>
						</li>
						<li>
							<a 
								href="#services" 
								onClick={(e) => this.scrollToSection(e, 'services')}
								className={`
									no-underline relative leading-none font-poppins text-lg font-normal 
									transition-all duration-[400ms] inline-block overflow-hidden
									hover:after:translate-x-0
									after:content-[''] after:absolute after:z-[1] after:w-full after:h-0.5 after:left-0 
									after:top-[52%] after:-translate-y-1/2 after:-translate-x-full after:transition-all after:duration-300
									${navScrolled 
										? 'text-slate-800 after:bg-slate-800' 
										: 'text-white after:bg-white'
									}
								`}
							>
								Services
							</a>
						</li>
						<li>
							<a 
								href="#work" 
								onClick={(e) => this.scrollToSection(e, 'work')}
								className={`
									no-underline relative leading-none font-poppins text-lg font-normal 
									transition-all duration-[400ms] inline-block overflow-hidden
									hover:after:translate-x-0
									after:content-[''] after:absolute after:z-[1] after:w-full after:h-0.5 after:left-0 
									after:top-[52%] after:-translate-y-1/2 after:-translate-x-full after:transition-all after:duration-300
									${navScrolled 
										? 'text-slate-800 after:bg-slate-800' 
										: 'text-white after:bg-white'
									}
								`}
							>
								Work
							</a>
						</li>
						<li>
							<a 
								href="#contact" 
								onClick={(e) => this.scrollToSection(e, 'contact')}
								className={`
									no-underline relative leading-none font-poppins text-lg font-normal 
									transition-all duration-[400ms] inline-block overflow-hidden
									hover:after:translate-x-0
									after:content-[''] after:absolute after:z-[1] after:w-full after:h-0.5 after:left-0 
									after:top-[52%] after:-translate-y-1/2 after:-translate-x-full after:transition-all after:duration-300
									${navScrolled 
										? 'text-slate-800 after:bg-slate-800' 
										: 'text-white after:bg-white'
									}
								`}
							>
								Contact
							</a>
						</li>
					</ul>
				</nav>

				{/* Horizontal Progress Bar */}
				<div 
					className="absolute -bottom-0.5 h-0.5 w-0 bg-gradient-to-r from-cyan-600 via-teal-600 to-cyan-400"
					ref={(bar) => { this.bar = bar }}
				></div>
			</header>
		)
	}
}

export default Header