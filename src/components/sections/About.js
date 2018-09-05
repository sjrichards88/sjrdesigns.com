import React from 'react'

import logoAbba from '../../assets/images/logo-abba.svg'
import logoBarclays from '../../assets/images/logo-barclays.svg'
import logoBBC from '../../assets/images/logo-bbc.svg'
import logoDisney from '../../assets/images/logo-disney.svg'
import logoUbisoft from '../../assets/images/logo-ubisoft.svg'

const About = () => (
    <section className="section about" id="about">
        <div className="about__content">

            <div className="about__copy">

                <h2>about</h2>

                <p>Hello, I am Simon Richards, a web developer and designer based in London &amp; Basingstoke. I graduated in Multimedia Computing at Plymouth University and have been working as a web developer for 5+ years.</p>

                <p>I currently work at <a href="//www.dewynters.com" target="_blank" rel="noreferrer">Dewynters</a> as a senior web developer.</p>

                <p>I am available for freelance work for small to medium sized projects. <a href="#contact" className="scroll-to">Contact me</a> if you are interested.</p>

                <p>Some companies that I’ve been lucky to work with along the way...</p>

            </div>

            <ul className="about__companies">
                <li><img src={logoAbba} alt="ABBA" /></li>
                <li><img src={logoBarclays} alt="Barclays" /></li>
                <li><img src={logoBBC} alt="BBC" /></li>
                <li><img src={logoDisney} alt="Disney" /></li>
                <li><img src={logoUbisoft} alt="Ubisoft" /></li>
			</ul>
			
		</div>
	</section>
)

export default About
