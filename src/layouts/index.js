import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import Header from '../components/Header'
import Footer from '../components/Footer'
import '../styles/main.scss'

const Layout = ({ children, data }) => (
	<div>
		<Helmet
			title={data.site.siteMetadata.title}
			meta={[
				{ name: 'description', content: 'London based freelance web developer &amp; designer Simon Richards. Providing web design and development at high quality standards.' },
				{ name: 'keywords', content: 'Front end Developer, Senior Web developer, Web Development, Web Design, Simon Richards, London Web Design, portfolio, cheap websites, website building' },
			]}
		/>
		<Header siteTitle={data.site.siteMetadata.title} />
		<div className="content-wrap">
			{children()}
		</div>
		<Footer />
	</div>
)

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
