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
						{ name: 'description', content: 'London based freelance web developer &amp; designer Simon Richards. Providing web design and development at high quality standards.' },
						{ name: 'keywords', content: 'Front end Developer, Senior Web developer, Web Development, Web Design, Simon Richards, London Web Design, portfolio, cheap websites, website building' },
					]}
				>
					<link rel="apple-touch-icon" sizes="180x180" href="./apple-touch-icon.png" />
					<link rel="icon" type="image/png" sizes="32x32" href="./favicon-32x32.png" />
					<link rel="icon" type="image/png" sizes="16x16" href="./favicon-16x16.png" />
					<link rel="manifest" href="./manifest.json" />
					<link rel="mask-icon" href="./safari-pinned-tab.svg" color="#0a0b0f" />
					<meta name="theme-color" content="#ffffff" />
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
