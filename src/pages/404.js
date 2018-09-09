import React from 'react'

const NotFoundPage = () => (
  <section className="section landing" id="landing">
    <div id="landing-triangles" className="landing__triangles"></div>

    <div className="landing__content">
      <h1>NOT FOUND</h1>
      <p style={{ color: "white" }}>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </div>

    <a href="#about" className="scroll-mouse"></a>
  </section>
)

export default NotFoundPage
