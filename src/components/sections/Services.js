import React from 'react'

const Services = () => (
    <section className="section services" id="services">
        <h2>Services</h2>
        <div className="services__wrap">

            <div className="services__service">
                <div className="services__service-content">
                    <i className="icon icon-code" aria-hidden="true"></i>
                    <h4>Front / Back End Development</h4>
                    <p>I code using clean semantic HTML5, CSS3/Sass, JavaScript and PHP. I also use libraries such as jQuery and React and tools such as Gulp and Webpack.</p>
                    <p>All my code is w3c compliant and testing across multiple browsers and devices.</p>
                </div>
            </div>

            <div className="services__service">
                <div className="services__service-content">
                    <i className="icon icon-cogs" aria-hidden="true"></i>
                    <h4>Content Management Systems</h4>
                    <p>I have experience using a vast range of content management systems, some off the shelf (WordPress, MODX, ExpressionEngine, Grav, Contentful), but also bespoke systems using PHP frameworks (Laravel, Codeigniter, PHP-MVC).</p>
                </div>
            </div>

            <div className="services__service">
                <div className="services__service-content">
                    <i className="icon icon-wordpress" aria-hidden="true"></i>
                    <h4>Wordpress Development</h4>
                    <p>I specialise in crafting custom Wordpress themes from the ground up to tailor your needs, I also make sure they follow security best practices and optimise them for delivery and SEO.</p>
                    <p>Every website I create is responsive as standard, working across mobiles, tablets and desktops.</p>
                </div>
            </div>

            <div className="services__service">
                <div className="services__service-content">
                    <i className="icon icon-envelope-o" aria-hidden="true"></i>
                    <h4>Responsive Email</h4>
                    <p>Do you need to reach out to your clientele? I can create responsive emails for Campaign Monitor, Mailchimp or provide them as static HTML, these emails are tested in multiple email clients to ensure optimal delivery.</p>
                </div>
            </div>

            <div className="services__service">
                <div className="services__service-content">
                    <i className="icon icon-server" aria-hidden="true"></i>
                    <h4>Hosting</h4>
                    <p>As well as crafting your website I can provide the best hosting solution to ensure a fast, secure and reliable delivery.</p>
                </div>
            </div>

            <div className="services__service">
                <div className="services__service-content">
                    <i className="icon icon-wrench" aria-hidden="true"></i>
                    <h4>Maintenance and Support</h4>
                    <p>Whether its an upgrade, a backup or a website fix, I'm sure I can help you out.</p>
                </div>
            </div>

        </div>

    </section>
)

export default Services