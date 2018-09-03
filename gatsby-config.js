module.exports = {
  siteMetadata: {
    title: 'Simon Richards | London / Basingstoke based Web Developer &amp; Designer',
  },
  plugins: [
    `gatsby-plugin-react-next`,
    'gatsby-plugin-resolve-src',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-offline',
    {
      resolve: `gatsby-plugin-canonical-urls`,
      options: {
        siteUrl: `https://sjrdesigns.com`,
      },
    },
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [
          `Poppins\:400,500,600,700`,
          `Lato\:400,700`
        ]
      },
    },
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        precision: 8,
      },
    },
],
}
