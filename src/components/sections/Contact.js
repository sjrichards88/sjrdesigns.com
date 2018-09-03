import React, { Component } from 'react'

class Contact extends Component {

    constructor(props) {
        super(props)

        this.state = {
            name: '',
            email: '',
            message: '',
            nameError: false,
            emailError: false,
            messageError: false,
            nameActive: false,
            emailActive: false,
            messageActive: false,
            formSuccess: false,
            formError: false
        }

        this.handleInputFocus = this.handleInputFocus.bind(this)
        this.handleInput = this.handleInput.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleInputFocus(e) {
        const name = e.target.name
        const event = e.type
        const value = event === 'blur' ? false : true
        this.setState({
            [`${name}Active`]: value
        })
    }

    handleInput(e) {
        const name = e.target.name
        const value = e.target.value
        let error = false

        if (value === '') {
            error = true
        }

        this.setState({
            [name]: value,
            [`${name}Error`]: error
        })
    }

    encode(data) {
        return Object.keys(data)
            .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
            .join("&");
    }

    handleSubmit(e) {
        e.preventDefault()
        let errorState = []
        const { name, email, message } = this.state

        if (name === '') {
            errorState.nameError = true
        }

        if (email === '') {
            errorState.emailError = true
        }

        if (message === '') {
            errorState.messageError = true
        }

        if (Object.keys(errorState).length !== 0 && errorState.constructor !== Object) {
            this.setState(errorState)
            return
        }

        const postData = this.encode({
            "form-name": "contact",
            "name": name,
            "email": email,
            "message": message,
        })

        fetch("/", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: postData
        })
            .then(() => {
                this.setState({
                    name: '',
                    email: '',
                    message: '',
                    formSuccess: true
                })
            })
            .catch(error => {
                this.setState({
                    formError: true
                })
            })
    }

    render() {

        const { 
            name,
            email,
            message,
            nameError,
            emailError,
            messageError,
            nameActive,
            emailActive,
            messageActive,
            formSuccess
        } = this.state

        return(
            <section className="section contact" id="contact">
                <h2>contact</h2>
                <div className="contact__wrap">
                    <div className="contact__form">
                        <form name="contact" method="POST" className="form" data-netlify="true" onSubmit={this.handleSubmit}>
                            <div className="form__group form__group--50">
                                <div className={`form__input-wrap ${nameActive === true ? 'active' : ''}`} id="name">
                                    <input 
                                    type="text" 
                                    name="name"
                                    value={name}
                                    placeholder="Name" 
                                    onFocus={this.handleInputFocus}
                                    onBlur={this.handleInputFocus}
                                    onChange={this.handleInput} 
                                    />
                                </div>
                                <div className={`form__errors ${nameError === true ? '' : 'hidden'}`}>
                                    Name is required
                                </div>
                            </div>

                            <div className="form__group form__group--50 form__group--50-right">
                                <div className={`form__input-wrap ${emailActive === true ? 'active' : ''}`} id="email">
                                    <input 
                                    type="email" 
                                    name="email"
                                    value={email}
                                    placeholder="Email"
                                    onFocus={this.handleInputFocus}
                                    onBlur={this.handleInputFocus}
                                    onChange={this.handleInput} 
                                    />
                                </div>
                                <div className={`form__errors ${emailError === true ? '' : 'hidden'}`}>
                                    Email is required
                                </div>
                            </div>

                            <div className="form__group">
                                <div className={`form__input-wrap ${messageActive === true ? 'active' : ''}`} id="message">
                                    <textarea 
                                    name="message"
                                    value={message}
                                    cols="30" 
                                    rows="10" 
                                    placeholder="Message" 
                                    onFocus={this.handleInputFocus}
                                    onBlur={this.handleInputFocus}
                                    onChange={this.handleInput} 
                                    >
                                    </textarea>
                                </div>
                                <div className={`form__errors ${messageError === true ? '' : 'hidden'}`}>
                                    Message is required
                                </div>
                            </div>

                            <div className="form__group">
                                <button type="submit">Send</button>
                            </div>

                            {formSuccess && 
                                <div className="form__success">
                                    Thank you for your message, I will be in touch shortly.
                                </div>
                            }

                        </form>
                    </div>

                    <div className="contact__info">

                        <div className="contact__info-block">
                            <h4>Get in Touch!</h4>
                            <p>Interesting in working with me? Need a website? <br /> Don't hesitate to drop me a line.</p>
                        </div>

                        <div className="contact__info-block">
                            <i className="icon icon-envelope-o" aria-hidden="true"></i> sjrichards88@gmail.com
					</div>

                        <div className="contact__info-block">
                            <i className="icon icon-phone" aria-hidden="true"></i> 07850944628
					</div>

                        <div className="contact__info-block">
                            <i className="icon icon-linkedin-square" aria-hidden="true"></i> <a href="https://www.linkedin.com/in/simon-richards-33874699/" target="_blank" rel="noreferrer">LinkedIn</a>
                        </div>

                    </div>
                </div>
            </section>
        )
    }
}

export default Contact