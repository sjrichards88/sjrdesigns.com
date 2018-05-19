import React from 'react'
import Link from 'gatsby-link'

const Header = () => (
	<header className="header">
		<div className="header__logo">
			<a href="#landing">simon richards</a>
		</div>
		<div className="header__nav-toggle">
			<div className="burger">MENU</div>
		</div>
		<nav className="header__nav">
			<ul>
				<li>
					<a href="#about">about</a>
				</li>
				<li>
					<a href="#services">services</a>
				</li>
				<li>
					<a href="#work">work</a>
				</li>
				<li>
					<a href="#contact">contact</a>
				</li>
			</ul>
		</nav>
		<div className="header__horizontal-bar"></div>
	</header>
)

export default Header
