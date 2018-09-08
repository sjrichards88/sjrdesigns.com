import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import Header from 'components/Header'
import Footer from 'components/Footer'
import '../styles/main.scss'

class Layout extends Component {

	constructor(props) {
		super(props)
		this.state = {
			navToggled: false
		}

		this.toggleNav = this.toggleNav.bind(this)
	}

	toggleNav() {
		this.setState({
			navToggled: !this.state.navToggled
		})
	}

	render() {

		const { navToggled } = this.state
		const { data, children } = this.props

		return(
			<div>
				<Helmet
					title={data.site.siteMetadata.title}
					meta={[
						{ name: 'description', content: 'London / Basingstoke based freelance web developer & designer Simon Richards. Providing web design and development at high quality standards.' },
						{ name: 'keywords', content: 'Front end Developer, Senior Web developer, Web Development, Web Design, Simon Richards, London Web Design, portfolio, cheap websites, website building' },
					]}
				>
					<meta name="google-site-verification" content="8pUgVl34mzJdzrW7d4EivXrpFyEhgGdrfWfIl4c2bNo" />

					<link rel="apple-touch-icon" sizes="180x180" href="./apple-touch-icon.png" />
					<link rel="icon" type="image/png" sizes="32x32" href="./favicon-32x32.png" />
					<link rel="icon" type="image/png" sizes="16x16" href="./favicon-16x16.png" />
					<link rel="manifest" href="./site.webmanifest" />
					<link rel="mask-icon" href="./safari-pinned-tab.svg" color="#000000" />
					<meta name="msapplication-TileColor" content="#000000" />
					<meta name="theme-color" content="#ffffff" />

					{/* Schema */}
					<script type="application/ld+json">{`
						{ 
							"@context": "http://schema.org", 
							"@type": "Organization", 
							"url": "https://sjrdesigns.com", 
							"logo": "https://sjrdesigns.com/android-chrome-384x384.png", 
							"contactPoint": [{ 
								"@type": "ContactPoint", 
								"telephone": "+447850944628", 
								"email": "sjrichards88@gmail.com", 
								"contactType": "customer service", 
								"areaServed": "GB", 
								"availableLanguage": "English" 
							}]
						},
						{
							"@context" : "http://schema.org",
							"@type" : "WebSite",
							"name" : "London and Basingstoke based Web Developer",
							"url" : "https://sjrdesigns.com"
						},
						{
							"@context": "http://schema.org",
							"@type": "Person",
							"name": "Simon Richards",
							"url": "https://sjrdesigns.com"
						}					
					`}</script>

					<script src='https://www.google.com/recaptcha/api.js' async defer></script>
				</Helmet>
				<Header siteTitle={data.site.siteMetadata.title} navToggled={navToggled} toggleNav={this.toggleNav} />
				<div className="content-wrap">
					{children()}
				</div>
				<Footer />
			</div>
		)
	}
}

Layout.propTypes = {
  children: PropTypes.func,
}

export default Layout

export const query = graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`
